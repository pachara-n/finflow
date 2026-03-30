import type { Node, Edge } from '@xyflow/react';

export type NodeStatus = 'locked' | 'unlocked' | 'completed';

export interface NodeData extends Record<string, unknown> {
  label: string;
  status: NodeStatus;
  contentFile?: string;
  interactiveType?: 'EmergencyFundCalculator' | 'DCASimulator';
}

export type RoadmapNode = Node<NodeData, 'custom'>;

export interface RoadmapState {
  nodes: RoadmapNode[];
  edges: Edge[];
  selectedNode: RoadmapNode | null;
  isDrawerOpen: boolean;
  
  // Actions
  setSelectedNode: (node: RoadmapNode | null) => void;
  setDrawerOpen: (isOpen: boolean) => void;
  markNodeAsCompleted: (nodeId: string) => void;
  getProgressPercentage: () => number;
  
  // Internal helper to update edges unlock status
  _unlockConnectedNodes: (completedNodeId: string) => void;
}
