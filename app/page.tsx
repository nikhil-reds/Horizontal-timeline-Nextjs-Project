"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#12121a]">
      {/* Standalone Rubenius Timeline App Iframe */}
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
