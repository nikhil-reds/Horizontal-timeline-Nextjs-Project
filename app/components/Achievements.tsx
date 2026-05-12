"use client";

import React, { useState, useEffect } from "react";
import { Award, Calendar, Loader2 } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  category: string;
  date: string;
  yearId: number;
}

interface AchievementsProps {
  yearId?: number;
}

const CATEGORY_COLORS: { [key: string]: string } = {
  Professional: "bg-blue-500",
  Personal: "bg-purple-500",
  Academic: "bg-emerald-500",
  Sport: "bg-orange-500",
  Other: "bg-slate-400",
};

const Achievements = ({ yearId }: AchievementsProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!yearId) return;

    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/year/id/${yearId}/achievements`);
        if (!res.ok) throw new Error("Failed to fetch achievements");
        const data = await res.json();
        setAchievements(data);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [yearId]);

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-medium">Loading achievements...</p>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <Award className="h-12 w-12 text-slate-200 mb-4" />
        <p className="text-slate-400 font-medium">No achievements recorded for this year.</p>
      </div>
    );
  }

  return (
    <div className="relative py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Vertical Line */}
      <div className="absolute left-[11px] top-0 h-full w-0.5 bg-slate-100 md:left-1/2 md:-ml-px" />

      <div className="space-y-12">
        {achievements.map((achievement, index) => {
          const color = CATEGORY_COLORS[achievement.category] || CATEGORY_COLORS.Other;
          const isEven = index % 2 === 0;

          return (
            <div key={achievement.id} className="relative flex flex-col md:flex-row md:items-center">
              {/* Category Dot */}
              <div className={`absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white ${color} shadow-sm md:left-1/2 md:-ml-3`} />

              {/* Content Card */}
              <div className={`ml-10 md:ml-0 md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"}`}>
                <div className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-blue-100 hover:shadow-md">
                  <div className={`flex items-center gap-2 mb-2 ${isEven ? "md:flex-row-reverse" : ""}`}>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${color}`}>
                      {achievement.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                      <Calendar className="h-3 w-3" />
                      {new Date(achievement.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-blue-900 transition-colors">
                    {achievement.title}
                  </h3>
                </div>
              </div>

              {/* Empty Space for the other side */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
