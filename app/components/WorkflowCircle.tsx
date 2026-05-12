"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface YearCircle {
  id: number;
  year: number;
}

interface WorkflowCircleProps {
  years: YearCircle[];
  selectedYear: number;
}

const WorkflowCircle = ({ years, selectedYear }: WorkflowCircleProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortedYears = useMemo(
    () => [...years].sort((a, b) => a.year - b.year),
    [years]
  );

  const handleYearClick = (year: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", year.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
        Timeline
      </div>
      <div className="relative flex items-center gap-8 overflow-x-auto py-6">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-0.5 bg-slate-200" />

        {sortedYears.map((item) => {
          const isSelected = item.year === selectedYear;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleYearClick(item.year)}
              className={`relative z-10 flex h-20 w-20 flex-col shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-110"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              <span className="text-lg font-semibold leading-none">{item.year}</span>
              <span className={`mt-1 text-[0.65rem] uppercase tracking-[0.2em] ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                Year
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-center text-sm font-medium text-slate-500">
        Click a year to explore achievements and gallery.
      </div>
    </section>
  );
};

export default WorkflowCircle;

