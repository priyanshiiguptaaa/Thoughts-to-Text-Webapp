export default function AnalyticsAdvanced() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-violet-700 mb-6">Advanced Analytics (Coming Soon)</h1>
      <div className="bg-white rounded-xl shadow p-6 text-blue-900">
        <ul className="list-disc pl-6 space-y-2">
          <li>Confusion matrix and per-class accuracy</li>
          <li>EEG signal explorer (zoom, filter, compare channels)</li>
          <li>Model explainability (saliency maps)</li>
        </ul>
        <div className="mt-4 text-gray-500 text-sm">(Advanced analytics and visualization coming soon.)</div>
      </div>
    </main>
  );
}
