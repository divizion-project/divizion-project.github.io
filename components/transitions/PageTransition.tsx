"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ORDERED_ROUTES = ["/", "/news", "/launcher", "/roadmap", "/docs"] as const;
type OrderedRoute = (typeof ORDERED_ROUTES)[number];

function normalizeRoute(pathname: string): string {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return normalized as OrderedRoute | string;
}

function getRouteIndex(route: string) {
  const normalized = route.replace(/\/$/, "") || "/";
  const index = ORDERED_ROUTES.indexOf(normalized as OrderedRoute);
  return index === -1 ? 0 : index;
}

export default function PageTransition({ children }: Props) {
  const pathname = usePathname() ?? "/";
  const route = useMemo(() => normalizeRoute(pathname), [pathname]);
  const currentIndex = useMemo(() => getRouteIndex(route), [route]);

  const previousIndex = useRef(currentIndex);

  const direction = useMemo(() => {
    const prev = previousIndex.current;
    if (currentIndex > prev) {
      return "forward";
    }
    if (currentIndex < prev) {
      return "backward";
    }
    return "neutral";
  }, [currentIndex]);

  useEffect(() => {
    previousIndex.current = currentIndex;
  }, [currentIndex]);

  return (
    <div
      key={pathname}
      className={clsx(
        "page-transition flex-1",
        direction === "forward" && "page-transition--forward",
        direction === "backward" && "page-transition--backward",
        direction === "neutral" && "page-transition--neutral"
      )}
    >
      {children}
    </div>
  );
}
