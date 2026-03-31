import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/layout/HeroSection";
import { RoadmapSection } from "@/components/roadmap/RoadmapSection";
import { ContentDrawer } from "@/components/roadmap/ContentDrawer";
import { ResourceSection } from "@/components/layout/ResourceSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-zinc-100">
      <Header />
      <main className="flex flex-col flex-1">
        <HeroSection />
        <RoadmapSection />
        <ResourceSection />
      </main>
      <Footer />
      <ContentDrawer />
    </div>
  );
}
