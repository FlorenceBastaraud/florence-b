"use client";

import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(ref: RefObject<HTMLElement | null>, delay = 0.1) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const container = el.querySelector(".container");
    const targets = container
      ? Array.from(container.children)
      : [el];

    gsap.set(targets, { opacity: 0, y: 48 });

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: el,
          start: "top 68%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [ref, delay]);
}
