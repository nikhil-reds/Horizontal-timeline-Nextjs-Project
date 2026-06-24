"use client";

import { useState, useEffect } from "react";
import FlowTimeline from "./components/FlowTimeline";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#12121a]">
      {loaded && <FlowTimeline />}
    </main>
  );
}
