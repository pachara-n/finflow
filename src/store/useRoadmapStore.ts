import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Edge } from "@xyflow/react";
import type { RoadmapState, RoadmapNode } from "@/types/roadmap";

const PH_X = 0;
const NODE_X_OFFSET = -115; // (4 nodes * 230px / 2) is approx where we want to shift to center relative to PH_X=0
const T_Y_OFFSET = 130;
const PHASE_GAP = 320;

const phaseY = (phase: number) => (phase - 1) * PHASE_GAP;
const topicY = (phase: number) => phaseY(phase) + T_Y_OFFSET;
const topicX = (col: number) => PH_X + NODE_X_OFFSET + (col * 230);

// All nodes are unlocked from the start. Lock system removed.
const initialNodes: RoadmapNode[] = [
  {
    id: "ph-1",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(1) },
    data: {
      label: "เฟสที่ 1 — วางรากฐานฉบับคนรุ่นใหม่",
      phaseNumber: 1,
      description: "เข้าใจเงินของตัวเอง ตั้งเป้าหมาย และซื้ออิสรภาพทางเลือก",
    },
  },
  {
    id: "1-1",
    type: "custom",
    position: { x: topicX(0), y: topicY(1) },
    data: {
      label: "ทำไมต้องลงทุน?",
      description: "เงินเฟ้อ & ดอกเบี้ยทบต้น",
      status: "unlocked",
      contentFile: "1-1-why-invest.md",
    },
  },
  {
    id: "1-2",
    type: "custom",
    position: { x: topicX(1), y: topicY(1) },
    data: {
      label: "จัดการสภาพคล่อง",
      description: "เช็คสุขภาพการเงินเบื้องต้น",
      status: "unlocked",
      contentFile: "1-2-cashflow.md",
    },
  },
  {
    id: "1-3",
    type: "custom",
    position: { x: topicX(2), y: topicY(1) },
    data: {
      label: "แนวคิด FIRE",
      description: "อิสรภาพทางการเงินทําอย่างไร?",
      status: "unlocked",
      contentFile: "1-3-fire.md",
    },
  },
  {
    id: "1-4",
    type: "custom",
    position: { x: topicX(3), y: topicY(1) },
    data: {
      label: "เงินสำรองฉุกเฉิน",
      description: "สามเหลี่ยมการเงินของแท้",
      status: "unlocked",
      contentFile: "1-4-emergency.md",
    },
  },

  {
    id: "ph-2",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(2) },
    data: {
      label: "เฟสที่ 2 — ให้เงินทำงานแทนเรา",
      phaseNumber: 2,
      description: "เรียนรู้เครื่องมือการลงทุนที่จะสร้าง Passive Income",
    },
  },
  {
    id: "2-1",
    type: "custom",
    position: { x: topicX(0), y: topicY(2) },
    data: {
      label: "ความลับดอกเบี้ยทบต้น",
      description: "ทำไมต้องรีบลงทุน?",
      status: "unlocked",
      contentFile: "2-1-compound.md",
    },
  },
  {
    id: "2-2",
    type: "custom",
    position: { x: topicX(1), y: topicY(2) },
    data: {
      label: "กองทุนรวม & ETF",
      description: "ทางลัดของมือใหม่",
      status: "unlocked",
      contentFile: "2-2-etf.md",
    },
  },
  {
    id: "2-3",
    type: "custom",
    position: { x: topicX(2), y: topicY(2) },
    data: {
      label: "DCA",
      description: "ลงทุนแบบคนขี้เกียจแต่รวย",
      status: "unlocked",
      contentFile: "2-3-dca.md",
      interactiveType: "DCASimulator",
    },
  },

  {
    id: "ph-3",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(3) },
    data: {
      label: "เฟสที่ 3 — อัปเลเวลนักลงทุน",
      phaseNumber: 3,
      description: "ขยับมาลงทุนด้วยตัวเองในสินทรัพย์แห่งโลกอนาคต",
    },
  },
  {
    id: "3-1",
    type: "custom",
    position: { x: topicX(0), y: topicY(3) },
    data: {
      label: "หุ้นเติบโต vs ปันผล",
      description: "เลือกแบบไหนดี?",
      status: "unlocked",
      contentFile: "3-1-stocks.md",
    },
  },
  {
    id: "3-2",
    type: "custom",
    position: { x: topicX(1), y: topicY(3) },
    data: {
      label: "Crypto 101",
      description: "ลงทุนคริปโทฯ แบบไม่กาว",
      status: "unlocked",
      contentFile: "3-2-crypto.md",
    },
  },
  {
    id: "3-3",
    type: "custom",
    position: { x: topicX(2), y: topicY(3) },
    data: {
      label: "Asset Allocation",
      description: "จัดพอร์ตไม่ให้แตก",
      status: "unlocked",
      contentFile: "3-3-allocation.md",
    },
  },

  {
    id: "ph-4",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(4) },
    data: {
      label: "เฟสที่ 4 — สร้างเครื่องผลิตเงิน",
      phaseNumber: 4,
      description: "ถ้าเงินต้นน้อย ต้องหาทางเพิ่มรายได้ให้ไวที่สุด",
    },
  },
  {
    id: "4-1",
    type: "custom",
    position: { x: topicX(1), y: topicY(4) },
    data: {
      label: "Side Hustles",
      description: "หาเงินเพิ่มสำคัญกว่าซุ่มออม",
      status: "unlocked",
      contentFile: "4-1-sidehustle.md",
    },
  },
  {
    id: "4-2",
    type: "custom",
    position: { x: topicX(2), y: topicY(4) },
    data: {
      label: "ลงทุนในตัวเอง",
      description: "การลงทุนฉบับไร้ความเสี่ยง",
      status: "unlocked",
      contentFile: "4-2-invest-in-yourself.md",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-1_1-2", source: "1-1", target: "1-2", type: "smoothstep" },
  { id: "e1-2_1-3", source: "1-2", target: "1-3", type: "smoothstep" },
  { id: "e1-3_1-4", source: "1-3", target: "1-4", type: "smoothstep" },
  { id: "e1-4_2-1", source: "1-4", target: "2-1", type: "smoothstep" },
  { id: "e2-1_2-2", source: "2-1", target: "2-2", type: "smoothstep" },
  { id: "e2-2_2-3", source: "2-2", target: "2-3", type: "smoothstep" },
  { id: "e2-3_3-1", source: "2-3", target: "3-1", type: "smoothstep" },
  { id: "e3-1_3-2", source: "3-1", target: "3-2", type: "smoothstep" },
  { id: "e3-2_3-3", source: "3-2", target: "3-3", type: "smoothstep" },
  { id: "e3-3_4-1", source: "3-3", target: "4-1", type: "smoothstep" },
  { id: "e4-1_4-2", source: "4-1", target: "4-2", type: "smoothstep" },
];
export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNode: null,
      isDrawerOpen: false,

      setSelectedNode: (node) => set({ selectedNode: node }),
      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),

      setNodeStatus: (nodeId, status) => {
        set((state) => {
          const newNodes = state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, status } }
              : node,
          );

          return {
            nodes: newNodes,
            selectedNode:
              state.selectedNode?.id === nodeId
                ? {
                    ...state.selectedNode,
                    data: { ...state.selectedNode.data, status },
                  }
                : state.selectedNode,
          };
        });
      },

      markNodeAsCompleted: (nodeId) => {
        get().setNodeStatus(nodeId, "completed");
      },

      // Only count topic nodes (those with a status field)
      getProgressPercentage: () => {
        const { nodes } = get();
        const topicNodes = nodes.filter((n) => n.data.status !== undefined);
        if (topicNodes.length === 0) return 0;
        const completedCount = topicNodes.filter(
          (n) => n.data.status === "completed",
        ).length;
        return Math.round((completedCount / topicNodes.length) * 100);
      },

      getCompletedCount: () => {
        const { nodes } = get();
        return nodes.filter((n) => n.data.status === "completed").length;
      },

      getTotalCount: () => {
        const { nodes } = get();
        return nodes.filter((n) => n.data.status !== undefined).length;
      },
    }),
    { name: "finflow-storage" },
  ),
);
