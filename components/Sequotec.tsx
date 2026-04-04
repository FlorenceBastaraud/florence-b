"use client"

import { useLang } from "@/context/LangContext"
import { useGsapReveal } from "@/hooks/useGsapReveal"
import { useRef } from "react"

export default function Sequotec() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  useGsapReveal(sectionRef)

  return (
    <section
      id="agency"
      ref={sectionRef}
      className="section"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <div className="container">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          {/* Label */}
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] font-semibold">
              {t("agency-label")}
            </span>
            <div className="mt-6 w-px h-24 bg-[var(--border)] hidden md:block" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <h2 className="font-[family-name:var(--font-instrument)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] italic text-[var(--fg)]">
              {t("agency-title")}
            </h2>

            <p className="text-[var(--fg)]/60 text-base md:text-lg leading-relaxed max-w-xl">
              {t("agency-text")}
            </p>

            <div>
              <a
                href="https://sequotec.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.375rem",
                  background: "var(--accent)",
                  color: "#0a0a0a",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--accent-dim)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--accent)")
                }
              >
                {t("agency-cta")}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M7 1l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
