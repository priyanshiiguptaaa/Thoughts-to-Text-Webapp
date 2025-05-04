from fastapi import FastAPI, WebSocket, Request, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import torch
import torch.nn as nn
import json
import os
import numpy as np

app = FastAPI()

# PATCH: Force OpenAPI 3.0.2 for Swagger UI compatibility
from fastapi.openapi.utils import get_openapi

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="FastAPI",
        version="0.1.0",
        description="EEG-to-Text API for Hospital Integration",
        routes=app.routes,
    )
    openapi_schema["openapi"] = "3.0.2"  # Force OpenAPI version 3.0.2
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

LETTERS = [chr(i) for i in range(65, 91)]  # A-Z
DIGITS = [str(i) for i in range(10)]       # 0-9
CLASSES = LETTERS + DIGITS
N_CLASSES = len(CLASSES)
N_CHANNELS = 8
N_TIMEPOINTS = 384

def synthesize_eeg(class_idx):
    freq = 5 + class_idx % 10
    t = np.linspace(0, 1, N_TIMEPOINTS)
    base = np.sin(2 * np.pi * freq * t)
    # Make the signal less class-separable and more noisy
    signal = np.array([
        (0.5 + 0.05 * class_idx) * base * np.sin(2 * np.pi * (freq + c) * t + c)
        for c in range(N_CHANNELS)
    ])
    noise = np.random.normal(0, 1.0, size=(N_CHANNELS, N_TIMEPOINTS))  # Increased noise
    return (signal + noise).T  # shape: (384, 8)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the same EEGNet as in training
class EEGNet(nn.Module):
    def __init__(self, n_classes):
        super(EEGNet, self).__init__()
        self.noise = nn.Dropout(0.1)
        self.conv1 = nn.Conv1d(8, 32, kernel_size=5)
        self.pool1 = nn.MaxPool1d(2)
        self.drop1 = nn.Dropout(0.4)
        self.conv2 = nn.Conv1d(32, 64, kernel_size=3)
        self.pool2 = nn.MaxPool1d(2)
        self.drop2 = nn.Dropout(0.4)
        self.flatten = nn.Flatten()
        # Dynamically compute the flattened size
        with torch.no_grad():
            dummy = torch.zeros(1, 8, 384)
            dummy = self.noise(dummy)
            dummy = self.conv1(dummy)
            dummy = torch.relu(dummy)
            dummy = self.pool1(dummy)
            dummy = self.drop1(dummy)
            dummy = self.conv2(dummy)
            dummy = torch.relu(dummy)
            dummy = self.pool2(dummy)
            dummy = self.drop2(dummy)
            dummy = self.flatten(dummy)
            flattened_size = dummy.shape[1]
        self.fc1 = nn.Linear(flattened_size, 128)
        self.drop3 = nn.Dropout(0.5)
        self.fc2 = nn.Linear(128, n_classes)

    def forward(self, x):
        x = self.noise(x)
        x = self.conv1(x)
        x = torch.relu(x)
        x = self.pool1(x)
        x = self.drop1(x)
        x = self.conv2(x)
        x = torch.relu(x)
        x = self.pool2(x)
        x = self.drop2(x)
        x = self.flatten(x)
        x = self.fc1(x)
        x = torch.relu(x)
        x = self.drop3(x)
        x = self.fc2(x)
        return x

# Load class labels
class_labels = np.load("class_labels.npy")
n_classes = len(class_labels)

# Load trained model
model = EEGNet(n_classes)
model.load_state_dict(torch.load("eeg_model.pt", map_location=torch.device('cpu')))
model.eval()

@app.get("/generate_eeg")
def generate_eeg(letter: str = Query(..., min_length=1, max_length=1)):
    letter = letter.upper()
    if letter not in CLASSES:
        return JSONResponse({"error": "Invalid letter"}, status_code=400)
    idx = CLASSES.index(letter)
    eeg = synthesize_eeg(idx)
    return JSONResponse({"eeg": eeg.tolist(), "letter": letter})

@app.post("/api/predict_eeg")
async def predict_eeg_api(request: Request):
    """
    Predict the character (A-Z, 0-9) from EEG data (shape: [384,8]).
    Expects JSON: {"eeg": [[...], ...]} (384x8 array)
    Returns: {"prediction": "A"}
    """
    data = await request.json()
    eeg = np.array(data["eeg"]).reshape(1, 384, 8)
    eeg_tensor = torch.tensor(eeg, dtype=torch.float32).permute(0, 2, 1)
    with torch.no_grad():
        logits = model(eeg_tensor)
        idx = torch.argmax(logits, dim=1).item()
        char = class_labels[idx]
    return JSONResponse({"prediction": str(char)})

@app.websocket("/ws/eeg")
async def websocket_endpoint(websocket: WebSocket):
    print("[WebSocket] Client connecting...")
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            print(f"[WebSocket] Received data: {str(data)[:100]}...")
            eeg = np.array(data["eeg"]).reshape(1, 384, 8)
            eeg_tensor = torch.tensor(eeg, dtype=torch.float32).permute(0, 2, 1)
            with torch.no_grad():
                logits = model(eeg_tensor)
                idx = torch.argmax(logits, dim=1).item()
                char = class_labels[idx]
            print(f"[WebSocket] Sending prediction: {char}")
            await websocket.send_json({"prediction": str(char)})
    except Exception as e:
        print(f"[WebSocket] Disconnected or error: {e}")
        await websocket.close()
