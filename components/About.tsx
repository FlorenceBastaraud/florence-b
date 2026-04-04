"use client"

import { useLang } from "@/context/LangContext"
import { useGsapReveal } from "@/hooks/useGsapReveal"
import { useRef } from "react"

export default function About() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  useGsapReveal(sectionRef)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <div className="container">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          {/* Label */}
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] font-semibold">
              01 / {t("about")}
            </span>
            <div className="mt-6 w-px h-24 bg-[var(--border)] hidden md:block" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <h2 className="font-[family-name:var(--font-instrument)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] italic text-[var(--fg)]">
              {t("about-title")}
            </h2>

            <p className="text-[var(--fg)]/60 text-base md:text-lg leading-relaxed max-w-xl">
              {t("about-text")}
            </p>

            {/* Socials row */}
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/florenceBastaraud"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-[var(--fg)]/40 hover:text-[var(--fg)] transition-colors duration-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <span style={{ color: "var(--border)" }}>·</span>
              <a
                href="https://www.linkedin.com/in/florence-bastaraud/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--fg)]/40 hover:text-[var(--fg)] transition-colors duration-300"
              >
                LinkedIn
              </a>
              <span style={{ color: "var(--border)" }}>·</span>
              <a
                href="mailto:contact@florence-b.com"
                className="text-sm text-[var(--fg)]/40 hover:text-[var(--fg)] transition-colors duration-300"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
