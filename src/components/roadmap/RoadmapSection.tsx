"use client";

import { useSyncExternalStore } from "react";
import { RoadmapCanvas } from "./RoadmapCanvas";
import { MobileRoadmap } from "./MobileRoadmap";

const MOBILE_BREAKPOINT = 768; // px

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export function RoadmapSection() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (!mounted) {
    return (
      <div id="roadmap-section" className="w-full h-[400px] bg-background" />
    );
  }

  if (isMobile) {
    return (
      <div id="roadmap-section" className="w-full bg-background">
        <MobileRoadmap />
      </div>
    );
  }

  return (
    <div id="roadmap-section" className="w-full h-[1620px]">
      <RoadmapCanvas />
    </div>
  );
}
