from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from tensorflow.keras.models import load_model
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model("eeg_model.h5")

@app.websocket("/ws/eeg")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            eeg_data = np.array(json.loads(data))
            eeg_data = eeg_data.reshape(1, 384, 8)
            prediction = model.predict(eeg_data)
            predicted_char = chr(np.argmax(prediction) + 65)
            await websocket.send_text(predicted_char)
    except Exception as e:
        await websocket.close()
