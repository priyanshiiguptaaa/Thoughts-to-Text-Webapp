import React from "react";
interface Props {
  text: string;
}
const TextOutput: React.FC<Props> = ({ text }) => (
  <div className="min-h-[200px] p-4 bg-gray-50 rounded border border-gray-200">
    <p className="text-xl font-mono">{text || "Waiting for input..."}</p>
  </div>
);
export default TextOutput;
