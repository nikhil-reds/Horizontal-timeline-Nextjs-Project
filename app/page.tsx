import { prisma } from "./lib/prisma";
import TimelineCanvas from "./components/TimelineCanvas";
import TimelineContainer from "./components/TimelineContainer";

export const revalidate = 0; // Disable static rendering caching to allow dynamic updates

export default async function Home() {
  let dbYears: Array<{
    id: number;
    year: number;
    about: string | null;
    achievements: Array<{
      id: number;
      title: string;
      category: string;
      date: Date | string;
    }>;
    assets: Array<{
      id: number;
      url: string;
      caption: string | null;
      month: number;
    }>;
  }> = [];

  try {
    dbYears = await prisma.year.findMany({
      include: {
        achievements: {
          orderBy: { date: "asc" },
        },
        assets: {
          orderBy: { month: "asc" },
        },
      },
      orderBy: { year: "asc" },
    });
  } catch (error) {
    console.warn(
      "Database connection could not be established or has not been initialized. Falling back to static Foundry timeline data.",
      error
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--ink-2)] text-[var(--text-1)] select-none">
      {/* 1. Scenic backdrop overlay & active particles */}
      <div className="timeline-backdrop" />
      <TimelineCanvas />

      {/* 2. Top header brand chrome */}
      <header className="timeline-topbar">
        <div className="timeline-brand">
          <div className="mark" aria-hidden="true"></div>
          <span>Foundry</span>
          <span style={{ color: "var(--text-3)", fontWeight: 400, marginLeft: "6px" }}>
            / Achievements
          </span>
        </div>
        <div className="meta">
          <span className="dot"></span>
          <span>Est. 2008 — A 18-Year Record</span>
        </div>
      </header>

      {/* 3. Hero Intro section */}
      <section className="timeline-hero">
        <div>
          <div className="eyebrow">Foundry — Eighteen Years In</div>
          <h1>
            Built quietly, <em>at scale</em>.
          </h1>
          <p>
            From a four-person controls team in a shared trailer to the operating system behind
            two hundred billion dollars of capital projects. The work, year by year.
          </p>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="line"></div>
        </div>
      </section>

      {/* 4. Interactive Timeline */}
      <TimelineContainer initialYears={dbYears} />

      {/* 5. Timeline Outro Section */}
      <section className="timeline-outro">
        <span className="eyebrow">Chapter Nine</span>
        <h2>
          The next ten years are <span style={{ color: "var(--accent)" }}>harder</span>. We're built for it.
        </h2>
        <p>
          Grid build-outs, gigafactories, transmission corridors, a new generation of refineries.
          The cadence we built doesn't get easier — but it does scale.
        </p>
        <a className="cta" href="#">
          Read the full report
          <svg className="arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>
    </main>
  );
}
