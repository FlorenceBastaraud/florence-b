"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useLang } from "@/context/LangContext";
import ProjectModal from "@/components/ProjectModal";

interface Project {
  name: string;
  type: string;
  description: string;
  thumbnail: string;
  github: string | null;
  link: string | null;
  demo: string | null;
  technologies: { string: string; tags: string[] };
}

interface ProjectsData {
  total: number;
  data: { en: Project[]; fr: Project[] };
}

const ITEMS_PER_PAGE = 6;

export default function ProjectsView() {
  const { lang, t } = useLang();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        gridRef.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.45"
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" }
    );
  }, [filtered, currentPage]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((r) => r.json())
      .then((data: ProjectsData) => {
        const projects = data.data[lang];
        setAllProjects(projects);
        setFiltered(projects);
        const types = Array.from(new Set(projects.map((p) => p.type))).sort();
        setFilters(types);
        setActiveFilter("all");
        setCurrentPage(1);
      });
  }, [lang]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const applyFilter = (type: string) => {
    setActiveFilter(type);
    setFiltered(type === "all" ? allProjects : allProjects.filter((p) => p.type === type));
    setCurrentPage(1);
  };

  const backLabel = lang === "fr" ? "Retour" : "Back";

  const filterBtn = (active: boolean): React.CSSProperties => ({
    padding: "0.5rem 0",
    marginRight: "1.75rem",
    background: "none",
    border: "none",
    borderBottom: `1px solid ${active ? "var(--accent)" : "transparent"}`,
    marginBottom: "-1px",
    color: active ? "rgba(245,240,235,0.95)" : "rgba(245,240,235,0.35)",
    fontSize: "0.75rem",
    fontWeight: active ? 500 : 400,
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "color 0.2s, border-color 0.2s",
    whiteSpace: "nowrap",
  });

  return (
    <div ref={pageRef} style={{ paddingTop: "5.5rem", paddingBottom: "5rem" }}>
      <div className="container">

        {/* Back + heading */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              color: "rgba(245,240,235,0.35)",
              textDecoration: "none",
              marginBottom: "2.5rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,235,0.35)")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {backLabel}
          </Link>

          <span style={{ display: "block", fontSize: "0.625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600, marginBottom: "0.75rem" }}>
            {t("projects")}
          </span>
          <h1 style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--fg)", lineHeight: 1.05, marginBottom: "2.5rem" }}>
            {t("projects-title")}
          </h1>

          {/* Filters */}
          <div style={{ borderBottom: "1px solid var(--border)", marginBottom: "3rem", display: "flex", overflowX: "auto" }}>
            <button onClick={() => applyFilter("all")} style={filterBtn(activeFilter === "all")}>
              {t("filter-all")}
            </button>
            {filters.map((type) => (
              <button key={type} onClick={() => applyFilter(type)} style={filterBtn(activeFilter === type)}>
                {t(`filter-${type}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            opacity: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {paginated.map((project) => (
            <article
              key={project.name}
              className="project-card"
              onClick={() => setSelected(project)}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "border-color 0.4s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(200,240,101,0.3)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            >
              {/* Thumbnail */}
              <div style={{ position: "relative", height: "11rem", overflow: "hidden", background: "#1a1a1a" }}>
                <Image
                  src={`/images/projects/${project.thumbnail}`}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover", opacity: 0.75, transition: "opacity 0.4s, transform 0.6s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.75"; e.currentTarget.style.transform = "scale(1)"; }}
                />
                <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "rgba(10,10,10,0.8)", backdropFilter: "blur(6px)", color: "rgba(245,240,235,0.65)", fontSize: "0.625rem", fontWeight: 500, padding: "0.25rem 0.625rem", borderRadius: "9999px", border: "1px solid var(--border)" }}>
                  {project.type}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem", flex: 1 }}>
                <h2 style={{ fontWeight: 600, color: "var(--fg)", fontSize: "0.9375rem", lineHeight: 1.3 }}>
                  {project.name}
                </h2>
                <p style={{ fontSize: "0.75rem", color: "rgba(245,240,235,0.45)", lineHeight: 1.6, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {project.description}
                </p>
                <p style={{ fontSize: "0.625rem", color: "rgba(245,240,235,0.22)", letterSpacing: "0.03em", marginTop: "0.25rem" }}>
                  {project.technologies.string}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "3rem" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "9999px", border: "1px solid var(--border)", background: "none",
                color: "rgba(245,240,235,0.35)", cursor: "pointer", transition: "color 0.2s, border-color 0.2s",
                opacity: currentPage === 1 ? 0.2 : 1, fontSize: "0.875rem",
              }}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "9999px", border: `1px solid ${page === currentPage ? "var(--accent)" : "var(--border)"}`,
                  background: page === currentPage ? "var(--accent)" : "none",
                  color: page === currentPage ? "var(--bg)" : "rgba(245,240,235,0.40)",
                  cursor: "pointer", fontSize: "0.75rem", fontWeight: page === currentPage ? 500 : 400,
                  transition: "background 0.2s, color 0.2s, border-color 0.2s",
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "9999px", border: "1px solid var(--border)", background: "none",
                color: "rgba(245,240,235,0.35)", cursor: "pointer", transition: "color 0.2s, border-color 0.2s",
                opacity: currentPage === totalPages ? 0.2 : 1, fontSize: "0.875rem",
              }}
            >
              →
            </button>
          </div>
        )}

      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
