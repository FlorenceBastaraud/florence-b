"use client";

import { useRef } from "react";
import { useLang } from "@/context/LangContext";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function Career() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const openCV = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open("/images/CV-Florence-Bastaraud-Developpeuse-Web.pdf");
  };

  return (
    <section id="career" ref={sectionRef} className="section" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="container">

        <div className="relative bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden">

          {/* Background accent */}
          <div
            className="absolute top-0 right-0 w-80 h-80 blur-[120px] opacity-10 pointer-events-none"
            style={{ background: "var(--accent)" }}
            aria-hidden
          />

          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-8" style={{ padding: "3rem" }}>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] font-semibold" style={{ display: "block", marginBottom: "0.75rem" }}>
                03 / {t("career")}
              </span>
              <h2 className="font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,3rem)] italic text-[var(--fg)] max-w-md leading-tight" style={{ marginTop: "0.75rem" }}>
                {t("career-title")}
              </h2>
            </div>

            <a
              href="/images/CV-Florence-Bastaraud-Developpeuse-Web.pdf"
              onClick={openCV}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                background: "var(--accent)",
                color: "#0a0a0a",
                fontWeight: 600,
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                textDecoration: "none",
                flexShrink: 0,
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
            >
              {t("career-cta")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9M3 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
