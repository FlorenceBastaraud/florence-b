"use client"

import { useLang } from "@/context/LangContext"
import { useGsapReveal } from "@/hooks/useGsapReveal"
import { useEffect, useRef, useState } from "react"

interface SkillsData {
  front: string[]
  back: string[]
  more: string[]
}

const categoryColors: Record<string, string> = {
  front: "var(--accent)",
  back: "#7dd3fc",
  more: "#c4b5fd",
}

export default function Skills() {
  const { lang, t } = useLang()
  const [skills, setSkills] = useState<SkillsData | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  useGsapReveal(sectionRef)

  useEffect(() => {
    fetch("/data/skills.json")
      .then((r) => r.json())
      .then((data) => setSkills(data[lang]))
  }, [lang])

  if (!skills)
    return (
      <section
        id="skills"
        ref={sectionRef}
        className="section"
        style={{ minHeight: "100vh" }}
      />
    )

  const categories = [
    { key: "front", label: "Front-end", items: skills.front },
    { key: "back", label: "Back-end", items: skills.back },
    { key: "more", label: t("skills-more"), items: skills.more },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] font-semibold">
            03 / {t("skills")}
          </span>
          <h2
            className="font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,3rem)] italic text-[var(--fg)]"
            style={{ marginTop: "0.75rem" }}
          >
            {t("skills-title")}
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ key, label, items }) => (
            <div
              key={key}
              className="group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-500"
              style={{ padding: "2rem" }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${categoryColors[key]}18 0%, transparent 70%)`,
                }}
                aria-hidden
              />

              <div className="relative">
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: ".8rem" }}
                >
                  <h3
                    className="text-sm font-semibold tracking-widest uppercase"
                    style={{ color: categoryColors[key] }}
                  >
                    {label}
                  </h3>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: categoryColors[key] }}
                  />
                </div>

                <ul className="space-y-2.5">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-[var(--fg)]/60 group-hover:text-[var(--fg)]/80 transition-colors duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--muted)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
