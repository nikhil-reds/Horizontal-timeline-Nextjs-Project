"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Achievements from "./Achievements";
import AboutYear from "./AboutYear";

export interface YearCircle {
  id: number;
  year: number;
}

interface WorkflowCircleProps {
  years: YearCircle[];
  selectedYear: number;
}

type PillTab = "achievement" | "gallery" | "about";
type GalleryTab = "image" | "video";

const DEMO_IMAGES = [
  { id: 1, src: "https://picsum.photos/seed/gal1/600/400", caption: "Annual Conference" },
  { id: 2, src: "https://picsum.photos/seed/gal2/600/400", caption: "Team Celebration" },
  { id: 3, src: "https://picsum.photos/seed/gal3/600/400", caption: "Product Launch" },
  { id: 4, src: "https://picsum.photos/seed/gal4/600/400", caption: "Office Opening" },
  { id: 5, src: "https://picsum.photos/seed/gal5/600/400", caption: "Awards Night" },
  { id: 6, src: "https://picsum.photos/seed/gal6/600/400", caption: "Client Meetup" },
];

const DEMO_VIDEOS = [
  { id: 1, thumb: "https://picsum.photos/seed/vid1/600/400", title: "Year Highlights" },
  { id: 2, thumb: "https://picsum.photos/seed/vid2/600/400", title: "Company Overview" },
  { id: 3, thumb: "https://picsum.photos/seed/vid3/600/400", title: "Team Spotlight" },
];

/* ── Popup ────────────────────────────────────────────────── */

function MediaPopup({
  type,
  items,
  activeIndex,
  onClose,
}: {
  type: GalleryTab;
  items: typeof DEMO_IMAGES | typeof DEMO_VIDEOS;
  activeIndex: number;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeItem = items[activeIndex];

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Active media */}
      <div
        className="relative z-10 w-full max-w-2xl mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-linear-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:from-indigo-600 hover:to-violet-700 transition-all z-50 hover:scale-110 active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {type === "image" ? (
          <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 bg-slate-950 flex flex-col items-center justify-center">
            <img
              src={(activeItem as (typeof DEMO_IMAGES)[0]).src}
              alt={(activeItem as (typeof DEMO_IMAGES)[0]).caption || "Gallery image"}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            {activeItem.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-xs px-6 py-3 text-center rounded-b-2xl">
                <p className="text-white font-semibold text-sm tracking-wide">
                  {(activeItem as (typeof DEMO_IMAGES)[0]).caption}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-video rounded-2xl shadow-2xl bg-linear-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center gap-3 ring-1 ring-white/10">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500/30 to-violet-600/30 border border-white/20 flex items-center justify-center">
              <div className="w-0 h-0 border-t-12 border-t-transparent border-l-20 border-l-white border-b-12 border-b-transparent ml-1" />
            </div>
            <p className="text-white font-medium text-lg">
              {(activeItem as (typeof DEMO_VIDEOS)[0]).title}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}

/* ── Gallery panel ─────────────────────────────────────────── */

function GalleryPanel() {
  const [tab, setTab] = useState<GalleryTab>("image");
  const [popup, setPopup] = useState<number | null>(null);

  const items = tab === "image" ? DEMO_IMAGES : DEMO_VIDEOS;

  return (
    <div>
      {/* Image / Video sub-pills */}
      <div className="flex justify-center gap-3 mb-5">
        {(["image", "video"] as GalleryTab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPopup(null); }}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              tab === t
                ? "bg-linear-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-md shadow-indigo-200"
                : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {t === "image" ? "Image Gallery" : "Video Gallery"}
          </button>
        ))}
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
        {items.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setPopup(i)}
            className="aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-200/50 relative ring-1 ring-slate-200 hover:ring-indigo-300"
          >
            <img
              src={"src" in item ? item.src : item.thumb}
              alt={"caption" in item ? item.caption : item.title}
              className="w-full h-full object-cover"
            />
            {tab === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-indigo-900/40 to-violet-900/40">
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-indigo-700 border-b-[5px] border-b-transparent ml-0.5" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {popup !== null && (
        <MediaPopup
          type={tab}
          items={items}
          activeIndex={popup}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}

