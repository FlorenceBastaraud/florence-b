"use client"

import Script from "next/script"
import { useCookieConsent } from "@/context/CookieConsentContext"

// L'ID du conteneur GTM n'est pas secret (il est exposé dans la page). On garde
// une valeur par défaut pour que la prod fonctionne sans configuration, tout en
// laissant la possibilité de la surcharger via l'environnement.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-55R6W7KK"

export default function ConsentScripts() {
  const { consent } = useCookieConsent()

  if (consent !== "granted" || !GTM_ID) return null

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
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          title="Google Tag Manager"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}
