"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Info, Loader2, Quote, X } from "lucide-react";

interface AboutYearProps {
  yearId?: number;
  onClose?: () => void;
}

const AboutYear = ({ yearId, onClose }: AboutYearProps) => {
  const [about, setAbout] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!yearId) return;

    const fetchAbout = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/year/id/${yearId}/about`);
        if (!res.ok) throw new Error("Failed to fetch about text");
        const data = await res.json();
        setAbout(data.about);
      } catch (err) {
        console.error("Error fetching about text:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [yearId]);

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-medium">Loading summary...</p>
      </div>
    );
  }

  if (!yearId) return null;

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative z-10 w-full max-w-2xl mx-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-3xl bg-white p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden ring-1 ring-black/5">
          {/* Decorative Quote Mark */}
          <Quote className="absolute top-6 left-6 h-12 w-12 text-slate-100 -z-0" />

          {/* Close button inside the top-right corner of the card */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 bg-linear-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:from-indigo-600 hover:to-violet-700 transition-all z-30 hover:scale-110 active:scale-95"
              aria-label="Close reflection"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Info className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Yearly Reflection
              </h3>
            </div>

            <p className="text-xl md:text-2xl leading-relaxed text-slate-700 font-semibold italic pr-6">
              {about || "This year is yet to be chronicled with a detailed summary. Every day was a step towards greatness."}
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100" />
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
};

export default AboutYear;
