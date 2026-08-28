"use client"

import {
  CONSENT_STORAGE_KEY,
  clearAnalyticsCookies,
  parseStoredConsent,
  type ConsentValue,
} from "@/context/CookieConsentContext"
import { useLang } from "@/context/LangContext"
import { gsap } from "gsap"
import { useEffect, useRef, useState } from "react"

const COPY = {
  fr: {
    title: "Cookies de mesure d'audience",
    body: "Ce site utilise des cookies analytiques de mesure d'audience (Google Analytics) pour comprendre comment il est consulté.",
    accept: "Accepter",
    decline: "Refuser",
    aria: "Gestion des cookies",
  },
  en: {
    title: "Analytics cookies",
    body: "This site uses analytics cookies (Google Analytics) to measure traffic and understand how it is used.",
    accept: "Accept",
    decline: "Decline",
    aria: "Cookie settings",
  },
} as const

export default function CookieBanner() {
  const { lang } = useLang()
  const t = COPY[lang]

  const [visible, setVisible] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!localStorage.getItem(CONSENT_STORAGE_KEY)) setVisible(true)

    const handler = () => {
      setIsModal(true)
      setVisible(true)
    }
    window.addEventListener("open-cookie-settings", handler)
    return () => window.removeEventListener("open-cookie-settings", handler)
  }, [])

  useEffect(() => {
    if (!visible) return
    const ctx = gsap.context(() => {
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
        )
      }
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: isModal ? 30 : 24, scale: isModal ? 0.98 : 1 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
      )
    })
    return () => ctx.revert()
  }, [visible, isModal])

  useEffect(() => {
    if (!isModal || !visible) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [isModal, visible])

  const choose = (next: Exclude<ConsentValue, null>) => {
    const previous = parseStoredConsent(
      localStorage.getItem(CONSENT_STORAGE_KEY),
    )
    localStorage.setItem(CONSENT_STORAGE_KEY, next)
    window.dispatchEvent(
      new CustomEvent("fb:consent-changed", { detail: next }),
    )
    setVisible(false)
    setIsModal(false)

    // Révoquer le consentement doit aussi supprimer les cookies déjà posés.
    if (previous === "granted" && next === "denied") {
      clearAnalyticsCookies()
      // GTM déjà injecté ne peut pas être proprement retiré du DOM : on recharge.
      window.location.reload()
    }
  }

  // Fermer sans enregistrer de choix (clic hors modale) : le bandeau réapparaît
  // tant qu'aucun choix n'a été fait.
  const dismiss = () => {
    setVisible(false)
    setIsModal(false)
  }

  if (!visible) return null

  const panel = (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={t.aria}
      aria-modal={isModal ? true : undefined}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: isModal ? "26rem" : "34rem",
        padding: "1.5rem",
        boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
        opacity: 0,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-instrument)",
          fontStyle: "italic",
          fontSize: "1.25rem",
          color: "var(--fg)",
          lineHeight: 1.2,
          marginBottom: "0.625rem",
        }}
      >
        {t.title}
      </p>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "rgba(245,240,235,0.55)",
          lineHeight: 1.65,
          marginBottom: "1.25rem",
        }}
      >
        {t.body}
      </p>
      <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
        <button
          onClick={() => choose("granted")}
          style={{
            flex: "1 1 8rem",
            padding: "0.625rem 1rem",
            borderRadius: "9999px",
            border: "none",
            background: "var(--accent)",
            color: "var(--bg)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background =
              "var(--accent-dim)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background =
              "var(--accent)")
          }
        >
          {t.accept}
        </button>
        <button
          onClick={() => choose("denied")}
          style={{
            flex: "1 1 8rem",
            padding: "0.625rem 1rem",
            borderRadius: "9999px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "rgba(245,240,235,0.6)",
            fontSize: "0.8125rem",
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderColor =
              "rgba(245,240,235,0.35)"
            ;(e.currentTarget as HTMLElement).style.color = "var(--fg)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderColor =
              "var(--border)"
            ;(e.currentTarget as HTMLElement).style.color =
              "rgba(245,240,235,0.6)"
          }}
        >
          {t.decline}
        </button>
      </div>
    </div>
  )

  if (isModal) {
    return (
      <div
        ref={backdropRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) dismiss()
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(6px)",
          opacity: 0,
        }}
      >
        {panel}
      </div>
    )
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        right: "1.5rem",
        zIndex: 9000,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div style={{ pointerEvents: "auto", width: "100%", maxWidth: "34rem" }}>
        {panel}
      </div>
    </div>
  )
}
