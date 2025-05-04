import React, { useState } from "react";
import { Line, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EEGVisualizerProps {
  eeg?: number[][];
}

const EEGVisualizer: React.FC<EEGVisualizerProps> = ({ eeg }) => {
  const [tab, setTab] = useState<'channels' | 'input'>('channels');

  if (!eeg || eeg.length === 0) {
    return (
      <div className="text-gray-400 text-center p-8">No EEG data to display. Run a prediction to visualize EEG.</div>
    );
  }

  // EEG shape: [timepoints, channels]
  const nChannels = eeg[0].length;
  const nTimepoints = eeg.length;
  const labels = Array.from({ length: nTimepoints }, (_, i) => i.toString());
  const datasets = Array.from({ length: nChannels }, (_, i) => ({
    label: `Channel ${i + 1}`,
    data: eeg.map((row) => row[i]),
    borderColor: `hsl(${i * 45}, 70%, 50%)`,
    tension: 0.3,
    pointRadius: 0,
    borderWidth: 2,
  }));

  // For scatter/heatmap: flatten EEG into points (x=timepoint, y=channel, value=amplitude)
  const scatterData = {
    datasets: [] as any[],
  };
  for (let ch = 0; ch < nChannels; ch++) {
    scatterData.datasets.push({
      label: `Channel ${ch + 1}`,
      data: eeg.map((row, t) => ({ x: t, y: ch + 1, v: row[ch] })),
      showLine: false,
      pointRadius: 2,
      backgroundColor: `hsl(${ch * 45}, 70%, 50%)`,
      borderColor: `hsl(${ch * 45}, 70%, 50%)`,
      borderWidth: 1,
      parsing: false,
    });
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 ${tab === 'channels' ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-transparent bg-gray-100 text-gray-400'}`}
          onClick={() => setTab('channels')}
        >
          EEG Channels
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 ${tab === 'input' ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-transparent bg-gray-100 text-gray-400'}`}
          onClick={() => setTab('input')}
        >
          Input Data (Scatter)
        </button>
      </div>
      <div className="bg-white rounded-b-lg shadow p-4">
        {tab === 'channels' ? (
          <Line
            data={{ labels, datasets }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' },
                title: { display: true, text: 'EEG Channels Over Time', font: { size: 18 } },
                tooltip: { enabled: true },
              },
              scales: {
                x: { title: { display: true, text: 'Timepoint' } },
                y: { title: { display: true, text: 'Amplitude' } },
              },
              animation: false,
            }}
            height={350}
          />
        ) : (
          <Scatter
            data={scatterData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'EEG Input Data (Scatter)', font: { size: 18 } },
                tooltip: {
                  callbacks: {
                    label: function(context: any) {
                      const raw = context.raw as { x: number; y: number; v: number };
                      const v = raw.v?.toFixed(3);
                      return `Ch ${raw.y}, t=${raw.x}: ${v}`;
                    },
                  },
                },
              },
              scales: {
                x: { title: { display: true, text: 'Timepoint' } },
                y: { title: { display: true, text: 'Channel' }, min: 1, max: nChannels + 0.5, ticks: { stepSize: 1 } },
              },
              animation: false,
            }}
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default EEGVisualizer;
