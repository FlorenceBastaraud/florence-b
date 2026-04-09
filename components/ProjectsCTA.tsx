"use client"

import { useLang } from "@/context/LangContext"
import { useGsapReveal } from "@/hooks/useGsapReveal"
import Link from "next/link"
import { useRef } from "react"

export default function ProjectsCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()
  useGsapReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden"
      style={{ minHeight: "100vh", justifyContent: "center" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, var(--accent)12 0%, transparent 70%)",
        }}
      />

      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border)" }}
        aria-hidden
      />

      <div className="container relative flex flex-col items-center text-center gap-10">
        <h2 className="font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,3rem)] italic text-[var(--fg)] leading-tight">
          {t("cta-projects-title")}
        </h2>

        <p className="text-[var(--fg)]/60 text-base md:text-lg leading-relaxed max-w-xl">
          {t("cta-projects-sub")}
          <Link
            href="/projets"
            style={{
              color: "rgba(245,240,235,0.35)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245,240,235,0.35)")
            }
          >
            {t("cta-projects-link")}
          </Link>
        </p>
      </div>
    </section>
  )
}
