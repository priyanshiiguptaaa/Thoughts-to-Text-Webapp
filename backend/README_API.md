# EEG-to-Text Prediction API for Hospital Integration

This API enables hospital systems and third-party apps to easily integrate EEG-based character prediction (A-Z, 0-9) using a deep learning model.

## Base URL

    http://<your-server-address>:8000

## Endpoints

### 1. Predict Character from EEG

**POST** `/api/predict_eeg`

- **Description**: Predicts the character (A-Z, 0-9) from EEG data.
- **Request Body** (JSON):
  ```json
  {
    "eeg": [[...], ...] // shape: [384, 8], float values
  }
  ```
- **Response** (JSON):
  ```json
  {
    "prediction": "A"
  }
  ```
- **Errors**: Returns 400 for malformed or missing data.

#### Example using curl
```bash
curl -X POST http://<your-server-address>:8000/api/predict_eeg \
  -H "Content-Type: application/json" \
  -d '{"eeg": [[0.1,0.2,...],[...],...]}'
```

### 2. OpenAPI/Swagger Docs

Interactive docs available at:
- `http://<your-server-address>:8000/docs`
- `http://<your-server-address>:8000/redoc`

## Integration Notes
- The API is CORS-enabled for easy integration from web or mobile apps.
- EEG data must be a 384x8 array (list of lists, floats).
- Response is always JSON.
- Model is trained for English letters (A-Z) and digits (0-9).
- For best results, use preprocessed EEG data matching the training format.

## Contact
For support or questions, contact the developer team.
