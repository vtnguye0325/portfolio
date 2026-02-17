"use client";

const PROJECTS = [
  {
    id: "1",
    title: "Cinematic Brand Experience",
    description:
      "Scroll-driven narrative and WebGL transitions for a luxury fashion launch.",
    tag: "WebGL · GSAP",
  },
  {
    id: "2",
    title: "SaaS Dashboard Redesign",
    description:
      "Data visualization and real-time collaboration with a dark, premium UI.",
    tag: "React · D3",
  },
  {
    id: "3",
    title: "Award-Winning Agency Site",
    description:
      "Awwwards-recognized scrollytelling and micro-interactions across 12 pages.",
    tag: "Next.js · Lenis",
  },
  {
    id: "4",
    title: "Immersive Product Configurator",
    description:
      "3D product configurator with smooth scroll and gesture-driven controls.",
    tag: "Three.js · R3F",
  },
];

export function Projects() {
  return (
    <section className="relative min-h-screen bg-background px-6 py-24 md:px-12 lg:px-24">
      <h2 className="mb-16 text-center text-2xl font-light tracking-wide text-white/80 md:text-3xl">
        Selected work
      </h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.15)] md:p-10"
          >
            <span className="text-xs font-medium tracking-wider text-white/50">
              {project.tag}
            </span>
            <h3 className="mt-3 text-xl font-medium text-white md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
