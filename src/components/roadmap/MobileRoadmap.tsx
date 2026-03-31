"use client";

import { useRoadmapStore } from "@/store/useRoadmapStore";
import { BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import type { RoadmapNode } from "@/types/roadmap";

const phases = [
  {
    id: "ph-1",
    number: 1,
    label: "วางรากฐานการเงิน",
    description: "เข้าใจเงินของตัวเอง ตั้งเป้าหมาย และสร้างฐานก่อนลงทุน",
    nodeIds: ["1-1", "1-2", "1-3", "1-4", "1-5"],
  },
  {
    id: "ph-2",
    number: 2,
    label: "เข้าใจเครื่องมือการลงทุน",
    description: "รู้จักผลตอบแทน ความเสี่ยง และเครื่องมือพื้นฐาน",
    nodeIds: ["2-1", "2-2", "2-3", "2-4", "2-5"],
  },
  {
    id: "ph-3",
    number: 3,
    label: "วางแผนพอร์ตให้เหมาะกับตัวเอง",
    description: "เริ่มจัดพอร์ตแบบง่ายและเข้าใจต้นทุนการลงทุน",
    nodeIds: ["3-1", "3-2", "3-3", "3-4", "3-5"],
  },
  {
    id: "ph-4",
    number: 4,
    label: "ป้องกันความผิดพลาดที่พบบ่อย",
    description: "ระวังอารมณ์ การชักจูง และผลตอบแทนที่ดูดีเกินจริง",
    nodeIds: ["4-1", "4-2", "4-3", "4-4", "4-5"],
  },
  {
    id: "ph-5",
    number: 5,
    label: "ลงมือทำแบบคนเพิ่งเริ่ม",
    description: "มีแผนเรียบง่ายและทำต่อเนื่องในปีแรก",
    nodeIds: ["5-1"],
  },
];

function MobileTopicCard({ node }: { node: RoadmapNode }) {
  const setSelectedNode = useRoadmapStore((state) => state.setSelectedNode);
  const setDrawerOpen = useRoadmapStore((state) => state.setDrawerOpen);
  const isCompleted = node.data.status === "completed";

  const handleClick = () => {
    setSelectedNode(node);
    setDrawerOpen(true);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-left active:scale-[0.98] ${
        isCompleted
          ? "bg-emerald-950/40 border-emerald-500/40 hover:border-emerald-500/60"
          : "bg-zinc-900 border-zinc-700/60 hover:border-zinc-500"
      }`}
    >
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <BookOpen className="w-5 h-5 text-zinc-500" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-sm leading-snug ${
            isCompleted ? "text-emerald-300" : "text-zinc-200"
          }`}
        >
          {node.data.label}
        </p>
        {node.data.description && (
          <p className="text-xs mt-0.5 text-zinc-500 truncate">{node.data.description}</p>
        )}
      </div>

      <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
    </button>
  );
}

export function MobileRoadmap() {
  const nodes = useRoadmapStore((state) => state.nodes);

  const getNode = (id: string) => nodes.find((n) => n.id === id);

  return (
    <div className="w-full px-4 py-8 space-y-8">
      {phases.map((phase, phaseIndex) => (
        <div key={phase.id}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-200 flex items-center justify-center">
              <span className="text-zinc-900 font-bold text-sm">{phase.number}</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-zinc-100 leading-snug">
                เฟสที่ {phase.number} — {phase.label}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5 truncate">{phase.description}</p>
            </div>
          </div>

          <div className="space-y-2 pl-[18px] border-l-2 border-zinc-800 ml-[17px]">
            {phase.nodeIds.map((nodeId) => {
              const node = getNode(nodeId);
              if (!node) return null;
              return <MobileTopicCard key={nodeId} node={node} />;
            })}
          </div>

          {phaseIndex < phases.length - 1 && (
            <div className="flex justify-center py-3">
              <div className="w-0.5 h-6 bg-zinc-800 rounded-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
