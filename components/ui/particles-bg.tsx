"use client";

import { useEffect, useCallback, useState } from "react";

export default function ParticlesComponent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initParticles = useCallback((isDark: boolean) => {
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    // @ts-ignore
    if (window.pJSDom?.length > 0) {
      // @ts-ignore
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      // @ts-ignore
      window.pJSDom = [];
    }

    const colors = isDark
      ? {
          particles: "#00f5ff",
          lines: "#00d9ff",
          accent: "#0096c7",
        }
      : {
          particles: "#0277bd",
          lines: "#0288d1",
          accent: "#039be5",
        };

    const particleCount = isMobile ? 40 : 120;
    const lineDistance = isMobile ? 120 : 160;
    const moveSpeed = isMobile ? 1.5 : 2;

    // @ts-ignore
    window.particlesJS("particles-js", {
      particles: {
        number: { value: particleCount, density: { enable: true, value_area: 800 } },
        color: { value: colors.particles },
        shape: { type: "circle", stroke: { width: 0.5, color: colors.accent } },
        opacity: {
          value: 0.6,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.2 },
        },
        size: {
          value: isMobile ? 2 : 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: lineDistance,
          color: colors.lines,
          opacity: isMobile ? 0.25 : 0.35,
          width: 1,
        },
        move: { enable: true, speed: moveSpeed, random: true, out_mode: "bounce" },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: !isMobile, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: lineDistance * 1.2, line_linked: { opacity: 0.6 } },
          push: { particles_nb: isMobile ? 2 : 4 },
          repulse: { distance: lineDistance * 0.8, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }, [isMobile]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const html = document.documentElement;
      const detectDark = () =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark";

      initParticles(detectDark());

      const observer = new MutationObserver(() => initParticles(detectDark()));
      observer.observe(html, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });

      return () => observer.disconnect();
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [initParticles]);

  return (
    <div
      id="particles-js"
      className={`
        w-full h-screen absolute top-0 left-0 -z-10
        transition-colors duration-500
        bg-gradient-to-tr from-[#e3f2fd] via-[#90caf9] to-[#64b5f6]
        dark:from-[#000814] dark:via-[#003566] dark:to-[#0077b6]
      `}
    />
  );
}