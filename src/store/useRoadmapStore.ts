import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Edge } from '@xyflow/react';
import type { RoadmapState, RoadmapNode } from '@/types/roadmap';

// 3 columns layout: Left (100), Center (350), Right (600)
// To make it look like roadmap.sh, we snake through the nodes.
const initialNodes: RoadmapNode[] = [
  // Phase 1
  { id: '1-1', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'ทำไมต้องลงทุน?', status: 'unlocked', contentFile: '1-1-why-invest.md' } },
  { id: '1-2', type: 'custom', position: { x: 600, y: 200 }, data: { label: 'เช็คสุขภาพการเงิน', status: 'locked', contentFile: '1-2-health-check.md' } },
  { id: '1-3', type: 'custom', position: { x: 350, y: 350 }, data: { label: 'สามเหลี่ยมการเงิน', status: 'locked', contentFile: '1-3-triangle.md' } },
  
  // Phase 2
  { id: '2-1', type: 'custom', position: { x: 100, y: 500 }, data: { label: 'จัดการหนี้สิน', status: 'locked', contentFile: '2-1-debt.md' } },
  { id: '2-2', type: 'custom', position: { x: 350, y: 650 }, data: { label: 'เงินสำรองฉุกเฉิน', status: 'locked', contentFile: '2-2-emergency.md', interactiveType: 'EmergencyFundCalculator' } },
  { id: '2-3', type: 'custom', position: { x: 600, y: 800 }, data: { label: 'ป้องกันความเสี่ยง', status: 'locked', contentFile: '2-3-insurance.md' } },
  
  // Phase 3
  { id: '3-1', type: 'custom', position: { x: 350, y: 950 }, data: { label: 'ความเสี่ยง&ผลตอบแทน', status: 'locked', contentFile: '3-1-risk.md' } },
  { id: '3-2', type: 'custom', position: { x: 100, y: 1100 }, data: { label: 'ตราสารหนี้&กองทุนรวม', status: 'locked', contentFile: '3-2-mutual-funds.md', interactiveType: 'DCASimulator' } },
  { id: '3-3', type: 'custom', position: { x: 350, y: 1250 }, data: { label: 'พื้นฐานตลาดหุ้น', status: 'locked', contentFile: '3-3-stock-market.md' } },
  
  // Phase 4
  { id: '4-1', type: 'custom', position: { x: 600, y: 1400 }, data: { label: 'วางแผนเกษียณสุข', status: 'locked', contentFile: '4-1-retirement.md' } },
  { id: '4-2', type: 'custom', position: { x: 350, y: 1550 }, data: { label: 'ภาษี 101', status: 'locked', contentFile: '4-2-tax.md' } },
];

const initialEdges: Edge[] = [
  // initial first edge is animated because target 1-1 is already unlocked
  { id: 'e1-1-1-2', source: '1-1', target: '1-2', type: 'smoothstep' },
  { id: 'e1-2-1-3', source: '1-2', target: '1-3', type: 'smoothstep' },
  { id: 'e1-3-2-1', source: '1-3', target: '2-1', type: 'smoothstep' },
  
  { id: 'e2-1-2-2', source: '2-1', target: '2-2', type: 'smoothstep' },
  { id: 'e2-2-2-3', source: '2-2', target: '2-3', type: 'smoothstep' },
  { id: 'e2-3-3-1', source: '2-3', target: '3-1', type: 'smoothstep' },
  
  { id: 'e3-1-3-2', source: '3-1', target: '3-2', type: 'smoothstep' },
  { id: 'e3-2-3-3', source: '3-2', target: '3-3', type: 'smoothstep' },
  { id: 'e3-3-4-1', source: '3-3', target: '4-1', type: 'smoothstep' },
  
  { id: 'e4-1-4-2', source: '4-1', target: '4-2', type: 'smoothstep' },
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
      
      markNodeAsCompleted: (nodeId) => {
        set((state) => {
          // 1. Mark current node as completed
          const newNodes = state.nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, status: 'completed' as const } };
            }
            return node;
          });
          
          // 2. Change the edge pointing to this node to be green and solid
          const newEdges = state.edges.map((edge) => {
            if (edge.target === nodeId) {
               return { 
                 ...edge, 
                 animated: false, 
                 style: { stroke: '#10b981', strokeWidth: 2 } 
               };
            }
            return edge;
          });
          
          return { nodes: newNodes, edges: newEdges };
        });
        
        get()._unlockConnectedNodes(nodeId);
      },

      _unlockConnectedNodes: (completedNodeId) => {
        const { edges } = get();
        const targetIds = edges
          .filter((e) => e.source === completedNodeId)
          .map((e) => e.target);
          
        set((state) => {
          // 1. Unlock target nodes
          const newNodes = state.nodes.map((node) => {
            if (targetIds.includes(node.id) && node.data.status === 'locked') {
              return { ...node, data: { ...node.data, status: 'unlocked' as const } };
            }
            return node;
          });
          
          // 2. Animate the edge leading to the newly unlocked node
          const newEdges = state.edges.map((edge) => {
            if (edge.source === completedNodeId && targetIds.includes(edge.target)) {
              return { ...edge, animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } };
            }
            return edge;
          });
          
          return { nodes: newNodes, edges: newEdges };
        });
      },

      getProgressPercentage: () => {
        const { nodes } = get();
        if (nodes.length === 0) return 0;
        const completedCount = nodes.filter((n) => n.data.status === 'completed').length;
        return Math.round((completedCount / nodes.length) * 100);
      },
    }),
    {
      name: 'finflow-storage',
      // We skip persisting UI layout edges animation so it depends purely on node status? 
      // Actually zustand will persist everything. Should be okay for MVP.
    }
  )
);
