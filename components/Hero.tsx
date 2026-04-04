"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/context/LangContext";
import { gsap } from "gsap";

export default function Hero() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        firstNameRef.current,
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          lastNameRef.current,
          { y: 100, opacity: 0, skewY: 5 },
          { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "5rem", paddingBottom: "4rem" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      {/* Accent blob */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[160px] opacity-[0.07]"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />

      <div className="container relative">
        {/* Name block - full width typographic */}
        <div className="overflow-hidden mb-2">
          <span
            ref={firstNameRef}
            className="block font-[family-name:var(--font-instrument)] text-[clamp(5rem,14vw,11rem)] leading-[0.88] italic text-[var(--accent)]"
            style={{ opacity: 0 }}
          >
            Florence
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            ref={lastNameRef}
            className="block font-[family-name:var(--font-instrument)] text-[clamp(5rem,14vw,11rem)] leading-[0.88] uppercase tracking-tight text-[var(--fg)]"
            style={{ opacity: 0 }}
          >
            Bastaraud
          </span>
        </div>

        {/* Subtitle row */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p
            ref={titleRef}
            className="text-sm md:text-base text-[var(--fg)]/45 font-[family-name:var(--font-space)] tracking-[0.2em] uppercase"
            style={{ opacity: 0 }}
          >
            {t("hero-work-title")}
          </p>

          <div ref={ctaRef} style={{ opacity: 0, display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a
              href="/projects"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.375rem", border: "1px solid rgba(245,240,235,0.2)", borderRadius: "9999px", fontSize: "0.875rem", color: "var(--fg)", textDecoration: "none", transition: "border-color 0.3s, color 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,240,235,0.2)"; e.currentTarget.style.color = "var(--fg)"; }}
            >
              {t("projects")}
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="/#about"
              style={{ fontSize: "0.875rem", color: "rgba(245,240,235,0.35)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,235,0.35)")}
            >
              {t("about")}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--fg)]/25">
        <span className="text-[10px] tracking-[0.2em] uppercase">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--fg)]/25 to-transparent" />
      </div>
    </section>
  );
}
