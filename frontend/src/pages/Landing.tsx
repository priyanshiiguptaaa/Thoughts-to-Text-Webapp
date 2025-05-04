import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center bg-[#f4f6fa] px-4 overflow-x-hidden">
      {/* SVG Wave Background */}
      <div className="absolute inset-0 w-full h-64 top-0 left-0 z-0 pointer-events-none select-none">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#2563eb" fillOpacity="0.10" d="M0,192L80,186.7C160,181,320,171,480,149.3C640,128,800,96,960,117.3C1120,139,1280,213,1360,250.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"/>
        </svg>
      </div>
      {/* Hero Section */}
      <section className="relative z-10 w-full flex flex-col items-center pt-28 pb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center tracking-tight text-[#143061] drop-shadow-sm">EEG2Text</h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-7 text-center text-[#2563eb]">Assistive Brain-to-Text Communication</h2>
        <p className="max-w-2xl text-lg md:text-xl text-center mb-10 text-[#1a2233] opacity-85">
          Next-generation platform for translating imagined thoughts into text using deep learning on EEG signals. Empowering communication for motor-impaired patients and advancing BCI research.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Link to="/about" className="min-w-[140px] px-7 py-3 bg-white border border-[#2563eb] text-[#2563eb] font-semibold rounded-full hover:bg-[#2563eb] hover:text-white transition text-lg flex items-center gap-2 justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
            <svg className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="8.5" r="1" fill="currentColor"/></svg>
            <span>About</span>
          </Link>
          <Link to="/demo" className="min-w-[140px] px-7 py-3 bg-[#2563eb] text-white font-semibold rounded-full hover:bg-[#143061] transition text-lg flex items-center gap-2 justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="7" y="11" width="2" height="2" fill="currentColor"/><rect x="11" y="11" width="2" height="2" fill="currentColor"/><rect x="15" y="11" width="2" height="2" fill="currentColor"/></svg>
            <span>Try Demo</span>
          </Link>
          <a href="/api-docs.html" target="_blank" rel="noopener noreferrer" className="min-w-[140px] px-7 py-3 bg-white border border-[#2563eb] text-[#2563eb] font-semibold rounded-full hover:bg-[#2563eb] hover:text-white transition text-lg flex items-center gap-2 justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
            <svg className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><line x1="9" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="2"/><line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="9" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="2"/></svg>
            <span>Docs</span>
          </a>
        </div>
      </section>
      {/* Features Grid - Modern & Balanced */}
      <section className="relative z-10 w-full max-w-3xl mt-8 mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center text-[#143061]">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center bg-[#f7fafd] border border-[#e3e9f4] rounded-xl shadow-sm p-7 min-h-[170px]">
            <span className="material-icons text-[#2563eb] text-5xl mb-3">psychology</span>
            <span className="font-bold text-lg text-[#143061] mb-1">Deep Learning EEG</span>
            <span className="text-gray-500 text-center text-sm">AI-powered decoding of imagined letters from EEG signals.</span>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center bg-[#f7fafd] border border-[#e3e9f4] rounded-xl shadow-sm p-7 min-h-[170px]">
            <span className="material-icons text-[#2563eb] text-5xl mb-3">accessibility_new</span>
            <span className="font-bold text-lg text-[#143061] mb-1">Assistive Tech</span>
            <span className="text-gray-500 text-center text-sm">Designed for motor-impaired users to enable communication.</span>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center bg-[#f7fafd] border border-[#e3e9f4] rounded-xl shadow-sm p-7 min-h-[170px]">
            <span className="material-icons text-[#2563eb] text-5xl mb-3">insights</span>
            <span className="font-bold text-lg text-[#143061] mb-1">Real-time Analytics</span>
            <span className="text-gray-500 text-center text-sm">Instant feedback and analytics for every prediction.</span>
          </div>
          {/* Feature 4 */}
          <div className="flex flex-col items-center bg-[#f7fafd] border border-[#e3e9f4] rounded-xl shadow-sm p-7 min-h-[170px]">
            <span className="material-icons text-[#2563eb] text-5xl mb-3">cloud_upload</span>
            <span className="font-bold text-lg text-[#143061] mb-1">EEG Upload & API</span>
            <span className="text-gray-500 text-center text-sm">Upload EEG data and access our platform via secure API.</span>
          </div>
        </div>
      </section>
      <footer className="relative z-10 mt-auto mb-4 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} EEG2Text | Assistive BCI Platform
      </footer>
    </main>
  );
}
