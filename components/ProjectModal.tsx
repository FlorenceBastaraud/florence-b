"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLang } from "@/context/LangContext";

interface Project {
  name: string;
  type: string;
  description: string;
  thumbnail: string;
  github: string | null;
  link: string | null;
  demo: string | null;
  technologies: { string: string; tags: string[] };
}

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang } = useLang();
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(panelRef.current, { opacity: 0, y: 50, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out", delay: 0.06 });
    });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    gsap.to(panelRef.current, { opacity: 0, y: 24, duration: 0.25, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, delay: 0.1, ease: "power2.in", onComplete: onClose });
  };

  const liveUrl = project.demo ?? project.link;
  const githubLabel = "GitHub";
  const liveLabel = project.demo ? "Demo" : "Live";

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) close(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(8px)",
        padding: "1.5rem",
        opacity: 0,
      }}
    >
      <div
        ref={panelRef}
        style={{
          position: "relative",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "1.5rem",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "90vh",
          overflowY: "auto",
          opacity: 0,
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          style={{
            position: "absolute", top: "1rem", right: "1rem", zIndex: 10,
            width: "2rem", height: "2rem", borderRadius: "50%",
            border: "1px solid var(--border)", background: "var(--card)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(245,240,235,0.5)",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,235,0.4)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.5)"; }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Image */}
        <div style={{ position: "relative", height: "16rem", overflow: "hidden", borderRadius: "1.5rem 1.5rem 0 0", background: "#1a1a1a", flexShrink: 0 }}>
          <Image
            src={`/images/projects/${project.thumbnail}`}
            alt={project.name}
            fill
            sizes="680px"
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--card) 0%, transparent 60%)" }} />
          <span style={{ position: "absolute", top: "1rem", left: "1rem", background: "rgba(10,10,10,0.8)", backdropFilter: "blur(6px)", color: "rgba(245,240,235,0.7)", fontSize: "0.625rem", fontWeight: 500, padding: "0.25rem 0.625rem", borderRadius: "9999px", border: "1px solid var(--border)" }}>
            {project.type}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "var(--fg)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            {project.name}
          </h2>

          <p style={{ fontSize: "0.9375rem", color: "rgba(245,240,235,0.6)", lineHeight: 1.75, marginBottom: "2rem" }}>
            {project.description}
          </p>

          {/* Stack */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,235,0.3)", marginBottom: "0.75rem" }}>
              Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.technologies.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid var(--border)", color: "rgba(245,240,235,0.5)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.github || liveUrl) && (
            <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.75rem", borderRadius: "9999px",
                    border: "1px solid var(--border)", fontSize: "0.875rem",
                    color: "rgba(245,240,235,0.6)", textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,235,0.3)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.6)"; }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  {githubLabel}
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.75rem", borderRadius: "9999px",
                    background: "var(--accent)", fontSize: "0.875rem",
                    color: "var(--bg)", fontWeight: 600, textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-dim)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent)")}
                  onClick={(e) => e.stopPropagation()}
                >
                  {liveLabel}
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
