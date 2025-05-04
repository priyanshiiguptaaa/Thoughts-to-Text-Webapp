import React from "react";

export default function About() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#e7eefe] to-[#f7fafd] pb-16">
      {/* SVG Wave Background */}
      <div className="absolute inset-0 w-full h-48 top-0 left-0 z-0 pointer-events-none select-none">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#2563eb" fillOpacity="0.08" d="M0,224L80,197.3C160,171,320,117,480,128C640,139,800,213,960,229.3C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"/>
        </svg>
      </div>
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center mt-20 mb-12">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-14 h-14 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="24" rx="20" ry="15" stroke="#2563eb" strokeWidth="2.5" fill="#e7eefe"/><path d="M18 28c1.5-2 4.5-2 6 0" stroke="#2563eb" strokeWidth="2.5"/><circle cx="19" cy="22" r="1.5" fill="#2563eb"/><circle cx="29" cy="22" r="1.5" fill="#2563eb"/></svg>
        </div>
        <h1 className="text-5xl font-extrabold text-[#143061] mb-3 drop-shadow-sm">About EEG2Text</h1>
        <p className="text-xl text-[#2563eb] font-semibold mb-2">Assistive Brain-to-Text Communication</p>
        <p className="max-w-2xl text-lg text-[#1a2233] opacity-90">Empowering motor-impaired patients and advancing BCI research with deep learning and synthetic EEG data.</p>
      </section>
      {/* Info Cards */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-8">
        {/* Project Overview */}
        <section className="bg-white rounded-2xl shadow p-7 border border-[#e3e9f4] flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2"/><line x1="12" y1="16" x2="12" y2="12" stroke="#2563eb" strokeWidth="2"/><circle cx="12" cy="8.5" r="1" fill="#2563eb"/></svg>
            <h2 className="text-xl font-bold text-[#143061]">Project Overview</h2>
          </div>
          <p className="text-base text-[#1a2233]">EEG2Text is an <span className="text-[#2563eb] font-semibold">assistive technology platform</span> that translates synthetic EEG signals into English text using deep learning. It empowers motor-impaired patients and advances brain-computer interface (BCI) research.</p>
        </section>
        {/* Methodology */}
        <section className="bg-white rounded-2xl shadow p-7 border border-[#e3e9f4] flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#2563eb" strokeWidth="2"/></svg>
            <h2 className="text-xl font-bold text-[#143061]">Methodology</h2>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[#1a2233]">
            <li><span className="font-semibold text-[#2563eb]">Data Synthesis:</span> Simulate EEG signals for each English letter using mathematical models.</li>
            <li><span className="font-semibold text-[#2563eb]">Model Architecture:</span> Custom 1D CNN with dropout and noise layers for robust EEG classification.</li>
            <li><span className="font-semibold text-[#2563eb]">Training:</span> Train on synthetic data for high accuracy and generalization.</li>
            <li><span className="font-semibold text-[#2563eb]">Prediction Pipeline:</span> Real-time inference and character output.</li>
            <li><span className="font-semibold text-[#2563eb]">Web UI:</span> Interactive demo for EEG signals and predictions.</li>
            <li><span className="font-semibold text-[#2563eb]">API Integration:</span> REST API for hospitals and developers.</li>
          </ol>
          {/* CNN Model Diagram */}
          <div className="flex flex-col items-center mt-4">
            <img src="/cnn_architecture.svg" alt="CNN Model Architecture" className="w-full max-w-xl mb-2" />
            <span className="text-sm text-[#2563eb] font-medium">Figure: EEG-to-Text CNN Model Pipeline</span>
          </div>
          {/* PyTorch Model Code Example */}
          <div className="bg-[#f4f6fa] rounded-lg border border-[#e3e9f4] p-4 mt-2 overflow-x-auto">
            <span className="block text-xs text-[#2563eb] font-semibold mb-1">PyTorch Model Definition</span>
            <pre className="text-xs leading-tight text-[#143061] whitespace-pre-wrap"><code>{`
import torch.nn as nn

class EEG2TextCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv1d(1, 32, kernel_size=5)
        self.pool = nn.MaxPool1d(2)
        self.noise = nn.Dropout(p=0.1)
        self.dropout = nn.Dropout(p=0.5)
        self.fc = nn.Linear(32 * 48, 26)  # 26 English letters
    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.noise(x)
        x = x.view(x.size(0), -1)
        x = self.dropout(x)
        return self.fc(x)
`}</code></pre>
          </div>
        </section>
        {/* Use Cases */}
        <section className="bg-white rounded-2xl shadow p-7 border border-[#e3e9f4] flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"/><circle cx="12" cy="7" r="4"/></svg>
            <h2 className="text-xl font-bold text-[#143061]">Use Cases</h2>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[#1a2233]">
            <li>Assistive communication for motor-impaired or locked-in patients</li>
            <li>Brain-computer interface (BCI) and neurorehabilitation research</li>
            <li>Rapid prototyping and educational demonstrations of EEG AI</li>
          </ul>
        </section>
        {/* Technical Stack */}
        <section className="bg-white rounded-2xl shadow p-7 border border-[#e3e9f4] flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8v8H8z"/></svg>
            <h2 className="text-xl font-bold text-[#143061]">Technical Stack</h2>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[#1a2233]">
            <li><span className="font-semibold text-[#2563eb]">Deep Learning:</span> PyTorch for model development and inference</li>
            <li><span className="font-semibold text-[#2563eb]">Backend:</span> FastAPI for serving the model and API endpoints</li>
            <li><span className="font-semibold text-[#2563eb]">Frontend:</span> React + Vite for a fast, modern web UI</li>
            <li><span className="font-semibold text-[#2563eb]">Visualization:</span> Chart.js for EEG signal plotting</li>
            <li><span className="font-semibold text-[#2563eb]">API Docs:</span> Swagger UI for interactive API documentation</li>
          </ul>
        </section>
        {/* API Integration */}
        <section className="bg-white rounded-2xl shadow p-7 border border-[#e3e9f4] flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-6 h-6 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 17h8M8 13h8M8 9h8"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
            <h2 className="text-xl font-bold text-[#143061]">API Integration</h2>
          </div>
          <p className="text-base text-[#1a2233] mb-1">Hospitals and developers can easily integrate EEG2Text into their systems using our <a href="/api-docs.html" className="underline text-[#2563eb] hover:text-[#143061] font-semibold" target="_blank" rel="noopener noreferrer">REST API</a>.</p>
        </section>
      </div>
    </main>
  );
}
