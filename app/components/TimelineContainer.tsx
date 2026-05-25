"use client";

import { useEffect, useRef, useState } from "react";

// Fallback/Default Foundry achievements timeline data matching original design
const FOUNDRY_FALLBACKS: Record<
  number,
  {
    era: string;
    delta: string;
    tag: string;
    title: string;
    description: string;
    stats: Array<{ label: string; value: string }>;
  }
> = {
  2008: {
    era: "Founding",
    delta: "— founding",
    tag: "Origin",
    title: "A controls team forms in a portable trailer outside Baytown.",
    description:
      "Four engineers, one spreadsheet, and a refinery turnaround that nobody else wanted. Foundry began as a service contract — keep the schedule honest, keep the procurement log clean, keep the field reporting up to date.",
    stats: [
      { label: "Headcount", value: "4" },
      { label: "First project", value: "Refinery TAR-08" },
      { label: "Office", value: "1× trailer" },
    ],
  },
  2011: {
    era: "First product",
    delta: "+ first software release",
    tag: "Product",
    title: "Field Log ships — the spreadsheet finally leaves the trailer.",
    description:
      "What started as an internal workbook for daily reports becomes Foundry's first piece of software. Three EPC contractors sign on within six months. The product roadmap is written in pencil, on the back of a P&ID.",
    stats: [
      { label: "Customers", value: "3" },
      { label: "Reports filed", value: "14,200" },
      { label: "Series A", value: "$6.4M" },
    ],
  },
  2014: {
    era: "Across the desk",
    delta: "+ procurement, schedule",
    tag: "Expansion",
    title: "Procurement and Schedule launch. One platform, three desks.",
    description:
      "The PO log lands in the same database as the field report. Project controllers stop reconciling between Primavera, Excel and email. Foundry now sits between the trailer and the home office on every project it touches.",
    stats: [
      { label: "Active projects", value: "42" },
      { label: "POs tracked", value: "61,800" },
      { label: "Team", value: "38" },
    ],
  },
  2017: {
    era: "Going global",
    delta: "+ EMEA, APAC",
    tag: "Scale",
    title: "Rotterdam and Singapore come online — coverage follows the shipping lanes.",
    description:
      "The first multi-currency, multi-language deployment lands with a Dutch midstream operator. Within eighteen months Foundry runs the controls cadence on projects across nineteen countries and four continents.",
    stats: [
      { label: "Countries", value: "19" },
      { label: "Languages", value: "7" },
      { label: "Series C", value: "$84M" },
    ],
  },
  2020: {
    era: "Crisis, then clarity",
    delta: "× pandemic year",
    tag: "Resilience",
    title: "Site offices empty. Foundry Field carries the load.",
    description:
      "The mobile app — quietly in development for two years — is pulled forward and shipped in eleven weeks. Superintendents file punch lists from their phones at half-capacity sites. Not a single customer cancels.",
    stats: [
      { label: "Field installs", value: "21,400" },
      { label: "Uptime", value: "99.98%" },
      { label: "Retention", value: "100%" },
    ],
  },
  2022: {
    era: "The data layer",
    delta: "+ Foundry Intelligence",
    tag: "Intelligence",
    title: "Variance forecasting goes live across every active baseline.",
    description:
      "Twelve years of schedule and cost history finally pay a dividend. Foundry Intelligence forecasts EVM variance four weeks out at a 86% confidence interval. The first early-warning emails arrive in controllers' inboxes on a Tuesday.",
    stats: [
      { label: "Models in prod", value: "11" },
      { label: "Forecast accuracy", value: "86%" },
      { label: "Hours saved / wk", value: "3,200" },
    ],
  },
  2024: {
    era: "Capital under management",
    delta: "$ crossed $200B",
    tag: "Milestone",
    title: "$200B of capital projects now run through Foundry.",
    description:
      "Two-thirds of the Engineering News-Record Top 100 sit on the platform. The blueprint view — the one drawn on a whiteboard in 2009 — quietly becomes the way most of the industry plans a turnaround.",
    stats: [
      { label: "CAPEX on platform", value: "$200B" },
      { label: "ENR Top-100", value: "68 / 100" },
      { label: "Active users", value: "141,000" },
    ],
  },
  2026: {
    era: "What's next",
    delta: "→ chapter eight",
    tag: "Next",
    title: "One operating model for every project, from FEED to handover.",
    description:
      "This year we close the last seam — engineering and field on a single graph, with every RFI, change order and material movement priced to a live baseline. Eighteen years of work, one cadence.",
    stats: [
      { label: "Roadmap", value: "Unified graph" },
      { label: "Beta partners", value: "14" },
      { label: "Ship", value: "Q4 · 2026" },
    ],
  },
};

