'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useRoadmapStore } from '@/store/useRoadmapStore';
import { CustomNode } from './CustomNode';
import { PhaseHeaderNode } from './PhaseHeaderNode';
import type { RoadmapNode } from '@/types/roadmap';

const subscribe = () => () => {};

const nodeTypes = {
  custom: CustomNode,
  'phase-header': PhaseHeaderNode,
};

function InitialViewportSetter({ onReady }: { onReady: () => void }) {
  const { setViewport } = useReactFlow();

  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.react-flow__renderer');
      if (container) {
        const width = container.clientWidth;
        const x = (width - 660) / 2;
        setViewport({ x, y: 50, zoom: 1 });
        onReady();
      }
    };

    // Run immediately
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setViewport, onReady]);

  return null;
}

function RoadmapFlow({ onReady }: { onReady: () => void }) {
  const storeNodes = useRoadmapStore((state) => state.nodes);
  const storeEdges = useRoadmapStore((state) => state.edges);
  const setSelectedNode = useRoadmapStore((state) => state.setSelectedNode);
  const setDrawerOpen = useRoadmapStore((state) => state.setDrawerOpen);

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  useEffect(() => {
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
      colorMode="dark"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      minZoom={1}
      maxZoom={1}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      panOnDrag={false}
      panOnScroll={false}
      preventScrolling={false}
      className="bg-background"
      proOptions={{ hideAttribution: true }}
    >
      <InitialViewportSetter onReady={onReady} />
    </ReactFlow>
  );
}

export function RoadmapCanvas() {
  const [isReady, setIsReady] = useState(false);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <div className="w-full h-full bg-background" />;
  }

  return (
    <div 
      className={`w-full h-full bg-background transition-opacity duration-300 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ReactFlowProvider>
        <RoadmapFlow onReady={() => setIsReady(true)} />
      </ReactFlowProvider>
    </div>
  );
}
