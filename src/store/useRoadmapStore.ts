import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Edge } from "@xyflow/react";
import type { RoadmapNode, RoadmapState } from "@/types/roadmap";

const PH_X = 0;
const T_Y_OFFSET = 130;
const PHASE_GAP = 320;

const phaseY = (phase: number) => (phase - 1) * PHASE_GAP;
const topicY = (phase: number) => phaseY(phase) + T_Y_OFFSET;

const topicX = (col: number, totalCols = 4) => {
  const COL_W = 230;
  const PH_CENTER = 335;
  const totalNodesWidth = totalCols * COL_W - 20;
  const startX = PH_X + PH_CENTER - totalNodesWidth / 2;

  return startX + col * COL_W;
};

const initialNodes: RoadmapNode[] = [
  {
    id: "ph-1",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(1) },
    data: {
      label: "เฟสที่ 1 — วางรากฐานการเงิน",
      phaseNumber: 1,
      description: "เริ่มจากเข้าใจเงินของตัวเอง ตั้งเป้าหมาย และสร้างฐานที่มั่นคงก่อนลงทุน",
    },
  },
  {
    id: "1-1",
    type: "custom",
    position: { x: topicX(0, 5), y: topicY(1) },
    data: {
      label: "ทำไมต้องลงทุน?",
      description: "เงินเฟ้อ เวลา และพลังของการเริ่มต้นเร็ว",
      status: "unlocked",
      contentFile: "1-1-why-invest.md",
    },
  },
  {
    id: "1-2",
    type: "custom",
    position: { x: topicX(1, 5), y: topicY(1) },
    data: {
      label: "จัดการกระแสเงินสด",
      description: "สำรวจรายรับ รายจ่าย และเงินเหลือ",
      status: "unlocked",
      contentFile: "1-2-cashflow.md",
    },
  },
  {
    id: "1-3",
    type: "custom",
    position: { x: topicX(2, 5), y: topicY(1) },
    data: {
      label: "ตั้งเป้าหมายการเงิน",
      description: "ระยะสั้น ระยะกลาง และระยะยาว",
      status: "unlocked",
      contentFile: "1-3-financial-goals.md",
    },
  },
  {
    id: "1-4",
    type: "custom",
    position: { x: topicX(3, 5), y: topicY(1) },
    data: {
      label: "แนวคิด FIRE",
      description: "อิสระทางการเงินคือการมีทางเลือก",
      status: "unlocked",
      contentFile: "1-4-fire.md",
    },
  },
  {
    id: "1-5",
    type: "custom",
    position: { x: topicX(4, 5), y: topicY(1) },
    data: {
      label: "เงินสำรองฉุกเฉิน",
      description: "เบาะรองรับก่อนเอาเงินไปเสี่ยง",
      status: "unlocked",
      contentFile: "1-5-emergency.md",
    },
  },
  {
    id: "ph-2",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(2) },
    data: {
      label: "เฟสที่ 2 — เข้าใจเครื่องมือการลงทุน",
      phaseNumber: 2,
      description: "รู้ว่าผลตอบแทนมาจากไหน และทำความเข้าใจความเสี่ยงก่อนเริ่มเลือกสินทรัพย์",
    },
  },
  {
    id: "2-1",
    type: "custom",
    position: { x: topicX(0, 5), y: topicY(2) },
    data: {
      label: "หุ้นคืออะไร?",
      description: "เปลี่ยนมุมมองจากนักเก็งกำไรเป็นเจ้าของธุรกิจ",
      status: "unlocked",
      contentFile: "2-1-what-is-stock.md",
    },
  },
  {
    id: "2-2",
    type: "custom",
    position: { x: topicX(1, 5), y: topicY(2) },
    data: {
      label: "ผลตอบแทนมาจากไหน?",
      description: "กำไรเติบโตและเงินปันผล",
      status: "unlocked",
      contentFile: "2-2-returns.md",
    },
  },
  {
    id: "2-3",
    type: "custom",
    position: { x: topicX(2, 5), y: topicY(2) },
    data: {
      label: "ความเสี่ยง vs ผลตอบแทน",
      description: "ผลตอบแทนที่หวังสูงขึ้นมักแลกกับความผันผวน",
      status: "unlocked",
      contentFile: "2-3-risk-vs-return.md",
    },
  },
  {
    id: "2-4",
    type: "custom",
    position: { x: topicX(3, 5), y: topicY(2) },
    data: {
      label: "Index Fund",
      description: "ทางลัดที่เรียบง่ายสำหรับมือใหม่",
      status: "unlocked",
      contentFile: "2-4-index-fund.md",
    },
  },
  {
    id: "2-5",
    type: "custom",
    position: { x: topicX(4, 5), y: topicY(2) },
    data: {
      label: "พลังดอกเบี้ยทบต้น",
      description: "วินัยเล็ก ๆ ที่โตเป็นผลลัพธ์ใหญ่",
      status: "unlocked",
      contentFile: "2-5-compound.md",
    },
  },
  {
    id: "ph-3",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(3) },
    data: {
      label: "เฟสที่ 3 — วางแผนพอร์ตให้เหมาะกับตัวเอง",
      phaseNumber: 3,
      description: "เริ่มประกอบพอร์ตแบบง่าย เลือกวิธีลงทุน และเข้าใจต้นทุนที่มากับการลงทุน",
    },
  },
  {
    id: "3-1",
    type: "custom",
    position: { x: topicX(0, 5), y: topicY(3) },
    data: {
      label: "DCA คืออะไร?",
      description: "ทยอยลงทุนแบบสม่ำเสมอเพื่อลดอารมณ์",
      status: "unlocked",
      contentFile: "3-1-dca.md",
      interactiveType: "DCASimulator",
    },
  },
  {
    id: "3-2",
    type: "custom",
    position: { x: topicX(1, 5), y: topicY(3) },
    data: {
      label: "Asset Allocation",
      description: "แบ่งเงินให้เหมาะกับเป้าหมายและความเสี่ยง",
      status: "unlocked",
      contentFile: "3-2-asset-allocation.md",
    },
  },
  {
    id: "3-3",
    type: "custom",
    position: { x: topicX(2, 5), y: topicY(3) },
    data: {
      label: "Growth vs Dividend",
      description: "เลือกสไตล์ที่เข้ากับตัวเอง",
      status: "unlocked",
      contentFile: "3-3-growth-vs-dividend.md",
    },
  },
  {
    id: "3-4",
    type: "custom",
    position: { x: topicX(3, 5), y: topicY(3) },
    data: {
      label: "Common-Sense Investing",
      description: "ลงทุนด้วยเหตุผล มากกว่าความตื่นเต้น",
      status: "unlocked",
      contentFile: "3-4-common-sense.md",
    },
  },
  {
    id: "3-5",
    type: "custom",
    position: { x: topicX(4, 5), y: topicY(3) },
    data: {
      label: "ค่าธรรมเนียมและภาษี",
      description: "ผลตอบแทนจริงต้องหักต้นทุนเสมอ",
      status: "unlocked",
      contentFile: "3-5-fees-and-tax.md",
    },
  },
  {
    id: "ph-4",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(4) },
    data: {
      label: "เฟสที่ 4 — ป้องกันความผิดพลาดที่พบบ่อย",
      phaseNumber: 4,
      description: "มือใหม่พลาดเพราะอารมณ์และการโดนชักจูงมากกว่าขาดสูตรลับ",
    },
  },
  {
    id: "4-1",
    type: "custom",
    position: { x: topicX(0, 5), y: topicY(4) },
    data: {
      label: "กับดักพฤติกรรมการลงทุน",
      description: "FOMO ขายตอนกลัว และซื้อเพราะคนอื่น",
      status: "unlocked",
      contentFile: "4-1-behavioral-traps.md",
    },
  },
  {
    id: "4-2",
    type: "custom",
    position: { x: topicX(1, 5), y: topicY(4) },
    data: {
      label: "Scam และผลตอบแทนเกินจริง",
      description: "ฝึกมองสัญญาณเตือนก่อนเสียเงิน",
      status: "unlocked",
      contentFile: "4-2-scam-and-fraud.md",
    },
  },
  {
    id: "4-3",
    type: "custom",
    position: { x: topicX(2, 5), y: topicY(4) },
    data: {
      label: "Side Hustles",
      description: "เพิ่มรายได้เพื่อเร่งความก้าวหน้า",
      status: "unlocked",
      contentFile: "4-3-sidehustle.md",
    },
  },
  {
    id: "4-4",
    type: "custom",
    position: { x: topicX(3, 5), y: topicY(4) },
    data: {
      label: "Lifestyle Inflation",
      description: "รายได้เพิ่ม แต่เงินไม่โต ถ้าใช้จ่ายตามทันที",
      status: "unlocked",
      contentFile: "4-4-lifestyle-inflation.md",
    },
  },
  {
    id: "4-5",
    type: "custom",
    position: { x: topicX(4, 5), y: topicY(4) },
    data: {
      label: "ลงทุนในตัวเอง",
      description: "เพิ่มรายได้ระยะยาวด้วยทักษะ",
      status: "unlocked",
      contentFile: "4-5-invest-in-yourself.md",
    },
  },
  {
    id: "ph-5",
    type: "phase-header",
    selectable: false,
    position: { x: PH_X, y: phaseY(5) },
    data: {
      label: "เฟสที่ 5 — ลงมือทำแบบคนเพิ่งเริ่ม",
      phaseNumber: 5,
      description: "ไม่ต้องสมบูรณ์แบบ แค่มีแผนที่เรียบง่ายและทำต่อเนื่อง",
    },
  },
  {
    id: "5-1",
    type: "custom",
    position: { x: topicX(0, 1), y: topicY(5) },
    data: {
      label: "แผนลงทุน 1 ปีแรก",
      description: "ลำดับการลงมือทำสำหรับมือใหม่",
      status: "unlocked",
      contentFile: "5-1-first-year-plan.md",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "eph-1_1-1", source: "ph-1", target: "1-1", type: "smoothstep" },
  { id: "e1-1_1-2", source: "1-1", target: "1-2", type: "smoothstep" },
  { id: "e1-2_1-3", source: "1-2", target: "1-3", type: "smoothstep" },
  { id: "e1-3_1-4", source: "1-3", target: "1-4", type: "smoothstep" },
  { id: "e1-4_1-5", source: "1-4", target: "1-5", type: "smoothstep" },
  { id: "e1-5_ph-2", source: "1-5", target: "ph-2", type: "smoothstep" },

  { id: "eph-2_2-1", source: "ph-2", target: "2-1", type: "smoothstep" },
  { id: "e2-1_2-2", source: "2-1", target: "2-2", type: "smoothstep" },
  { id: "e2-2_2-3", source: "2-2", target: "2-3", type: "smoothstep" },
  { id: "e2-3_2-4", source: "2-3", target: "2-4", type: "smoothstep" },
  { id: "e2-4_2-5", source: "2-4", target: "2-5", type: "smoothstep" },
  { id: "e2-5_ph-3", source: "2-5", target: "ph-3", type: "smoothstep" },

  { id: "eph-3_3-1", source: "ph-3", target: "3-1", type: "smoothstep" },
  { id: "e3-1_3-2", source: "3-1", target: "3-2", type: "smoothstep" },
  { id: "e3-2_3-3", source: "3-2", target: "3-3", type: "smoothstep" },
  { id: "e3-3_3-4", source: "3-3", target: "3-4", type: "smoothstep" },
  { id: "e3-4_3-5", source: "3-4", target: "3-5", type: "smoothstep" },
  { id: "e3-5_ph-4", source: "3-5", target: "ph-4", type: "smoothstep" },

  { id: "eph-4_4-1", source: "ph-4", target: "4-1", type: "smoothstep" },
  { id: "e4-1_4-2", source: "4-1", target: "4-2", type: "smoothstep" },
  { id: "e4-2_4-3", source: "4-2", target: "4-3", type: "smoothstep" },
  { id: "e4-3_4-4", source: "4-3", target: "4-4", type: "smoothstep" },
  { id: "e4-4_4-5", source: "4-4", target: "4-5", type: "smoothstep" },
  { id: "e4-5_ph-5", source: "4-5", target: "ph-5", type: "smoothstep" },

  { id: "eph-5_5-1", source: "ph-5", target: "5-1", type: "smoothstep" },
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
            node.id === nodeId ? { ...node, data: { ...node.data, status } } : node,
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

      getProgressPercentage: () => {
        const { nodes } = get();
        const topicNodes = nodes.filter((n) => n.data.status !== undefined);
        if (topicNodes.length === 0) return 0;

        const completedCount = topicNodes.filter((n) => n.data.status === "completed").length;
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
