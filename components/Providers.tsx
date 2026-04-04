"use client";

import { LangProvider } from "@/context/LangContext";
import { ReactNode } from "react";
import LangSwitch from "@/components/LangSwitch";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <LangSwitch />
      {children}
    </LangProvider>
  );
}
