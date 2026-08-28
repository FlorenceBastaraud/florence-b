"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export const CONSENT_STORAGE_KEY = "fb_cookie_consent"

// Le site ne pose qu'une seule catégorie de cookies non essentiels : la mesure
// d'audience (Google Tag Manager -> GA4). On garde donc un consentement binaire.
export type ConsentValue = "granted" | "denied" | null

// Lit la valeur stockée en tolérant d'anciens formats éventuels (objet
// { analytics: boolean }) pour ne pas re-demander le consentement.
export function parseStoredConsent(raw: string | null): ConsentValue {
  if (raw === "granted" || raw === "denied") return raw
  try {
    const parsed = JSON.parse(raw ?? "")
    if (typeof parsed?.analytics === "boolean") {
      return parsed.analytics ? "granted" : "denied"
    }
  } catch {
    /* ignore */
  }
  return null
}

// Cookies posés par GA4 / GTM sur ce domaine (premier niveau, donc lisibles en
// JS ici). Les retirer quand le consentement est révoqué, pas seulement empêcher
// d'en reposer.
const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gat"]

export function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => ANALYTICS_COOKIE_PREFIXES.some((p) => name.startsWith(p)))

  const host = window.location.hostname
  const domains = [
    undefined,
    host,
    `.${host}`,
    host.replace(/^www\./, ""),
    `.${host.replace(/^www\./, "")}`,
  ]
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;${
        domain ? ` domain=${domain};` : ""
      }`
    }
  }
}

interface CookieConsentContextValue {
  consent: ConsentValue
  openBanner: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue>({
  consent: null,
  openBanner: () => {},
})

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(parseStoredConsent(localStorage.getItem(CONSENT_STORAGE_KEY)))

    const handleChange = (e: Event) => {
      setConsent((e as CustomEvent<ConsentValue>).detail)
    }
    window.addEventListener("fb:consent-changed", handleChange)
    return () => window.removeEventListener("fb:consent-changed", handleChange)
  }, [])

  const openBanner = () => {
    window.dispatchEvent(new Event("open-cookie-settings"))
  }

  return (
    <CookieConsentContext.Provider value={{ consent, openBanner }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  return useContext(CookieConsentContext)
}
