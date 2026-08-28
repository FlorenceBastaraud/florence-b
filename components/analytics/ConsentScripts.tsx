"use client"

import Script from "next/script"
import { useCookieConsent } from "@/context/CookieConsentContext"

// L'ID du conteneur GTM n'est pas secret (il est exposé dans la page).
// Priorité :
//   1. NEXT_PUBLIC_GTM_ID s'il est défini (ex. .env.local en dev pour tester
//      via Tag Assistant, ou une config Vercel explicite).
//   2. sinon, un fallback en dur, mais UNIQUEMENT sur le domaine de production —
//      pour que les déploiements Preview Vercel (*.vercel.app) et localhost
//      n'envoient rien à GA4 sans configuration dédiée.
const GTM_ID_ENV = process.env.NEXT_PUBLIC_GTM_ID
const GTM_ID_PROD_FALLBACK = "GTM-55R6W7KK"
const PROD_HOSTS = ["florence-b.com", "www.florence-b.com"]

function resolveGtmId(): string | undefined {
  if (GTM_ID_ENV) return GTM_ID_ENV
  if (typeof window !== "undefined" && PROD_HOSTS.includes(window.location.hostname)) {
    return GTM_ID_PROD_FALLBACK
  }
  return undefined
}

export default function ConsentScripts() {
  const { consent } = useCookieConsent()

  if (consent !== "granted") return null

  const gtmId = resolveGtmId()
  if (!gtmId) return null

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          title="Google Tag Manager"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}
