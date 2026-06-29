"use client";

import { useEffect } from "react";

export default function FlowTimeline() {
  useEffect(() => {
    // Inject Cinzel font
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Cinzel&display=swap";
    document.head.appendChild(fontLink);

    // Inject compiled timeline stylesheet
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.crossOrigin = "anonymous";
    cssLink.href = "/goghwiththeflow/assets/index-rubenius.css?v=3";
    document.head.appendChild(cssLink);

    // Inject compiled timeline script
    const script = document.createElement("script");
    script.type = "module";
    script.crossOrigin = "anonymous";
    script.src = "/goghwiththeflow/assets/index-rubenius.js?v=3";
    document.head.appendChild(script);

    return () => {
      // Clean up the injected tags on unmount to avoid side effects
      if (fontLink.parentNode) fontLink.parentNode.removeChild(fontLink);
      if (cssLink.parentNode) cssLink.parentNode.removeChild(cssLink);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return <div id="app" className="w-full h-full" />;
}
