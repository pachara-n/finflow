'use client';

import { useMemo, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useRoadmapStore } from '@/store/useRoadmapStore';
import { CustomNode } from './CustomNode';
import type { RoadmapNode } from '@/types/roadmap';

const nodeTypes = {
  custom: CustomNode,
};

// Component to handle smooth initial zooming into the first phase
function InitialViewportSetter() {
  const { fitView } = useReactFlow();

  useEffect(() => {
    // We focus on the Phase 1 nodes so it feels like starting at the top of a page, not a zoomed-out map.
    const timer = setTimeout(() => {
      fitView({ 
        nodes: [{ id: '1-1' }, { id: '1-2' }, { id: '1-3' }], 
        padding: 0.2, 
        maxZoom: 1, 
        duration: 1000 
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [fitView]);

  return null;
}

function RoadmapFlow() {
  const storeNodes = useRoadmapStore((state) => state.nodes);
  const storeEdges = useRoadmapStore((state) => state.edges);
  const setSelectedNode = useRoadmapStore((state) => state.setSelectedNode);
  const setDrawerOpen = useRoadmapStore((state) => state.setDrawerOpen);

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  // Sync state from zustand to reactflow local state whenever store changes
  useMemo(() => {
    setNodes(storeNodes);
    setEdges(storeEdges);
  }, [storeNodes, storeEdges, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: RoadmapNode) => {
      // Allow clicking if unlocked or completed
      if (node.data.status !== 'locked') {
        setSelectedNode(node);
        setDrawerOpen(true);
      }
    },
    [setSelectedNode, setDrawerOpen]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      minZoom={0.3}
      maxZoom={1.5}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={true}
      className="touch-none"
      panOnScroll={true}
      zoomOnPinch={true}
      panOnDrag={true}
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={20} color="#cbd5e1" variant={BackgroundVariant.Dots} />
      <Controls showInteractive={false} className="dark:bg-zinc-800 dark:border-zinc-700" />
      <InitialViewportSetter />
    </ReactFlow>
  );
}

// Wrapper necessary to use the ReactFlow hooks inside (like fitView)
export function RoadmapCanvas() {
  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-950">
      <ReactFlowProvider>
        <RoadmapFlow />
      </ReactFlowProvider>
    </div>
  );
}