/* ── Content panel (3 pills + content) ─────────────────────── */

function ContentPanel({ yearId }: { yearId: number | undefined }) {
  const [tab, setTab] = useState<PillTab | null>(null);

  return (
    <div className="mx-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-100/80 border border-indigo-100 overflow-hidden">
      <div className="px-8 py-5">
        {/* 3 main pills */}
        <div className="flex justify-center gap-3 mb-5">
          {(["achievement", "gallery", "about"] as PillTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(tab === t ? null : t)}
              className={`px-5 py-2 rounded-full text-[11px] font-semibold border transition-all duration-200 ${
                tab === t
                  ? "bg-linear-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-md shadow-indigo-200"
                  : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50"
              }`}
            >
              {t === "achievement"
                ? "Achievement"
                : t === "gallery"
                ? "Gallery"
                : "About the Year"}
            </button>
          ))}
        </div>

        {tab === "gallery" && <GalleryPanel />}
        {tab === "achievement" && <Achievements yearId={yearId} />}
        {tab === "about" && <AboutYear yearId={yearId} />}
      </div>
    </div>
  );
}

/* ── Main timeline component ────────────────────────────────── */

const WorkflowCircle = ({ years, selectedYear }: WorkflowCircleProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sorted = [...years].sort((a, b) => a.year - b.year);
  const selectedIdx = sorted.findIndex((y) => y.year === selectedYear);
  const selected = sorted[selectedIdx];
  // even index → content ABOVE timeline; odd → BELOW
  const contentAbove = selectedIdx % 2 === 0;

  const handleClick = (year: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", year.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full flex flex-col">
      {/* ── ABOVE content area ── */}
      <div className="min-h-72 flex flex-col justify-end">
        {contentAbove && selected && (
          <>
            <ContentPanel key={selectedYear} yearId={selected.id} />
            <div className="flex justify-center">
              <div className="w-px h-8 bg-linear-to-b from-violet-400 to-indigo-300" />
            </div>
          </>
        )}
      </div>

      {/* ── Timeline row ── */}
      <div className="overflow-x-scroll pb-3 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-indigo-50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-linear-to-r [&::-webkit-scrollbar-thumb]:from-indigo-400 [&::-webkit-scrollbar-thumb]:to-violet-500">
        <div className="relative flex items-center px-16 min-w-max py-10">
          {/* Horizontal axis line — gradient with soft glow */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-linear-to-r from-indigo-300 via-violet-400 to-purple-300 -translate-y-1/2 shadow-sm" />

          {sorted.map((item, idx) => {
            const isSelected = item.year === selectedYear;
            const stubUp = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center mx-6"
              >
                {/* Up stub */}
                <div
                  className={`w-px transition-all duration-300 ${
                    stubUp ? "h-8" : "h-8 invisible"
                  } ${
                    stubUp && isSelected
                      ? "bg-linear-to-b from-transparent to-violet-500"
                      : "bg-slate-200"
                  }`}
                />

                {/* Year circle */}
                <button
                  onClick={() => handleClick(item.year)}
                  className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-base font-bold text-white transition-all duration-300 ${
                    isSelected
                      ? "bg-linear-to-br from-indigo-500 to-violet-600 scale-110 shadow-2xl shadow-violet-300/60 ring-4 ring-violet-200 ring-offset-2"
                      : "bg-linear-to-br from-slate-300 to-slate-400 hover:from-indigo-400 hover:to-violet-500 hover:scale-105 hover:shadow-lg hover:shadow-indigo-200/50"
                  }`}
                >
                  {item.year}
                </button>

                {/* Down stub */}
                <div
                  className={`w-px transition-all duration-300 ${
                    !stubUp ? "h-8" : "h-8 invisible"
                  } ${
                    !stubUp && isSelected
                      ? "bg-linear-to-b from-violet-500 to-transparent"
                      : "bg-slate-200"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BELOW content area ── */}
      <div className="min-h-72">
        {!contentAbove && selected && (
          <>
            <div className="flex justify-center">
              <div className="w-px h-8 bg-linear-to-b from-indigo-300 to-violet-400" />
            </div>
            <ContentPanel key={selectedYear} yearId={selected.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default WorkflowCircle;
