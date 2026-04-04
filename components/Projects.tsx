"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { useGsapReveal } from "@/hooks/useGsapReveal";

interface Project {
  name: string;
  type: string;
  description: string;
  thumbnail: string;
  github: string | null;
  link: string | null;
  demo: string | null;
  technologies: {
    string: string;
    tags: string[];
  };
}

interface ProjectsData {
  total: number;
  data: {
    en: Project[];
    fr: Project[];
  };
}

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const { lang, t } = useLang();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

  const applyFilter = (type: string) => {
    setActiveFilter(type);
    setFiltered(type === "all" ? allProjects : allProjects.filter((p) => p.type === type));
    setCurrentPage(1);
  };

  const allLabel = lang === "fr" ? "tout" : "all";

  return (
    <section id="projects" ref={sectionRef} className="section reveal">
      <div className="max-w-6xl mx-auto px-8 md:px-12">

        <div className="mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] font-semibold">
            04 / {t("projects")}
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,3rem)] italic text-[var(--fg)]">
            {t("projects-title")}
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => applyFilter("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
              activeFilter === "all"
                ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
                : "bg-transparent text-[var(--fg)]/50 border-[var(--border)] hover:border-[var(--fg)]/30 hover:text-[var(--fg)]"
            }`}
          >
            {allLabel}
          </button>
          {filters.map((type) => (
            <button
              key={type}
              onClick={() => applyFilter(type)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                activeFilter === type
                  ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
                  : "bg-transparent text-[var(--fg)]/50 border-[var(--border)] hover:border-[var(--fg)]/30 hover:text-[var(--fg)]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginated.map((project) => (
            <article
              key={project.name}
              className="group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-500 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={`/images/projects/${project.thumbnail}`}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                {/* Type badge */}
                <span className="absolute top-3 left-3 bg-[var(--bg)]/80 backdrop-blur-sm text-[var(--fg)]/70 text-[10px] font-medium px-2.5 py-1 rounded-full border border-[var(--border)]">
                  {project.type}
                </span>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[var(--bg)]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[var(--fg)] text-[var(--bg)] text-xs font-semibold px-4 py-2 rounded-full hover:bg-[var(--accent)] transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </a>
                  )}
                  {(project.demo || project.link) && (
                    <a
                      href={(project.demo ?? project.link)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[var(--accent)] text-[var(--bg)] text-xs font-semibold px-4 py-2 rounded-full hover:bg-[var(--accent-dim)] transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.demo ? "Demo" : "Live"}
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="font-semibold text-[var(--fg)] text-base leading-tight">
                  {project.name}
                </h3>
                <p className="text-xs text-[var(--fg)]/50 leading-relaxed flex-1">
                  {project.description}
                </p>
                <p className="text-[10px] text-[var(--fg)]/30 tracking-wide">
                  {project.technologies.string}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg)]/40 hover:text-[var(--fg)] hover:border-[var(--fg)]/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-sm"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium border transition-all duration-200 ${
                  page === currentPage
                    ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
                    : "bg-transparent text-[var(--fg)]/40 border-[var(--border)] hover:border-[var(--fg)]/30 hover:text-[var(--fg)]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg)]/40 hover:text-[var(--fg)] hover:border-[var(--fg)]/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-sm"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
