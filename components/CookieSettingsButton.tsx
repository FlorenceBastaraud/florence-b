"use client"

import { useLang } from "@/context/LangContext"
import { useCookieConsent } from "@/context/CookieConsentContext"

export default function CookieSettingsButton() {
  const { lang } = useLang()
  const { openBanner } = useCookieConsent()

  return (
    <button
      onClick={openBanner}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "0.75rem",
        color: "rgba(245,240,235,0.2)",
        transition: "color 0.3s",
        padding: 0,
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.color =
          "rgba(245,240,235,0.5)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color =
          "rgba(245,240,235,0.2)")
      }
    >
      {lang === "fr" ? "Gestion des cookies" : "Cookie settings"}
    </button>
  )
}
