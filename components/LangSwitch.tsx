"use client";

import { useLang, Lang } from "@/context/LangContext";

export default function LangSwitch() {
  const { lang, setLang } = useLang();

  return (
    <div
      style={{
        position: "fixed",
        top: "1.1rem",
        right: "1.5rem",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        fontSize: "0.75rem",
      }}
    >
      {(["en", "fr"] as Lang[]).map((l, i) => (
        <span key={l} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {i > 0 && <span style={{ color: "#3a3a3a" }}>/</span>}
          <button
            onClick={() => setLang(l)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: lang === l ? "var(--accent)" : "rgba(245,240,235,0.35)",
              fontSize: "0.75rem",
              transition: "color 0.2s",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              if (lang !== l) (e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                lang === l ? "var(--accent)" : "rgba(245,240,235,0.35)";
            }}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
