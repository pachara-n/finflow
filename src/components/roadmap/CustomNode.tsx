import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle2, BookOpen } from 'lucide-react';
import type { NodeProps } from '@xyflow/react';
import type { NodeData } from '@/types/roadmap';

export const CustomNode = memo(({ data }: NodeProps) => {
  const nodeData = data as NodeData;
  const isCompleted = nodeData.status === 'completed';

  const containerClass = [
    'flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all cursor-pointer relative',
    isCompleted
      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-500/60 dark:text-emerald-300 hover:border-emerald-500'
      : 'bg-white border-zinc-300 text-zinc-800 shadow-sm hover:border-zinc-600 hover:shadow-md dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-400',
  ].join(' ');

  return (
    <div className={containerClass} style={{ width: 200 }}>
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-zinc-300 dark:!bg-zinc-600 !border-0" />

      <div className="flex-shrink-0 mt-0.5">
        {isCompleted
          ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          : <BookOpen className="w-4 h-4 opacity-50" />
        }
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-snug">{nodeData.label}</p>
        {nodeData.description && (
          <p className="text-xs mt-1 opacity-55 leading-relaxed">{nodeData.description}</p>
        )}
        {isCompleted && (
          <p className="text-xs mt-1.5 font-medium text-emerald-600 dark:text-emerald-400">เสร็จแล้ว</p>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-zinc-300 dark:!bg-zinc-600 !border-0" />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