interface DBYear {
  id: number;
  year: number;
  about: string | null;
  achievements?: Array<{
    id: number;
    title: string;
    category: string;
    date: Date | string;
  }>;
  assets?: Array<{
    id: number;
    url: string;
    caption: string | null;
    month: number;
  }>;
}

interface TimelineContainerProps {
  initialYears: DBYear[];
}

interface ProcessedItem {
  id: string | number;
  year: number;
  chapter: string;
  era: string;
  delta: string;
  tag: string;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  assets: Array<{ id: number; url: string; caption: string | null; month: number }>;
}

export default function TimelineContainer({ initialYears }: TimelineContainerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hudData, setHudData] = useState({
    year: "2008",
    era: "First chapter · 2008",
    delta: "— founding",
    counter: "01 / 08",
  });
  const [ghostTops, setGhostTops] = useState<number[]>([]);
  const [activeMedia, setActiveMedia] = useState<{ url: string; caption: string | null } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  // Process data: Combine DB data with Foundry template rules & fallbacks
  const processedItems: ProcessedItem[] = (
    initialYears && initialYears.length > 0
      ? [...initialYears].sort((a, b) => a.year - b.year)
      : Object.keys(FOUNDRY_FALLBACKS).map((yr) => ({
          id: yr,
          year: parseInt(yr),
          about: FOUNDRY_FALLBACKS[parseInt(yr)].description,
          achievements: [
            {
              id: Math.random(),
              title: FOUNDRY_FALLBACKS[parseInt(yr)].title,
              category: FOUNDRY_FALLBACKS[parseInt(yr)].tag,
              date: `${yr}-01-01`,
            },
          ],
          assets: parseInt(yr) === 2008 ? [
            { id: 1, url: "/extracted_ui/uploads/Screenshot 2026-05-25 at 12.59.32 PM.png", caption: "Team trailer outside Baytown", month: 5 }
          ] : [],
        }))
  ).map((item, idx) => {
    const fallback = FOUNDRY_FALLBACKS[item.year];
    const chapter = `CH. ${String(idx + 1).padStart(2, "0")}`;

    // If matching fallback exists and DB doesn't have custom achievements/details, merge them
    const era = fallback?.era || (item.achievements?.[0]?.category ?? "Chapter");
    const delta = fallback?.delta || (item.achievements?.[0] ? `+ ${item.achievements[0].title.slice(0, 20)}...` : "— logged");
    const tag = fallback?.tag || (item.achievements?.[0]?.category ?? "Event");
    const title = item.achievements?.[0]?.title || fallback?.title || "Year Reflection";
    const description = item.about || fallback?.description || "A milestone year in our collective history.";

    // Combine stats from fallback or dynamically generate from DB relations
    let stats = fallback?.stats || [];
    if (!fallback && item.achievements) {
      stats = [
        { label: "Achievements", value: String(item.achievements.length) },
        { label: "Media Assets", value: String(item.assets?.length ?? 0) },
        { label: "Category", value: item.achievements[0]?.category ?? "General" },
      ];
    }

    return {
      id: item.id,
      year: item.year,
      chapter,
      era,
      delta,
      tag,
      title,
      description,
      stats,
      assets: item.assets || [],
    };
  });

  const totalCount = processedItems.length;

  // Align ghost backgrounds to item cards
  const layoutGhosts = () => {
    if (!itemsContainerRef.current) return;
    const sectionTop = itemsContainerRef.current.getBoundingClientRect().top + window.scrollY;

    const tops = processedItems.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return 0;
      const cardRect = el.getBoundingClientRect();
      return cardRect.top + window.scrollY - sectionTop + 40;
    });
    setGhostTops(tops);
  };

  // Scroll listener for active HUD and rail progress
  useEffect(() => {
    const handleScroll = () => {
      const viewH = window.innerHeight;
      const midline = viewH * 0.45;

      // 1. Calculate active card based on midline
      let active = 0;
      for (let i = 0; i < processedItems.length; i++) {
        const el = itemRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= midline) {
            active = i;
          }
        }
      }

      // 2. Set active index and update HUD details
      setActiveIdx(active);

      // 3. Update rail fill height
      if (itemsContainerRef.current && railFillRef.current) {
        const rect = itemsContainerRef.current.getBoundingClientRect();
        const totalHeight = rect.height;
        const passed = Math.min(Math.max(midline - rect.top, 0), totalHeight);
        const percent = (passed / totalHeight) * 100;
        railFillRef.current.style.height = `${percent}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", layoutGhosts);

    // Initial run
    handleScroll();
    setTimeout(layoutGhosts, 300); // Small timeout to ensure DOM layout settles

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", layoutGhosts);
    };
  }, [processedItems]);

  // Update HUD text details smoothly when active item changes
  useEffect(() => {
    const cur = processedItems[activeIdx];
    if (!cur) return;

    setHudData({
      year: String(cur.year),
      era: `${cur.chapter} · ${cur.era}`,
      delta: cur.delta,
      counter: `${String(activeIdx + 1).padStart(2, "0")} / ${String(totalCount).padStart(2, "0")}`,
    });
  }, [activeIdx, processedItems, totalCount]);

  // IntersectionObserver for reveal fade-in animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // Keep the fading reactive as in the original design
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        rootMargin: "-10% 0px -15% 0px",
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [processedItems]);

  // Smooth scroll handler
  const scrollToItem = (idx: number) => {
    const el = itemRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="timeline-section" id="timeline" ref={containerRef}>
      {/* Sticky HUD (Left/Desktop) */}
      <div className="timeline-hud" aria-hidden="true">
        <div>
          <div className="era" id="hudEra">
            {hudData.era}
          </div>
          <div className="progress">
            <i
              id="hudProgress"
              style={{
                width: `${((activeIdx + 1) / totalCount) * 100}%`,
              }}
            ></i>
          </div>
          <div className="counter" id="hudCounter">
            {hudData.counter}
          </div>
        </div>
        <div className="year-row">
          <div
            className="year"
            id="hudYear"
            style={{
              transition: "opacity 0.2s ease",
            }}
          >
            {hudData.year}
          </div>
          <div className="delta" id="hudDelta">
            {hudData.delta}
          </div>
        </div>
      </div>

      {/* Floating Ghost Years behind cards */}
      <div className="ghost-years-container" id="ghostYears">
        {processedItems.map((item, i) => (
          <span
            key={`ghost-${item.year}`}
            style={{
              fontSize: `${220 + (i % 3) * 30}px`,
              right: `${i % 2 === 0 ? -60 : -120}px`,
              top: `${ghostTops[i] ?? 0}px`,
            }}
          >
            {item.year}
          </span>
        ))}
      </div>

      {/* Vertical timeline items */}
      <div className="timeline-items" id="items" ref={itemsContainerRef}>
        {processedItems.map((item, idx) => (
          <article
            key={item.id}
            className="timeline-item"
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
          >
            <div className="stamp">
              {item.chapter}
              <span className="y">{item.year}</span>
            </div>
            <div className="body">
              <div className="card">
                <div className="tag">
                  <span className="pulse"></span>
                  {item.tag}
                </div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>

                {/* Optional Media Gallery inside cards */}
                {item.assets && item.assets.length > 0 && (
                  <div className="card-media">
                    {item.assets.map((asset) => (
                      <div
                        key={asset.id}
                        className="media-thumb animate-in fade-in"
                        onClick={() => setActiveMedia({ url: asset.url, caption: asset.caption })}
                        title={asset.caption || "View image"}
                      >
                        <img src={asset.url} alt={asset.caption || "Timeline moment"} />
                      </div>
                    ))}
                  </div>
                )}

                <div className="stats">
                  {item.stats.map((stat, sIdx) => (
                    <div className="stat" key={`stat-${idx}-${sIdx}`}>
                      <div className="k">{stat.label}</div>
                      <div className="v">
                        {stat.value.startsWith("$") || stat.value.includes("%") ? (
                          <em>{stat.value}</em>
                        ) : (
                          stat.value
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Scroll tracker highlight bar overlay */}
        <div id="timeline-railFill" ref={railFillRef}></div>
      </div>

      {/* Right floating mini navigator */}
      <aside className="timeline-mini" id="mini" aria-hidden="true">
        {processedItems.map((item, i) => (
          <button
            key={`mini-${item.year}`}
            type="button"
            className={`node ${i === activeIdx ? "is-active" : ""}`}
            onClick={() => scrollToItem(i)}
          >
            <span className="pip"></span>
            <span className="label">{item.year}</span>
          </button>
        ))}
      </aside>

      {/* Full-screen Media Lightbox Popup */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6 transition-all duration-300 animate-in fade-in"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-all"
              aria-label="Close image popup"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </button>
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-slate-950 flex items-center justify-center shadow-2xl">
              <img
                src={activeMedia.url}
                alt={activeMedia.caption || "Full scale asset"}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
            {activeMedia.caption && (
              <p className="mt-4 text-center text-slate-300 text-sm font-semibold tracking-wide bg-slate-900/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
                {activeMedia.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
