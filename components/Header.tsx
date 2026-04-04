"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import TypedGreeting from "@/components/TypedGreeting";

const navItems = [
  { key: "about", href: "/#about", sectionId: "about" },
  { key: "skills", href: "/#skills", sectionId: "skills" },
  { key: "career", href: "/#career", sectionId: "career" },
  { key: "projects", href: "/projects", sectionId: null },
];

export default function Header() {
  const { lang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    navItems
      .filter((item) => item.sectionId)
      .forEach(({ sectionId }) => {
        const el = document.getElementById(sectionId!);
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(sectionId!);
          },
          { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );
        obs.observe(el);
        observers.push(obs);
      });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.href === "/projects") return pathname === "/projects";
    if (pathname !== "/") return false;
    return activeSection === item.sectionId;
  };

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 50,
    transition: "padding 0.4s ease, background 0.4s ease",
    padding: scrolled ? "0.75rem 0" : "1.5rem 0",
    background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid #2a2a2a" : "none",
  };

  return (
    <header style={headerStyle}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Typed greeting */}
        <a href="/" style={{ textDecoration: "none" }}>
          <TypedGreeting />
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden-mobile">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <a
                key={item.key}
                href={item.href}
                className="nav-link"
                style={{
                  fontSize: "0.875rem",
                  color: active ? "rgba(245,240,235,1)" : "rgba(245,240,235,0.55)",
                  transition: "color 0.3s",
                  position: "relative",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,235,1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "rgba(245,240,235,1)" : "rgba(245,240,235,0.55)")}
              >
                {t(item.key)}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "var(--accent)",
                      borderRadius: "1px",
                    }}
                  />
                )}
              </a>
            );
          })}

        </nav>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          style={{ display: "none", flexDirection: "column", gap: "5px", padding: "4px", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", height: "1px", width: "24px", background: "var(--fg)", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
          <span style={{ display: "block", height: "1px", width: "24px", background: "var(--fg)", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", height: "1px", width: "24px", background: "var(--fg)", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #2a2a2a", padding: "1.5rem 0" }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: "1rem",
                    color: active ? "rgba(245,240,235,1)" : "rgba(245,240,235,0.65)",
                    textDecoration: "none",
                    borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                    paddingLeft: "0.75rem",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  {t(item.key)}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
