"use client";

import { useEffect, useState } from "react";
import { RoadmapCanvas } from "./RoadmapCanvas";
import { MobileRoadmap } from "./MobileRoadmap";

const MOBILE_BREAKPOINT = 768; // px

export function RoadmapSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    setMounted(true);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <div id="roadmap-section" className="w-full h-[1300px]">
      <RoadmapCanvas />
    </div>
  );
}
