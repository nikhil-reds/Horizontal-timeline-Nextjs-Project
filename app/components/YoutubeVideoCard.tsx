"use client";

import { useState } from "react";

export interface YoutubeVideoCardProps {
  /** YouTube embed URL e.g. "https://www.youtube.com/embed/6vWFokOO9K8" */
  embedUrl: string;
  title: string;
  artistDisplayName?: string;
  artistDisplayBio?: string;
  department?: string;
  objectDate?: string;
  medium?: string;
  /** Pipe-separated award strings e.g. "Award A | Award B" */
  dimensions?: string;
  creditLine?: string;
  objectURL?: string;
  /** Override the auto-fetched YouTube thumbnail */
  thumbnailUrl?: string;
}

function getYouTubeId(embedUrl: string): string | null {
  const embedMatch = embedUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  const watchMatch = embedUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  return null;
}

export default function YoutubeVideoCard({
  embedUrl,
  title,
  artistDisplayName,
  artistDisplayBio,
  department,
  objectDate,
  medium,
  dimensions,
  creditLine,
  objectURL,
  thumbnailUrl,
}: YoutubeVideoCardProps) {
  const [playing, setPlaying] = useState(false);

  const videoId = getYouTubeId(embedUrl);
  const autoPlayUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`
    : embedUrl;

  const resolvedThumbnail =
    thumbnailUrl ||
    (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null);

  return (
    <article style={cardStyle}>
      {/* ── Video area ─────────────────────────────────────────── */}
      <div style={videoWrapperStyle}>
        {playing ? (
          <iframe
            style={iframeStyle}
            src={autoPlayUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            style={thumbnailBtnStyle}
            onClick={() => setPlaying(true)}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
              if (img) { img.style.transform = "scale(1.04)"; img.style.filter = "brightness(0.8)"; }
              const bg = e.currentTarget.querySelector(".yt-play-bg") as SVGPathElement | null;
              if (bg) bg.style.fill = "#ff0000";
              const btn = e.currentTarget.querySelector(".yt-play-wrap") as HTMLElement | null;
              if (btn) btn.style.transform = "scale(1.12)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
              if (img) { img.style.transform = "scale(1)"; img.style.filter = "brightness(1)"; }
              const bg = e.currentTarget.querySelector(".yt-play-bg") as SVGPathElement | null;
              if (bg) bg.style.fill = "rgba(0,0,0,0.72)";
              const btn = e.currentTarget.querySelector(".yt-play-wrap") as HTMLElement | null;
              if (btn) btn.style.transform = "scale(1)";
            }}
            aria-label={`Play video: ${title}`}
          >
            {resolvedThumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resolvedThumbnail}
                alt={`Thumbnail for ${title}`}
                style={thumbnailImgStyle}
              />
            )}
            <div style={overlayStyle} />
            {/* YouTube play button */}
            <span className="yt-play-wrap" style={playWrapStyle} aria-hidden="true">
              <svg viewBox="0 0 68 48" width="72" height="52">
                <path
                  className="yt-play-bg"
                  style={{ fill: "rgba(0,0,0,0.72)", transition: "fill 0.2s ease" }}
                  d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                />
                <path style={{ fill: "#fff" }} d="M 45,24 27,14 27,34" />
              </svg>
            </span>
            {objectDate && (
              <span style={yearBadgeStyle}>{objectDate}</span>
            )}
          </button>
        )}
      </div>

      {/* ── Card body ──────────────────────────────────────────── */}
      <div style={bodyStyle}>
        {department && (
          <span style={deptPillStyle}>{department}</span>
        )}
        <h2 style={titleStyle}>{title}</h2>
        {artistDisplayName && (
          <p style={artistStyle}>{artistDisplayName}</p>
        )}
        {artistDisplayBio && (
          <p style={bioStyle}>{artistDisplayBio}</p>
        )}
        {medium && (
          <p style={mediumStyle}>{medium}</p>
        )}
        {dimensions && (
          <div style={awardsRowStyle}>
            {dimensions.split("|").map((award, i) => (
              <span key={i} style={awardTagStyle}>
                🏆 {award.trim()}
              </span>
            ))}
          </div>
        )}
        <div style={footerStyle}>
          {creditLine && (
            <p style={creditStyle}>{creditLine}</p>
          )}
          {objectURL && (
            <a
              href={objectURL}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              Visit Studio ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────── */
const cardStyle: React.CSSProperties = {
  position: "relative",
  background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset",
  fontFamily: "system-ui, -apple-system, sans-serif",
  color: "#fff",
  maxWidth: "600px",
  width: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const videoWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  background: "#000",
  overflow: "hidden",
};

const iframeStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  border: "none",
};

const thumbnailBtnStyle: React.CSSProperties = {
  position: "relative",
  display: "block",
  width: "100%",
  height: "100%",
  border: "none",
  padding: 0,
  cursor: "pointer",
  background: "#000",
  overflow: "hidden",
};

const thumbnailImgStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.4s ease, filter 0.4s ease",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.5) 100%)",
};

const playWrapStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  transition: "transform 0.2s ease",
};

const yearBadgeStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 10,
  right: 12,
  background: "rgba(0,0,0,0.72)",
  color: "rgba(255,255,255,0.9)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  padding: "2px 8px",
  borderRadius: "4px",
  backdropFilter: "blur(4px)",
  pointerEvents: "none",
};

const bodyStyle: React.CSSProperties = {
  padding: "20px 22px 18px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const deptPillStyle: React.CSSProperties = {
  display: "inline-block",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.55)",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "3px 10px",
  borderRadius: "100px",
  width: "fit-content",
};

const titleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 1.3,
  color: "#fff",
  margin: 0,
  letterSpacing: "-0.01em",
};

const artistStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.75)",
  margin: 0,
};

const bioStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "rgba(255,255,255,0.38)",
  margin: 0,
  letterSpacing: "0.02em",
};

const mediumStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.65,
  color: "rgba(255,255,255,0.62)",
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
} as React.CSSProperties;

const awardsRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
};

const awardTagStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 600,
  color: "rgba(255,215,100,0.85)",
  background: "rgba(255,215,100,0.07)",
  border: "1px solid rgba(255,215,100,0.2)",
  padding: "3px 10px",
  borderRadius: "100px",
  letterSpacing: "0.03em",
};

const footerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  paddingTop: "10px",
  borderTop: "1px solid rgba(255,255,255,0.06)",
  marginTop: "2px",
};

const creditStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "rgba(255,255,255,0.28)",
  margin: 0,
  fontStyle: "italic",
};

const linkStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  color: "rgba(255,255,255,0.5)",
  textDecoration: "none",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
};
