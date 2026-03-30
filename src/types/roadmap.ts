import type { Node, Edge } from '@xyflow/react';

export type NodeStatus = 'unlocked' | 'completed';

export interface NodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  status?: NodeStatus;
  contentFile?: string;
  interactiveType?: 'EmergencyFundCalculator' | 'DCASimulator';
  phaseNumber?: number;
}

export type RoadmapNode = Node<NodeData>;

export interface RoadmapState {
  nodes: RoadmapNode[];
  edges: Edge[];
  selectedNode: RoadmapNode | null;
  isDrawerOpen: boolean;

  setSelectedNode: (node: RoadmapNode | null) => void;
  setDrawerOpen: (isOpen: boolean) => void;
  setNodeStatus: (nodeId: string, status: NodeStatus) => void;
  markNodeAsCompleted: (nodeId: string) => void;
  getProgressPercentage: () => number;
  getCompletedCount: () => number;
  getTotalCount: () => number;
}
