# Finallllllll- 90% accuracy + confusion matrix

import numpy as np
import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.utils import shuffle
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt
import seaborn as sns

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Flatten, Dense, Dropout, GaussianNoise
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.callbacks import EarlyStopping

# Load dataset
data_path = "simulated_eeg_alphabet_clean"  # Make sure this path is correct
labels_df = pd.read_csv(os.path.join(data_path, "labels.csv"))
trials_path = os.path.join(data_path, "trials")

X, y = [], []
for _, row in labels_df.iterrows():
    eeg = pd.read_csv(os.path.join(trials_path, row["filename"]), header=None).values
    X.append(eeg)
    y.append(row["label"])

X = np.array(X)                # (520, 8, 384)
X = np.transpose(X, (0, 2, 1)) # (520, 384, 8)
y = np.array(y)

# Encode labels
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)
y_categorical = to_categorical(y_encoded)

# Shuffle and split
X, y_categorical = shuffle(X, y_categorical, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y_categorical, test_size=0.2, stratify=y_encoded, random_state=42
)

# Build model
model = Sequential([
    GaussianNoise(0.1, input_shape=(384, 8)),
    Conv1D(32, kernel_size=5, activation='relu'),
    MaxPooling1D(2),
    Dropout(0.4),
    Conv1D(64, kernel_size=3, activation='relu'),
    MaxPooling1D(2),
    Dropout(0.4),
    Flatten(),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(26, activation='softmax')
])

# Compile model
model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# Train model
early_stop = EarlyStopping(patience=5, restore_best_weights=True)
model.fit(X_train, y_train, validation_split=0.1, epochs=10, batch_size=16)

# Evaluate model
loss, accuracy = model.evaluate(X_test, y_test)
print(f"\n✅ Test Accuracy: {accuracy * 100:.2f}%")

# Predict and compute confusion matrix
y_pred_probs = model.predict(X_test)
y_pred = np.argmax(y_pred_probs, axis=1)
y_true = np.argmax(y_test, axis=1)

cm = confusion_matrix(y_true, y_pred)
labels = encoder.classes_

# Plot confusion matrix
plt.figure(figsize=(12, 10))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=labels, yticklabels=labels)
plt.xlabel("Predicted")
plt.ylabel("True")
plt.title("Confusion Matrix")
plt.tight_layout()
plt.show()
