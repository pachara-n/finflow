import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/layout/HeroSection";
import { RoadmapCanvas } from "@/components/roadmap/RoadmapCanvas";
import { ContentDrawer } from "@/components/roadmap/ContentDrawer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        {/*
          Give the canvas a fixed large height to fit the whole roadmap.
          This makes the entire page scrollable naturally.
        */}
        <div className="w-full h-[1800px]">
          <RoadmapCanvas />
        </div>
      </main>
      <ContentDrawer />
    </div>
  );
}
