import { Header } from '@/components/layout/Header';
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas';
import { ContentDrawer } from '@/components/roadmap/ContentDrawer';

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 relative">
        <RoadmapCanvas />
        <ContentDrawer />
      </main>
    </div>
  );
}
