import { useState } from "react";

export default function UploadEEG() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    // TODO: POST to backend endpoint for EEG upload
    // Simulate result
    setTimeout(() => {
      setResult("Predicted: A");
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-blue-800 mb-4">Upload Real EEG Data</h1>
      <input type="file" accept=".csv,.edf" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="px-6 py-2 bg-blue-700 text-white rounded-full font-bold disabled:opacity-50" disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload & Predict"}
      </button>
      {result && <div className="mt-6 text-lg text-green-700 font-semibold">{result}</div>}
      <div className="mt-8 text-gray-500 text-sm">Supported formats: CSV, EDF. (Simulated result for now)</div>
    </main>
  );
}
