"use client";

import { LangProvider } from "@/context/LangContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { ReactNode, Suspense } from "react";
import LangSwitch from "@/components/LangSwitch";
import CookieBanner from "@/components/CookieBanner";
import ConsentScripts from "@/components/analytics/ConsentScripts";
import InternalTrafficDetector from "@/components/analytics/InternalTrafficDetector";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <CookieConsentProvider>
        <Suspense fallback={null}>
          <InternalTrafficDetector />
        </Suspense>
        <ConsentScripts />
        <LangSwitch />
        {children}
        <CookieBanner />
      </CookieConsentProvider>
    </LangProvider>
  );
}
