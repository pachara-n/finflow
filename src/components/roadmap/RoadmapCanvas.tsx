'use client';

import { useMemo, useCallback, useEffect, useState } from 'react';
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
import { useTheme } from 'next-themes';

import { useRoadmapStore } from '@/store/useRoadmapStore';
import { CustomNode } from './CustomNode';
import { PhaseHeaderNode } from './PhaseHeaderNode';
import type { RoadmapNode } from '@/types/roadmap';

const nodeTypes = {
  custom: CustomNode,
  'phase-header': PhaseHeaderNode,
};

function InitialViewportSetter() {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({
        nodes: [{ id: 'ph-1' }, { id: '1-1' }, { id: '1-2' }, { id: '1-3' }],
        padding: 0.3,
        maxZoom: 1,
        duration: 800,
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [fitView]);

  return null;
}

function RoadmapFlow() {
  const { resolvedTheme } = useTheme();
  const storeNodes = useRoadmapStore((state) => state.nodes);
  const storeEdges = useRoadmapStore((state) => state.edges);
  const setSelectedNode = useRoadmapStore((state) => state.setSelectedNode);
  const setDrawerOpen = useRoadmapStore((state) => state.setDrawerOpen);

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  useMemo(() => {
    setNodes(storeNodes);
    setEdges(storeEdges);
  }, [storeNodes, storeEdges, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: RoadmapNode) => {
      if (node.type === 'custom') {
        setSelectedNode(node);
        setDrawerOpen(true);
      }
    },
    [setSelectedNode, setDrawerOpen]
  );

  return (
    <ReactFlow
      colorMode={resolvedTheme === 'dark' ? 'dark' : 'light'}
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
      elementsSelectable={false}
      className="touch-none"
      panOnScroll={true}
      zoomOnPinch={true}
      panOnDrag={true}
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={24} color="#d4d4d8" variant={BackgroundVariant.Dots} />
      <Controls showInteractive={false} />
      <InitialViewportSetter />
    </ReactFlow>
  );
}

export function RoadmapCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-zinc-50 dark:bg-zinc-950" />;
  }

  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-950">
      <ReactFlowProvider>
        <RoadmapFlow />
      </ReactFlowProvider>
    </div>
  );
}
