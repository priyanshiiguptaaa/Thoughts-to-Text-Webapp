# EEG Thought-to-Text Web App

A modern, production-ready web application for converting EEG signals to text using deep learning, designed for assistive communication.

## Features
- Real-time EEG-to-text conversion via deep learning (CNN)
- Modern React (Vite) + Tailwind CSS frontend
- FastAPI backend for secure, fast inference
- WebSocket for real-time communication
- Ready for hospital or assistive deployment

## Quick Start

1. Place your trained Keras model as `backend/eeg_model.h5`.
2. Start backend:
   ```sh
   cd backend
   pip install -r requirements.txt
   uvicorn app:app --reload
   ```
3. Start frontend:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
4. Visit `http://localhost:5173`

## Customization
- Integrate with real EEG devices by sending live data to the backend WebSocket.
- Adjust frontend for accessibility and hospital branding.

## License
MIT
