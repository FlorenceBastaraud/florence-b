"use client"

import { useLang } from "@/context/LangContext"
import { useGsapReveal } from "@/hooks/useGsapReveal"
import { useRef } from "react"

export default function Career({ className = "" }: { className?: string }) {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  useGsapReveal(sectionRef)

  const openCV = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open("/images/CV-Florence-Bastaraud-Developpeuse-Web.pdf")
  }

  return (
    <section id="career" ref={sectionRef} className={`section ${className}`}>
      <div className="container">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] font-semibold">
          04 / {t("career")}
        </span>
        <h2
          className="font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,3rem)] italic text-[var(--fg)] leading-tight"
          style={{ marginTop: "0.75rem", marginBottom: "2.5rem" }}
        >
          {t("career-title")}
        </h2>
        <a
          href="/images/CV-Florence-Bastaraud-Developpeuse-Web.pdf"
          onClick={openCV}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.625rem",
            border: "1px solid var(--border)",
            color: "var(--fg)",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 500,
            textDecoration: "none",
            transition: "border-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)"
            e.currentTarget.style.color = "var(--accent)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)"
            e.currentTarget.style.color = "var(--fg)"
          }}
        >
          {t("career-cta")}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1v9M3 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
