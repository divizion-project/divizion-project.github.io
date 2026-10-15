"use client";
import { createContext, useContext, useEffect, useState } from "react";
import cached from "@/public/data/releases.json";
import { fetchReleases, type Release } from "@/lib/releases";
const fallback = cached.releases as Release[];
const Context = createContext({
  releases: fallback,
  state: "cached" as "cached" | "live" | "offline",
});
export function ReleaseProvider({ children }: { children: React.ReactNode }) {
  const [releases, setReleases] = useState(fallback);
  const [state, setState] = useState<"cached" | "live" | "offline">("cached");
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetchReleases(controller.signal)
      .then((data) => {
        if (data.length) {
          setReleases(data);
          setState("live");
        }
      })
      .catch(() => setState("offline"))
      .finally(() => clearTimeout(timeout));
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Context.Provider value={{ releases, state }}>{children}</Context.Provider>
  );
}
export const useReleases = () => useContext(Context);
