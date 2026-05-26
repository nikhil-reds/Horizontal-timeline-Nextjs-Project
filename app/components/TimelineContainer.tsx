"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  2007: {
    era: "Founding",
    delta: "— founding",
    tag: "Origin",
    title: "A controls team forms in a portable trailer outside Baytown.",
    description:
      "Four engineers, one spreadsheet, and a refinery turnaround that nobody else wanted. Foundry began as a service contract — keep the schedule honest, keep the procurement log clean, keep the field reporting up to date.",
    stats: [
      { label: "Headcount", value: "4" },
      { label: "First project", value: "Refinery TAR-07" },
      { label: "Office", value: "1× trailer" },
    ],
  },
  2010: {
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
  2013: {
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
  2015: {
    era: "Crew + cost",
    delta: "+ crew, labour",
    tag: "Crew",
    title: "Crew, cost and craft hours converge in one ledger.",
    description:
      "Time entry, daily reports and labour cost roll up into the same view controllers already know. Foreman tablets become the source-of-truth for craft hours across thirty-one active jobsites.",
    stats: [
      { label: "Active sites", value: "31" },
      { label: "Foreman tablets", value: "1,400" },
      { label: "Hours / week", value: "320k" },
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
  2019: {
    era: "Field-first",
    delta: "× Foundry Field v2",
    tag: "Mobile",
    title: "Field gets a second pass — offline-first, photo-aware, sub-second.",
    description:
      "Two years of customer wear-and-tear feedback rolls into a ground-up mobile rewrite. RFIs, observations and punch items now sync the moment a tablet sees a tower again.",
    stats: [
      { label: "Offline ops", value: "Full" },
      { label: "Photos / month", value: "480k" },
      { label: "Sync latency", value: "< 800ms" },
    ],
  },
  2021: {
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
      "Fifteen years of schedule and cost history finally pay a dividend. Foundry Intelligence forecasts EVM variance four weeks out at an 86% confidence interval. The first early-warning emails arrive in controllers' inboxes on a Tuesday.",
    stats: [
      { label: "Models in prod", value: "11" },
      { label: "Forecast accuracy", value: "86%" },
      { label: "Hours saved / wk", value: "3,200" },
    ],
  },
  2023: {
    era: "Beyond forecasting",
    delta: "+ Intelligence v2",
    tag: "Models",
    title: "Prescriptive moves replace the early-warning email.",
    description:
      "Variance forecasts arrive with proposed schedule and crew interventions, scored against historical precedent. Controllers start adopting model recommendations as the first draft of their re-baseline.",
    stats: [
      { label: "Recs / day", value: "4,800" },
      { label: "Adoption rate", value: "71%" },
      { label: "Models in prod", value: "24" },
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
  2025: {
    era: "Program scale",
    delta: "+ portfolio rollups",
    tag: "Portfolio",
    title: "Multi-program rollups land — eighty-five projects on one cadence.",
    description:
      "Owners and EPCs running parallel megaprograms get a single cadence view. Variance, float consumption and labour productivity now compare like-for-like across an entire capital portfolio.",
    stats: [
      { label: "Programs live", value: "12" },
      { label: "Projects rolled up", value: "85" },
      { label: "Cross-program insights", value: "Live" },
    ],
  },
  2026: {
    era: "What's next",
    delta: "→ chapter eight",
    tag: "Next",
    title: "One operating model for every project, from FEED to handover.",
    description:
      "This year we close the last seam — engineering and field on a single graph, with every RFI, change order and material movement priced to a live baseline. Nineteen years of work, one cadence.",
    stats: [
      { label: "Roadmap", value: "Unified graph" },
      { label: "Beta partners", value: "14" },
      { label: "Ship", value: "Q4 · 2026" },
    ],
  },
};

// Floating media collage shown around each year's card (Unsplash + a few sample videos)
type MediaSlot = "tl" | "tr" | "bl" | "br" | "ml" | "mr";
type Media =
  | { type: "image"; url: string; alt: string; pos: MediaSlot }
  | { type: "video"; url: string; poster?: string; alt: string; pos: MediaSlot };

const UNSPLASH = (id: string, w = 480) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const FOUNDRY_MEDIA: Record<number, Media[]> = {
  2007: [
    { type: "image", url: UNSPLASH("photo-1518709268805-4e9042af2176"), alt: "Industrial plant at dusk", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1581094794329-c8112a89af12"), alt: "Engineering blueprint", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1473341304170-971dccb5ac1e"), alt: "Pipework", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1542838132-92c53300491e"), alt: "Refinery skyline", pos: "br" },
  ],
  2010: [
    { type: "image", url: UNSPLASH("photo-1497366216548-37526070297c"), alt: "Laptop on a desk", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1517245386807-bb43f82c33c4"), alt: "Code on monitor", pos: "tr" },
    { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", alt: "Team in motion", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1497366811353-6870744d04b2"), alt: "Open laptop", pos: "br" },
  ],
  2013: [
    { type: "image", url: UNSPLASH("photo-1554224155-6726b3ff858f"), alt: "Spreadsheets and procurement", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1497032628192-86f99bcd76bc"), alt: "Office floor", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1556761175-5973dc0f32e7"), alt: "Team meeting", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1551836022-d5d88e9218df"), alt: "Schedule planning", pos: "br" },
  ],
  2015: [
    { type: "image", url: UNSPLASH("photo-1504917595217-d4dc5ebe6122"), alt: "Crew on site", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1581094024226-2eeb1c1aae42"), alt: "Construction crew", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1593113598332-cd288d649433"), alt: "Tablet on a jobsite", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1581092335397-9583eb92d232"), alt: "Foreman with hardhat", pos: "br" },
  ],
  2017: [
    { type: "image", url: UNSPLASH("photo-1577563908411-5077b6dc7624"), alt: "Container port", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1605745341112-85968b19335b"), alt: "Logistics yard", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1473093295043-cdd812d0e601"), alt: "Global city skyline", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1494522855154-9297ac14b55f"), alt: "Travel routes", pos: "br" },
  ],
  2019: [
    { type: "image", url: UNSPLASH("photo-1512941937669-90a1b58e7e9c"), alt: "Tablet in the field", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1581094288338-2314dddb7ece"), alt: "Site walk", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1581092580497-e0d23cbdf1dc"), alt: "Mobile field tools", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1556761175-b413da4baf72"), alt: "Field tech check", pos: "br" },
  ],
  2021: [
    { type: "image", url: UNSPLASH("photo-1521737711867-e3b97375f902"), alt: "Remote work setup", pos: "tl" },
    { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", alt: "On-site mobile", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1551836022-deb4988cc6c0"), alt: "Empty office", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1556761175-5973dc0f32e7"), alt: "Distributed team", pos: "br" },
  ],
  2022: [
    { type: "image", url: UNSPLASH("photo-1551288049-bebda4e38f71"), alt: "Analytics dashboard", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1460925895917-afdab827c52f"), alt: "Data visualization", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1543286386-713bdd548da4"), alt: "Charts on screen", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1518770660439-4636190af475"), alt: "Circuit board", pos: "br" },
  ],
  2023: [
    { type: "image", url: UNSPLASH("photo-1620712943543-bcc4688e7485"), alt: "AI model visualization", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1677442136019-21780ecad995"), alt: "Neural network", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1551434678-e076c223a692"), alt: "Team reviewing forecasts", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1551288049-bebda4e38f71"), alt: "Prescriptive dashboard", pos: "br" },
  ],
  2024: [
    { type: "image", url: UNSPLASH("photo-1486406146926-c627a92ad1ab"), alt: "Skyscraper construction", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1502920917128-1aa500764cbd"), alt: "Tower crane silhouette", pos: "tr" },
    { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", alt: "Project ribbon cut", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1503387762-592deb58ef4e"), alt: "City under build", pos: "br" },
  ],
  2025: [
    { type: "image", url: UNSPLASH("photo-1542744173-8e7e53415bb0"), alt: "Program rollup meeting", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1559136555-9303baea8ebd"), alt: "Portfolio dashboards", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1591696205602-2f950c417cb9"), alt: "Project portfolio", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1551836022-d5d88e9218df"), alt: "Strategy planning", pos: "br" },
  ],
  2026: [
    { type: "image", url: UNSPLASH("photo-1485827404703-89b55fcc595e"), alt: "Future workflow", pos: "tl" },
    { type: "image", url: UNSPLASH("photo-1581094794329-c8112a89af12"), alt: "Blueprint detail", pos: "tr" },
    { type: "image", url: UNSPLASH("photo-1531297484001-80022131f5a1"), alt: "Connected lights", pos: "bl" },
    { type: "image", url: UNSPLASH("photo-1518770660439-4636190af475"), alt: "Network of lights", pos: "br" },
  ],
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
  const [ghostLefts, setGhostLefts] = useState<number[]>([]);
  const [activeMedia, setActiveMedia] = useState<{ url: string; caption: string | null } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  // Process data: Combine DB data with Foundry template rules & fallbacks
  const processedItems: ProcessedItem[] = useMemo(() => (
    initialYears && initialYears.length > 0
      ? [...initialYears].sort((a, b) => a.year - b.year)
      : Object.keys(FOUNDRY_FALLBACKS).map((yr) => ({
          id: yr,
          year: parseInt(yr),
          about: FOUNDRY_FALLBACKS[parseInt(yr)].description,
          achievements: [
            {
              id: parseInt(yr),
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

    const era = fallback?.era || (item.achievements?.[0]?.category ?? "Chapter");
    const delta = fallback?.delta || (item.achievements?.[0] ? `+ ${item.achievements[0].title.slice(0, 20)}...` : "— logged");
    const tag = fallback?.tag || (item.achievements?.[0]?.category ?? "Event");
    const title = item.achievements?.[0]?.title || fallback?.title || "Year Reflection";
    const description = item.about || fallback?.description || "A milestone year in our collective history.";

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
  }), [initialYears]);

  const totalCount = processedItems.length;

  // Align ghost backgrounds horizontally to item cards
  const layoutGhosts = () => {
    if (!itemsContainerRef.current) return;
    const lefts = processedItems.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return 0;
      return el.offsetLeft;
    });
    setGhostLefts(lefts);
  };

  // Horizontal scroll listener for active HUD and rail progress
  useEffect(() => {
    const container = itemsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideWidth = container.clientWidth;

      // One slide per viewport: active = nearest slide index
      const active = Math.min(
        processedItems.length - 1,
        Math.max(0, Math.round(container.scrollLeft / slideWidth))
      );

      setActiveIdx(active);

      if (railFillRef.current) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const percent = maxScroll > 0 ? (container.scrollLeft / maxScroll) * 100 : 0;
        railFillRef.current.style.width = `${percent}%`;
      }
    };

    let wheelLock = false;
    const handleWheel = (e: WheelEvent) => {
      // Convert vertical wheel into one-slide-at-a-time horizontal snap
      const dominant = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(dominant) < 8) return;

      const slideWidth = container.clientWidth;
      const currentIdx = Math.round(container.scrollLeft / slideWidth);
      const direction = dominant > 0 ? 1 : -1;
      const targetIdx = currentIdx + direction;

      // Let the page take over at the boundaries
      if (targetIdx < 0 || targetIdx >= processedItems.length) return;

      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      container.scrollTo({ left: targetIdx * slideWidth, behavior: "smooth" });
      setTimeout(() => {
        wheelLock = false;
      }, 600);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", layoutGhosts);

    handleScroll();
    setTimeout(layoutGhosts, 300);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleWheel);
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
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        root: itemsContainerRef.current,
        rootMargin: "0px -15% 0px -10%",
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [processedItems]);

  // Snap to slide idx (one viewport per year)
  const scrollToItem = (idx: number) => {
    const container = itemsContainerRef.current;
    if (container) {
      container.scrollTo({ left: idx * container.clientWidth, behavior: "smooth" });
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

      {/* Horizontal timeline items (with ghost years inside the scroll container) */}
      <div className="timeline-items" id="items" ref={itemsContainerRef}>
        <div className="ghost-years-container" id="ghostYears" aria-hidden="true">
          {processedItems.map((item, i) => (
            <span
              key={`ghost-${item.year}`}
              style={{
                fontSize: `${220 + (i % 3) * 30}px`,
                top: `${i % 2 === 0 ? -40 : -10}px`,
                left: `${ghostLefts[i] ?? 0}px`,
              }}
            >
              {item.year}
            </span>
          ))}
        </div>
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
              {/* Floating media collage around the card */}
              <div className="media-floats" aria-hidden="true">
                {(FOUNDRY_MEDIA[item.year] || []).map((m, mi) => (
                  <figure
                    key={`media-${item.year}-${mi}`}
                    className={`media-piece pos-${m.pos} ${m.type === "video" ? "is-video" : "is-image"}`}
                    style={{ animationDelay: `${mi * 90}ms` }}
                  >
                    {m.type === "image" ? (
                      <img
                        src={m.url}
                        alt={m.alt}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <video
                        src={m.url}
                        poster={m.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={m.alt}
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                        }}
                      />
                    )}
                    {m.type === "video" && (
                      <span className="media-badge" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        LIVE
                      </span>
                    )}
                  </figure>
                ))}
              </div>

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
