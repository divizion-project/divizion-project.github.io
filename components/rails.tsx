"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useInView } from "motion/react";
import { railPaths, type RailVariant } from "@/lib/rail-geometry";

export function Rails({ variant = "hero" }: { variant?: RailVariant }) {
  const reference = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 1600, height: 720 });
  useEffect(() => {
    const svg = reference.current;
    if (!svg) return;
    const measure = () => {
      const rect = svg.getBoundingClientRect();
      const width = Math.round(rect.width * 100) / 100;
      const height = Math.round(rect.height * 100) / 100;
      if (width > 0 && height > 0)
        setSize((previous) =>
          previous.width === width && previous.height === height
            ? previous
            : { width, height },
        );
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  const visible = useInView(reference);
  const traced = useInView(reference, { once: true, amount: 0.08 });
  const gradientId = useId();
  const paths = railPaths(variant, size.width, size.height);
  return (
    <svg
      ref={reference}
      className={`rails rails-${variant}`}
      data-traced={traced}
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId}>
          <stop stopColor="currentColor" stopOpacity="0" />
          <stop offset=".2" stopColor="currentColor" />
          <stop offset=".8" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={d}>
          <path
            className="rail-line"
            d={d}
            pathLength={1}
            stroke={`url(#${gradientId})`}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
          <g className="rail-particles">
            {variant === "hero" &&
              [0, 1, 2].map((n) => (
                <rect
                  key={n}
                  className="rail-particle"
                  width="9"
                  height="9"
                  fill="#ff6b36"
                  style={{
                    offsetPath: `path('${d}')`,
                    animationDelay: `${i * -7 - n * 6}s`,
                    animationPlayState: visible ? "running" : "paused",
                  }}
                />
              ))}
            {variant === "preview" && (
              <circle
                className="rail-particle"
                r="6"
                fill="#ff6b36"
                style={{
                  offsetPath: `path('${d}')`,
                  animationDelay: `${i * -9}s`,
                  animationPlayState: visible ? "running" : "paused",
                }}
              />
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}
