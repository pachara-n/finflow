"use client";

import { useRoadmapStore } from "@/store/useRoadmapStore";
import { CheckCircle2, BookOpen, ChevronRight } from "lucide-react";
import type { RoadmapNode } from "@/types/roadmap";

// Phase definitions matching the store
const phases = [
  {
    id: "ph-1",
    number: 1,
    label: "วางรากฐานฉบับคนรุ่นใหม่",
    description: "เข้าใจเงินของตัวเอง ตั้งเป้าหมาย และซื้ออิสรภาพทางเลือก",
    nodeIds: ["1-1", "1-2", "1-3", "1-4"],
  },
  {
    id: "ph-2",
    number: 2,
    label: "ให้เงินทำงานแทนเรา",
    description: "เข้าใจหัวใจของการลงทุนและเริ่มปั้นพอร์ตง่ายๆ",
    nodeIds: ["2-1", "2-2", "2-3", "2-4"],
  },
  {
    id: "ph-3",
    number: 3,
    label: "เลือกลงทุนในแบบที่ใช่",
    description: "หากลยุทธ์ที่เหมาะกับไลฟ์สไตล์ตัวเอง",
    nodeIds: ["3-1", "3-2", "3-3"],
  },
  {
    id: "ph-4",
    number: 4,
    label: "สร้างเครื่องผลิตเงิน",
    description: "ถ้าเงินต้นน้อย ต้องหาทางเพิ่มรายได้ให้ไวที่สุด",
    nodeIds: ["4-1", "4-2", "4-3"],
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
      {/* Icon */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <BookOpen className="w-5 h-5 text-zinc-500" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-sm leading-snug ${
            isCompleted ? "text-emerald-300" : "text-zinc-200"
          }`}
        >
          {node.data.label}
        </p>
        {node.data.description && (
          <p className="text-xs mt-0.5 text-zinc-500 truncate">
            {node.data.description}
          </p>
        )}
      </div>

      {/* Arrow */}
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
          {/* Phase Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-200 flex items-center justify-center">
              <span className="text-zinc-900 font-bold text-sm">
                {phase.number}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-zinc-100 leading-snug">
                เฟสที่ {phase.number} — {phase.label}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5 truncate">
                {phase.description}
              </p>
            </div>
          </div>

          {/* Topic Cards */}
          <div className="space-y-2 pl-[18px] border-l-2 border-zinc-800 ml-[17px]">
            {phase.nodeIds.map((nodeId) => {
              const node = getNode(nodeId);
              if (!node) return null;
              return <MobileTopicCard key={nodeId} node={node} />;
            })}
          </div>

          {/* Connector line between phases */}
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
