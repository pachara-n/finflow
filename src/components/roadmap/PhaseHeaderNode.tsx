import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import type { NodeData } from '@/types/roadmap';

export const PhaseHeaderNode = memo(({ data }: NodeProps) => {
  const nodeData = data as NodeData;
  return (
    <div
      className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-zinc-200 bg-zinc-100 dark:bg-zinc-800/60 dark:border-zinc-700"
      style={{ width: 660 }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center">
        <span className="text-white dark:text-zinc-900 font-bold text-sm">{nodeData.phaseNumber}</span>
      </div>
      <div>
        <p className="font-bold text-base text-zinc-800 dark:text-zinc-100">{nodeData.label}</p>
        {nodeData.description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{nodeData.description}</p>
        )}
      </div>
    </div>
  );
});

PhaseHeaderNode.displayName = 'PhaseHeaderNode';
