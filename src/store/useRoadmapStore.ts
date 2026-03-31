import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Edge } from "@xyflow/react";
import type { RoadmapState, RoadmapNode } from "@/types/roadmap";

const PH_X = 0;
const T_Y_OFFSET = 130;
const PHASE_GAP = 320;

const phaseY = (phase: number) => (phase - 1) * PHASE_GAP;
const topicY = (phase: number) => phaseY(phase) + T_Y_OFFSET;

// Dynamic centering relative to the Phase Header
const topicX = (col: number, totalCols: number = 4) => {
  const COL_W = 230; // 210 node + 20 gap
  const PH_CENTER = 335; // The phase header spans approx 3 nodes (210*3+40 = 670px), so its center is at 335
  
  const totalNodesWidth = (totalCols * COL_W) - 20; // total width of the node group
  const startX = PH_X + PH_CENTER - (totalNodesWidth / 2); // left-most X coordinate
  
  return startX + (col * COL_W);
};

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
    position: { x: topicX(0, 4), y: topicY(1) },
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
    position: { x: topicX(1, 4), y: topicY(1) },
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
    position: { x: topicX(2, 4), y: topicY(1) },
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
    position: { x: topicX(3, 4), y: topicY(1) },
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
      description: "เข้าใจหัวใจของการลงทุนและเริ่มปั้นพอร์ตง่ายๆ",
    },
  },
  {
    id: "2-1",
    type: "custom",
    position: { x: topicX(0, 4), y: topicY(2) },
    data: {
      label: "หุ้นคืออะไร?",
      description: "เปลี่ยนมุมมองผู้เล่น",
      status: "unlocked",
      contentFile: "2-1-what-is-stock.md",
    },
  },
  {
    id: "2-2",
    type: "custom",
    position: { x: topicX(1, 4), y: topicY(2) },
    data: {
      label: "ผลตอบแทนมาจากไหน?",
      description: "ปันผล vs ส่วนต่าง",
      status: "unlocked",
      contentFile: "2-2-returns.md",
    },
  },
  {
    id: "2-3",
    type: "custom",
    position: { x: topicX(2, 4), y: topicY(2) },
    data: {
      label: "Index Fund",
      description: "ทางลัดของคนขี้เกียจ",
      status: "unlocked",
      contentFile: "2-3-index-fund.md",
    },
  },
  {
    id: "2-4",
    type: "custom",
    position: { x: topicX(3, 4), y: topicY(2) },
    data: {
      label: "พลังดอกเบี้ยทบต้น",
      description: "เวลาและวินัย",
      status: "unlocked",
      contentFile: "2-4-compound.md",
    },
  },

  {
    id: "ph-3",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(3) },
    data: {
      label: "เฟสที่ 3 — เลือกลงทุนในแบบที่ใช่",
      phaseNumber: 3,
      description: "หากลยุทธ์ที่เหมาะกับไลฟ์สไตล์ตัวเอง",
    },
  },
  {
    id: "3-1",
    type: "custom",
    position: { x: topicX(0, 3), y: topicY(3) },
    data: {
      label: "สาย DCA ชนะตลาดยังไง?",
      description: "เทรด vs สม่าเสมอ",
      status: "unlocked",
      contentFile: "3-1-dca.md",
      interactiveType: "DCASimulator",
    },
  },
  {
    id: "3-2",
    type: "custom",
    position: { x: topicX(1, 3), y: topicY(3) },
    data: {
      label: "หุ้นเติบโต vs ปันผล",
      description: "เลือกแบบไหนดี?",
      status: "unlocked",
      contentFile: "3-2-growth-vs-dividend.md",
    },
  },
  {
    id: "3-3",
    type: "custom",
    position: { x: topicX(2, 3), y: topicY(3) },
    data: {
      label: "Common-Sense Investing",
      description: "ลงทุนด้วยสามัญสำนึก",
      status: "unlocked",
      contentFile: "3-3-common-sense.md",
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
    position: { x: topicX(0, 2), y: topicY(4) },
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
    position: { x: topicX(1, 2), y: topicY(4) },
    data: {
      label: "ลงทุนในตัวเอง",
      description: "การลงทุนฉบับไร้ความเสี่ยง",
      status: "unlocked",
      contentFile: "4-2-invest-in-yourself.md",
    },
  },
];

const initialEdges: Edge[] = [
  // Phase 1 flow
  { id: "eph-1_1-1", source: "ph-1", target: "1-1", type: "smoothstep" },
  { id: "e1-1_1-2", source: "1-1", target: "1-2", type: "smoothstep" },
  { id: "e1-2_1-3", source: "1-2", target: "1-3", type: "smoothstep" },
  { id: "e1-3_1-4", source: "1-3", target: "1-4", type: "smoothstep" },
  
  // Connect Phase 1 end to Phase 2 Header
  { id: "e1-4_ph-2", source: "1-4", target: "ph-2", type: "smoothstep" },
  
  // Phase 2 flow
  { id: "eph-2_2-1", source: "ph-2", target: "2-1", type: "smoothstep" },
  { id: "e2-1_2-2", source: "2-1", target: "2-2", type: "smoothstep" },
  { id: "e2-2_2-3", source: "2-2", target: "2-3", type: "smoothstep" },
  { id: "e2-3_2-4", source: "2-3", target: "2-4", type: "smoothstep" },
  
  // Connect Phase 2 end to Phase 3 Header
  { id: "e2-4_ph-3", source: "2-4", target: "ph-3", type: "smoothstep" },
  
  // Phase 3 flow
  { id: "eph-3_3-1", source: "ph-3", target: "3-1", type: "smoothstep" },
  { id: "e3-1_3-2", source: "3-1", target: "3-2", type: "smoothstep" },
  { id: "e3-2_3-3", source: "3-2", target: "3-3", type: "smoothstep" },
  
  // Connect Phase 3 end to Phase 4 Header
  { id: "e3-3_ph-4", source: "3-3", target: "ph-4", type: "smoothstep" },
  
  // Phase 4 flow
  { id: "eph-4_4-1", source: "ph-4", target: "4-1", type: "smoothstep" },
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
