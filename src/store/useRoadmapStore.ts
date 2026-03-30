import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Edge } from '@xyflow/react';
import type { RoadmapState, RoadmapNode } from '@/types/roadmap';

const PH_X = 0;
const T_Y_OFFSET = 130;
const PHASE_GAP = 320;

const phaseY = (phase: number) => (phase - 1) * PHASE_GAP;
const topicY = (phase: number) => phaseY(phase) + T_Y_OFFSET;

// All nodes are unlocked from the start. Lock system removed.
const initialNodes: RoadmapNode[] = [
  { id: 'ph-1', type: 'phase-header', selectable: false, position: { x: PH_X, y: phaseY(1) }, data: { label: 'เฟสที่ 1 — ปูพื้นฐาน & ปรับ Mindset', phaseNumber: 1, description: 'เข้าใจว่าทำไมต้องลงทุนและสำรวจสุขภาพการเงินของตัวเองก่อนเริ่มต้น' } },
  { id: '1-1', type: 'custom', position: { x: PH_X, y: topicY(1) }, data: { label: 'ทำไมต้องลงทุน?', description: 'เงินเฟ้อ & พลังของเวลา', status: 'unlocked', contentFile: '1-1-why-invest.md' } },
  { id: '1-2', type: 'custom', position: { x: PH_X + 230, y: topicY(1) }, data: { label: 'เช็คสุขภาพการเงิน', description: 'Net Worth & Cash Flow', status: 'unlocked', contentFile: '1-2-health-check.md' } },
  { id: '1-3', type: 'custom', position: { x: PH_X + 460, y: topicY(1) }, data: { label: 'สามเหลี่ยมการเงิน', description: 'ลำดับความสำคัญก่อนลงทุน', status: 'unlocked', contentFile: '1-3-triangle.md' } },

  { id: 'ph-2', type: 'phase-header', selectable: false, position: { x: PH_X, y: phaseY(2) }, data: { label: 'เฟสที่ 2 — สร้างรากฐานที่มั่นคง (ห้ามข้าม!)', phaseNumber: 2, description: 'จัดการหนี้, เตรียมเงินสำรองฉุกเฉิน, และป้องกันความเสี่ยง' } },
  { id: '2-1', type: 'custom', position: { x: PH_X, y: topicY(2) }, data: { label: 'จัดการหนี้สิน', description: 'หนี้ดี vs หนี้เลว', status: 'unlocked', contentFile: '2-1-debt.md' } },
  { id: '2-2', type: 'custom', position: { x: PH_X + 230, y: topicY(2) }, data: { label: 'เงินสำรองฉุกเฉิน', description: 'เก็บไว้ที่ไหน? เท่าไหร่?', status: 'unlocked', contentFile: '2-2-emergency.md', interactiveType: 'EmergencyFundCalculator' } },
  { id: '2-3', type: 'custom', position: { x: PH_X + 460, y: topicY(2) }, data: { label: 'ป้องกันความเสี่ยง', description: 'ประกันสุขภาพ & ชีวิต', status: 'unlocked', contentFile: '2-3-insurance.md' } },

  { id: 'ph-3', type: 'phase-header', selectable: false, position: { x: PH_X, y: phaseY(3) }, data: { label: 'เฟสที่ 3 — เริ่มต้นเครื่องมือการลงทุน', phaseNumber: 3, description: 'ความเสี่ยง, กองทุนรวม, DCA, และตลาดหุ้นเบื้องต้น' } },
  { id: '3-1', type: 'custom', position: { x: PH_X, y: topicY(3) }, data: { label: 'ความเสี่ยง & ผลตอบแทน', description: 'Risk Tolerance ของคุณ', status: 'unlocked', contentFile: '3-1-risk.md' } },
  { id: '3-2', type: 'custom', position: { x: PH_X + 230, y: topicY(3) }, data: { label: 'ตราสารหนี้ & กองทุนรวม', description: 'DCA & Mutual Funds', status: 'unlocked', contentFile: '3-2-mutual-funds.md', interactiveType: 'DCASimulator' } },
  { id: '3-3', type: 'custom', position: { x: PH_X + 460, y: topicY(3) }, data: { label: 'พื้นฐานตลาดหุ้น', description: 'หุ้น, P/E Ratio', status: 'unlocked', contentFile: '3-3-stock-market.md' } },

  { id: 'ph-4', type: 'phase-header', selectable: false, position: { x: PH_X, y: phaseY(4) }, data: { label: 'เฟสที่ 4 — วางแผนระยะยาว & ภาษี', phaseNumber: 4, description: 'RMF/SSF, กองทุนเกษียณ, และลดหย่อนภาษีอย่างถูกกฎหมาย' } },
  { id: '4-1', type: 'custom', position: { x: PH_X, y: topicY(4) }, data: { label: 'วางแผนเกษียณสุข', description: 'RMF, SSF, กองทุนเกษียณ', status: 'unlocked', contentFile: '4-1-retirement.md' } },
  { id: '4-2', type: 'custom', position: { x: PH_X + 230, y: topicY(4) }, data: { label: 'ภาษี 101', description: 'ลดหย่อนภาษีอย่างชาญฉลาด', status: 'unlocked', contentFile: '4-2-tax.md' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-1_1-2', source: '1-1', target: '1-2', type: 'smoothstep' },
  { id: 'e1-2_1-3', source: '1-2', target: '1-3', type: 'smoothstep' },
  { id: 'e1-3_2-1', source: '1-3', target: '2-1', type: 'smoothstep' },
  { id: 'e2-1_2-2', source: '2-1', target: '2-2', type: 'smoothstep' },
  { id: 'e2-2_2-3', source: '2-2', target: '2-3', type: 'smoothstep' },
  { id: 'e2-3_3-1', source: '2-3', target: '3-1', type: 'smoothstep' },
  { id: 'e3-1_3-2', source: '3-1', target: '3-2', type: 'smoothstep' },
  { id: 'e3-2_3-3', source: '3-2', target: '3-3', type: 'smoothstep' },
  { id: 'e3-3_4-1', source: '3-3', target: '4-1', type: 'smoothstep' },
  { id: 'e4-1_4-2', source: '4-1', target: '4-2', type: 'smoothstep' },
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
              : node
          );
          
          return {
            nodes: newNodes,
            selectedNode: state.selectedNode?.id === nodeId 
              ? { ...state.selectedNode, data: { ...state.selectedNode.data, status } }
              : state.selectedNode
          };
        });
      },

      markNodeAsCompleted: (nodeId) => {
        get().setNodeStatus(nodeId, 'completed');
      },

      // Only count topic nodes (those with a status field)
      getProgressPercentage: () => {
        const { nodes } = get();
        const topicNodes = nodes.filter((n) => n.data.status !== undefined);
        if (topicNodes.length === 0) return 0;
        const completedCount = topicNodes.filter((n) => n.data.status === 'completed').length;
        return Math.round((completedCount / topicNodes.length) * 100);
      },

      getCompletedCount: () => {
        const { nodes } = get();
        return nodes.filter((n) => n.data.status === 'completed').length;
      },

      getTotalCount: () => {
        const { nodes } = get();
        return nodes.filter((n) => n.data.status !== undefined).length;
      },
    }),
    { name: 'finflow-storage' }
  )
);
