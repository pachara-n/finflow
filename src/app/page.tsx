import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/layout/HeroSection";
import { RoadmapCanvas } from "@/components/roadmap/RoadmapCanvas";
import { ContentDrawer } from "@/components/roadmap/ContentDrawer";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      {/*
        This middle section is a scrollable column.
        HeroSection and Canvas stack vertically inside it.
        The canvas itself grows to fill the remaining height.
      */}
      <div className="flex-1 flex flex-col overflow-auto min-h-0">
        <HeroSection />
        <div className="flex-1 min-h-0">
          <RoadmapCanvas />
        </div>
      </div>
      <ContentDrawer />
    </div>
  );
}
