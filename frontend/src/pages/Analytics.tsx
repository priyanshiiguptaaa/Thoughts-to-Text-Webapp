import React from "react";

export default function Analytics() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <a href="/" className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-green-200 to-green-400 text-green-900 rounded shadow hover:from-green-300 hover:to-green-500 font-semibold">← Back to Home</a>
      <h1 className="text-3xl font-extrabold text-green-800 mb-4">Analytics & Model Performance</h1>
      <div className="mb-4 text-gray-700 text-lg">
        <p>
          <b>Model:</b> Convolutional Neural Network (Conv1D, MaxPool, Dropout, Gaussian noise)
        </p>
        <p>
          <b>Test Accuracy:</b> <span className="font-mono">~95%</span> (on synthetic data, A-Z)
        </p>
        <p>
          <b>Validation:</b> 80:20 train-test split, early stopping on validation accuracy
        </p>
      </div>
      <h2 className="text-xl font-semibold text-green-700 mt-8 mb-2">Key Insights</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Model performs with high accuracy on synthetic EEG, but real EEG may be more challenging.</li>
        <li>Dropout and Gaussian noise layers help prevent overfitting.</li>
        <li>Early stopping ensures the best model is saved.</li>
      </ul>
      <h2 className="text-xl font-semibold text-green-700 mt-8 mb-2">Tips for Improvement</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Try real EEG data for more realistic performance evaluation.</li>
        <li>Experiment with different network architectures and regularization.</li>
        <li>Use cross-validation for more robust metrics.</li>
      </ul>
      <div className="mt-8 text-xs text-gray-400">Analytics generated from synthetic EEG experiments &copy; 2025</div>
      <div className="mt-8 text-xs text-gray-400">
        <b>Tech Stack:</b> React, FastAPI, PyTorch, Chart.js, TailwindCSS, Vite
      </div>
    </div>
  );
}
