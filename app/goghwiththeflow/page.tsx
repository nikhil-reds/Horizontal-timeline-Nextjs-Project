"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function GoghWithTheFlowPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state once page mounts client-side
    setLoaded(true);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#12121a]">
      {/* Premium Glassmorphic Back Button */}
      <div className="absolute top-4 left-4 z-50 pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-white/20 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 shadow-2xl group text-xs uppercase tracking-wider font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-300"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Timeline
        </Link>
      </div>

      {/* Standalone GoghWithTheFlow App Iframe */}
      {loaded && (
        <iframe
          src="/goghwiththeflow/index.html"
          className="w-full h-full border-0 select-none"
          title="Rubenius Interiors - Twenty Years of Interior Wellbeing"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-downloads allow-forms"
        />
      )}
    </main>
  );
}
