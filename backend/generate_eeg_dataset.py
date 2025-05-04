import numpy as np
import pandas as pd
import os

np.random.seed(42)

LETTERS = [chr(i) for i in range(65, 91)]  # A-Z
DIGITS = [str(i) for i in range(10)]       # 0-9
CLASSES = LETTERS + DIGITS
N_CLASSES = len(CLASSES)
N_SAMPLES_PER_CLASS = 1000  # 1000 trials per class
N_CHANNELS = 8
N_TIMEPOINTS = 384

def synthesize_eeg(class_idx):
    # Simulate a base frequency pattern unique to each class
    freq = 5 + class_idx % 10
    t = np.linspace(0, 1, N_TIMEPOINTS)
    base = np.sin(2 * np.pi * freq * t)
    # Each channel has a different phase and amplitude
    signal = np.array([
        (1 + 0.1 * class_idx) * base * np.sin(2 * np.pi * (freq + c) * t + c)
        for c in range(N_CHANNELS)
    ])
    # Add random noise
    noise = np.random.normal(0, 0.5, size=(N_CHANNELS, N_TIMEPOINTS))
    return (signal + noise).T  # shape: (384, 8)

os.makedirs("eeg_dataset/trials", exist_ok=True)
X = []
y = []
for idx, label in enumerate(CLASSES):
    for sample in range(N_SAMPLES_PER_CLASS):
        eeg = synthesize_eeg(idx)
        X.append(eeg)
        y.append(label)

X = np.array(X)  # shape: (n_samples, 384, 8)
y = np.array(y)

os.makedirs("eeg_dataset", exist_ok=True)
np.save("eeg_dataset/X.npy", X)
np.save("eeg_dataset/y.npy", y)
print("Saved all EEG data to eeg_dataset/X.npy and labels to eeg_dataset/y.npy")
