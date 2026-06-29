"use client";

import YoutubeVideoCard from "../components/YoutubeVideoCard";

const VIDEO_CARDS = [
  {
    embedUrl: "https://www.youtube.com/embed/6vWFokOO9K8",
    title: "Watch — Interactive Technology Showcase",
    artistDisplayName: "Rubenius Interiors",
    artistDisplayBio: "Awards: 3 • Milestone: Tech Integration • Format: Spaceiux · FOAID",
    department: "Innovation",
    objectDate: "2024",
    medium:
      "The studio's interactive and immersive practice — combining hardware, software and physical space — earns a Design Milestone Award. Spaceiux recognises shopping-space design and FOAID adds a Bronze.",
    dimensions:
      "Design Milestone Award — Innovative Technology Integration | Spaceiux — Shopping Space | FOAID — Bronze",
    creditLine: "Video Embed: Technology integration — Design Milestone showcase",
    objectURL: "https://www.rubenius.in",
  },
  {
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "REDS Methodology — Interior Wellbeing in Practice",
    artistDisplayName: "Rubenius Interiors",
    artistDisplayBio: "Founded: 2005 • HQ: Bangalore • Discipline: Experience design",
    department: "Founded",
    objectDate: "2005",
    medium:
      "The studio begins with a single conviction: space is a business instrument, not decoration. The Interior Wellbeing™ philosophy takes root here and quietly sets the foundation for what becomes the REDS methodology.",
    dimensions: "General Milestone — Studio Origin | Interior Wellbeing™ Launch",
    creditLine: "Rubenius Experiential Design System (REDS)",
    objectURL: "https://www.rubenius.in",
  },
];

export default function VideoCardsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d0d1a 0%, #111827 50%, #0f172a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 24px",
        gap: "0",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "56px", maxWidth: "640px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "14px",
          }}
        >
          Rubenius Interiors · Timeline
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 16px",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Achievement Video Cards
        </h1>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.45)",
            margin: 0,
          }}
        >
          Click the thumbnail to load and play the embedded YouTube video inside
          the card — no page navigation.
        </p>
      </header>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 560px), 1fr))",
          gap: "28px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {VIDEO_CARDS.map((card, i) => (
          <YoutubeVideoCard key={i} {...card} />
        ))}
      </div>

      {/* Usage hint */}
      <footer
        style={{
          marginTop: "64px",
          textAlign: "center",
          padding: "24px 32px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          maxWidth: "580px",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: "rgba(255,255,255,0.6)" }}>Usage: </strong>
          Import{" "}
          <code
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "1px 6px",
              borderRadius: "4px",
              fontSize: "11px",
            }}
          >
            {"<YoutubeVideoCard embedUrl=\"...\" title=\"...\" />"}
          </code>{" "}
          from{" "}
          <code
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "1px 6px",
              borderRadius: "4px",
              fontSize: "11px",
            }}
          >
            app/components/YoutubeVideoCard
          </code>
          . All props except <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: "4px", fontSize: "11px" }}>embedUrl</code> and{" "}
          <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: "4px", fontSize: "11px" }}>title</code> are optional.
        </p>
      </footer>
    </main>
  );
}
