import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/layout/HeroSection";
import { RoadmapSection } from "@/components/roadmap/RoadmapSection";
import { ContentDrawer } from "@/components/roadmap/ContentDrawer";
import { ResourceSection } from "@/components/layout/ResourceSection";
import { Footer } from "@/components/layout/Footer";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "FinFlow",
      url: "https://finflow.pachara.app/",
      inLanguage: "th-TH",
      description:
        "Roadmap การเงินและการลงทุนสำหรับมือใหม่ เรียนรู้เป็นลำดับและติดตามความคืบหน้าได้ในหน้าเดียว",
    },
    {
      "@type": "Organization",
      name: "FinFlow",
      url: "https://finflow.pachara.app/",
      logo: "https://finflow.pachara.app/icon.svg",
      sameAs: ["https://github.com/pachara-n"],
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
