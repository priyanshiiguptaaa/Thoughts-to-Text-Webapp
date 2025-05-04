import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import EEGVisualizer from "./components/EEGVisualizer";
import TextOutput from "./components/TextOutput";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Landing from "./pages/Landing";
import UploadEEG from "./pages/UploadEEG";
import LiveEEG from "./pages/LiveEEG";
import Account from "./pages/Account";
import AnalyticsAdvanced from "./pages/AnalyticsAdvanced";
import Accessibility from "./pages/Accessibility";
import ShareExport from "./pages/ShareExport";
import Community from "./pages/Community";
import "./styles/nav-link.css";

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [predicted, setPredicted] = useState("");
  const [lastEEG, setLastEEG] = useState<number[][] | null>(null);
  const [randomTestResults, setRandomTestResults] = useState<{[key: string]: number} | null>(null);
  const [randomTestTotal, setRandomTestTotal] = useState<number>(0);
  const [randomTestAccuracy, setRandomTestAccuracy] = useState<number | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [letterPrediction, setLetterPrediction] = useState<string>("");
  const [letterMatch, setLetterMatch] = useState<boolean | null>(null);

  function generateFakeEEG() {
    return Array.from({ length: 384 }, () =>
      Array.from({ length: 8 }, () => Math.random() * 2 - 1)
    );
  }

  // Deterministic EEG for a given letter (simulate a unique pattern per letter)
  function generateLetterEEG(letter: string) {
    // Use a hash of the letter as the seed
    let seed = letter.charCodeAt(0) * 999;
    function seededRandom() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
    return Array.from({ length: 384 }, () =>
      Array.from({ length: 8 }, () => (seededRandom() * 2 - 1) + (Math.random() * 0.2 - 0.1))
    );
  }


  async function handleSend() {
    const eeg = generateFakeEEG();
    setLastEEG(eeg); // Save the EEG signal sent
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eeg }),
    });
    const data = await response.json();
    setPredicted(data.prediction);
  }

  async function testRandomNoiseAccuracy() {
    const N = 100;
    const counts: {[key: string]: number} = {};
    for (let i = 0; i < N; i++) {
      const eeg = generateFakeEEG();
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eeg }),
      });
      const data = await response.json();
      const pred = data.prediction;
      counts[pred] = (counts[pred] || 0) + 1;
    }
    setRandomTestResults(counts);
    setRandomTestTotal(N);
    // Accuracy: percent of predictions that are the most common class
    const maxCount = Math.max(...Object.values(counts));
    setRandomTestAccuracy((maxCount / N) * 100);
  }

  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col items-center bg-white text-[#1a2233]">
        {/* Navbar */}
        <nav className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 shadow">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-[#2563eb]">🧠 EEG2Text</span>
            </div>
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-7 items-center">
              <Link to="/landing" className="nav-link">Home</Link>
              <Link to="/demo" className="nav-link">Demo</Link>
              <Link to="/about" className="nav-link">About</Link>
              <a href="/api-docs.html" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#2563eb] text-white font-bold rounded-full hover:bg-blue-700 transition">API Docs</a>
              <Link to="/account" className="ml-2 px-3 py-1.5 bg-gray-100 text-[#2563eb] font-bold rounded-full hover:bg-gray-200 transition">Profile</Link>
            </div>
            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-2 rounded hover:bg-blue-100 focus:outline-none" aria-label="Open menu">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/demo" element={
            <main className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-8 flex flex-col items-center border border-gray-200 mt-8">
              <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight mb-2" id="home">EEG Thought-to-Text Demo</h1>
              <div className="text-lg text-blue-700 mb-4">Assistive BCI using deep learning on synthetic EEG for English alphabets</div>
              <div className="text-gray-500 text-sm mb-8">Select a letter, predict, and visualize the EEG and model result. Advanced analytics available below.</div>

              {/* Step 1: Letter selection */}
              <section className="w-full max-w-xl mx-auto mb-8 bg-white rounded-xl shadow p-6 flex flex-col items-center border border-blue-100">
                <label htmlFor="letter-select" className="block font-medium text-blue-900 mb-2 text-lg">Choose Letter</label>
                <div className="flex gap-4 items-center">
                  <select
                    id="letter-select"
                    className="border px-3 py-2 rounded-lg text-lg"
                    value={selectedLetter}
                    onChange={e => setSelectedLetter(e.target.value)}
                  >
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
                      <option key={letter} value={letter}>{letter}</option>
                    ))}
                  </select>
                  <button
                    className="py-2 px-6 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 transition text-lg"
                    onClick={async () => {
                      // Fetch EEG from backend
                      const eegResp = await fetch(`http://localhost:8000/generate_eeg?letter=${selectedLetter}`);
                      const eegData = await eegResp.json();
                      const eeg = eegData.eeg;
                      setLastEEG(eeg);
                      const response = await fetch("http://localhost:8000/predict", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ eeg }),
                      });
                      const data = await response.json();
                      setLetterPrediction(data.prediction);
                      setLetterMatch(data.prediction.toUpperCase() === selectedLetter.toUpperCase());
                    }}
                  >
                    Predict Letter
                  </button>
                </div>
              </section>

              {/* Step 2: Prediction result */}
              {letterPrediction && (
                <section className="w-full mb-8 bg-white rounded-xl shadow p-6 flex flex-col items-center border border-green-100">
                  <div className="text-2xl font-bold mb-2">Model Prediction</div>
                  <div className="text-5xl font-mono mb-2">
                    {letterPrediction}
                    {letterMatch === true && <span className="ml-4 text-green-600 text-5xl align-middle">✔️</span>}
                    {letterMatch === false && <span className="ml-4 text-red-600 text-5xl align-middle">❌</span>}
                  </div>
                  <div className={`text-lg ${letterMatch ? 'text-green-700' : 'text-red-700'} mt-1 mb-2`}>
                    {letterMatch ? 'Correct! The model matched your selection.' : 'Incorrect. Try retraining or adjusting your model.'}
                  </div>
                </section>
              )}

              {/* Step 3: EEG Visualization */}
              <section className="w-full max-w-xl mx-auto mb-8 bg-white rounded-xl shadow p-6 flex flex-col items-center border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl font-bold">EEG Signal Visualization</div>
                  <span title="Switch tabs to view EEG channels or the raw input data as a scatter plot. Both visualizations use the actual input sent to the model." className="text-blue-400 cursor-help text-lg">ℹ️</span>
                </div>
                <EEGVisualizer eeg={lastEEG} />
                <div className="mt-4 text-xs text-gray-500">
                  <b>Tip:</b> Use the tabs above to switch between EEG channel traces and the input data scatter plot. Hover points for details.
                </div>
              </section>

              {/* Model accuracy section */}
              <section className="w-full max-w-xl mx-auto mb-8 bg-white rounded-xl shadow p-6 flex flex-col items-center border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xl font-bold">Model Accuracy</div>
                  <span title="Shows the model's accuracy on synthetic data. If always 100%, your model may be overfitting or the data is too easy." className="text-blue-400 cursor-help">ℹ️</span>
                </div>
                <div className="bg-blue-50 rounded p-4 text-blue-900 mb-2">
                  <b>Current Accuracy:</b> <span className="font-mono">{letterMatch === true ? "100% (last prediction)" : letterMatch === false ? "0% (last prediction)" : "-"}</span>
                </div>
                <div className="text-xs text-gray-500">
                  <b>Note:</b> If accuracy is always 100%, try making the synthetic EEG more challenging or test with real EEG data.
                </div>
              </section>

              {/* Advanced/Debug tools */}
              <section className="w-full max-w-xl mx-auto mb-8 bg-white rounded-xl shadow p-6 flex flex-col items-center border border-blue-100">
                <details className="w-full">
                  <summary className="cursor-pointer font-semibold text-blue-500 hover:underline text-lg">Advanced / Debug Tools & Analytics</summary>
                  <div className="mt-4">
                    <div className="flex gap-4 mb-4">
                      <button
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                        onClick={handleSend}
                      >
                        Send Random EEG Signal
                      </button>
                      <button
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow hover:from-purple-600 hover:to-purple-800 transition"
                        onClick={testRandomNoiseAccuracy}
                      >
                        Test Random Noise Accuracy (100x)
                      </button>
                    </div>
                    {lastEEG && (
                      <div className="mt-4 bg-blue-50 p-2 rounded border border-blue-100 overflow-x-auto">
                        <h3 className="font-semibold mb-1 text-blue-800 text-xs">Last EEG Signal Sent</h3>
                        <div className="text-xs max-h-24 overflow-y-auto">
                          <pre className="whitespace-pre-wrap break-all">{JSON.stringify(lastEEG, null, 2)}</pre>
                        </div>
                      </div>
                    )}
                    {randomTestResults && (
                      <div className="mt-4 bg-purple-50 p-2 rounded border border-purple-100">
                        <h3 className="font-semibold mb-1 text-purple-800 text-xs">Random Noise Prediction Distribution (N={randomTestTotal})</h3>
                        <table className="w-full text-xs">
                          <thead>
                            <tr>
                              <th className="px-1 py-0.5">Letter</th>
                              <th className="px-1 py-0.5">Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(randomTestResults).map(([letter, count]) => (
                              <tr key={letter}>
                                <td className="px-1 py-0.5 font-mono">{letter}</td>
                                <td className="px-1 py-0.5">{count}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-1 text-purple-700 font-semibold text-xs">
                          Accuracy (most common letter): {randomTestAccuracy?.toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </div>
                </details>
              </section>

              {/* Footer */}
              <footer className="w-full mt-10 pt-6 border-t text-center text-gray-400 text-xs">
                EEG-to-Text Demo &copy; 2025 | Deep Learning BCI Project | <a href="https://github.com/meagmohit/EEG-Datasets" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">More Info</a>
              </footer>
            </main>
          } />
          <Route path="/landing" element={<Landing />} />
          <Route path="/demo" element={
            <main className="flex-1 w-full flex flex-col items-center justify-center px-2 py-8">
              {/* --- DEMO CONTENT (copied from previous homepage) --- */}
            </main>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>

      </div>
    </Router>
  );
}
export default App;
