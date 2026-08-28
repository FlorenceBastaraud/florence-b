"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

// Visiter le site une fois avec ?internal=1 pose un cookie durable `internal_user`.
// GTM lit ce cookie (variable "internal_user cookie") et l'envoie à GA4 comme
// paramètre `traffic_type=internal`, ce qui permet de filtrer le trafic interne
// via le filtre de données "trafic interne" de GA4.
export default function InternalTrafficDetector() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (searchParams.get("internal") !== "1") return

    document.cookie =
      "internal_user=internal; max-age=2147483647; path=/; SameSite=Lax"

    const params = new URLSearchParams(searchParams.toString())
    params.delete("internal")
    const newUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname
    router.replace(newUrl, { scroll: false })
  }, [searchParams, router, pathname])

  return null
}
