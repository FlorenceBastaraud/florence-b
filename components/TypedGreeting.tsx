"use client"

import { useLang } from "@/context/LangContext"
import { useEffect, useRef, useState } from "react"

function getGreeting(lang: string): string {
  const hour = new Date().getHours()
  const isEvening = hour >= 18 || hour < 6
  if (lang === "fr") return isEvening ? "Bonsoir" : "Bonjour"
  return isEvening ? "Good evening" : "Hello"
}

export default function TypedGreeting() {
  const { lang } = useLang()
  const [displayed, setDisplayed] = useState("")
  const [cursorOn, setCursorOn] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelledRef = useRef(false)
  const isFirstMount = useRef(true)

  useEffect(() => {
    cancelledRef.current = false
    setDisplayed("")
    const greeting = getGreeting(lang)

    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timerRef.current = setTimeout(() => {
          if (!cancelledRef.current) res()
        }, ms)
      })

    const run = async () => {
      // Delay only on first page load, not on lang switch
      if (isFirstMount.current) {
        isFirstMount.current = false
        await sleep(2800)
      }
      while (!cancelledRef.current) {
        // Type
        for (let i = 0; i <= greeting.length; i++) {
          if (cancelledRef.current) return
          setDisplayed(greeting.slice(0, i))
          await sleep(65 + Math.random() * 55)
        }
        // Pause 5s
        await sleep(5000)
        // Delete
        for (let i = greeting.length; i >= 0; i--) {
          if (cancelledRef.current) return
          setDisplayed(greeting.slice(0, i))
          await sleep(38)
        }
        // Short pause before next cycle
        await sleep(700)
      }
    }

    run()

    return () => {
      cancelledRef.current = true
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [lang])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorOn((v) => !v), 520)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      style={{
        fontFamily: "var(--font-instrument)",
        fontStyle: "italic",
        fontSize: "1.05rem",
        color: "var(--fg)",
        letterSpacing: "-0.01em",
      }}
    >
      {displayed}
      <span
        style={{
          color: "var(--accent)",
          opacity: cursorOn ? 1 : 0,
          transition: "opacity 0.1s",
          marginLeft: "1px",
          fontStyle: "normal",
        }}
      >
        |
      </span>
    </span>
  )
}
