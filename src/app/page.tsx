import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/layout/HeroSection";
import { RoadmapCanvas } from "@/components/roadmap/RoadmapCanvas";
import { ContentDrawer } from "@/components/roadmap/ContentDrawer";
import { ResourceSection } from "@/components/layout/ResourceSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-zinc-100">
      <Header />
      <main className="flex flex-col flex-1">
        <HeroSection />
        {/*
          Give the canvas a fixed large height to fit the whole roadmap.
          Reduced from 1800px to 1400px for a tighter, cleaner layout.
        */}
        <div id="roadmap-section" className="w-full h-[1400px]">
          <RoadmapCanvas />
        </div>
        <ResourceSection />
      </main>
      <Footer />
      <ContentDrawer />
    </div>
  );
}
