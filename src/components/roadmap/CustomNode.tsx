import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle2, BookOpen } from 'lucide-react';
import type { NodeProps } from '@xyflow/react';
import type { NodeData } from '@/types/roadmap';
import { useInView } from '@/hooks/useInView';

export const CustomNode = memo(({ data }: NodeProps) => {
  const nodeData = data as NodeData;
  const isCompleted = nodeData.status === 'completed';
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isInView } = useInView();

  const containerClass = [
    'flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all cursor-pointer relative',
    isInView ? 'animate-fade-in-up' : 'opacity-0',
    isHovered ? 'scale-105 shadow-lg' : 'scale-100',
    isCompleted
      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-500/60 dark:text-emerald-300'
      : 'bg-white border-zinc-300 text-zinc-800 shadow-sm dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-200',
    isHovered && isCompleted ? 'border-emerald-600 dark:border-emerald-400 dark:shadow-emerald-500/20' : '',
    isHovered && !isCompleted ? 'border-zinc-500 dark:border-zinc-400 dark:shadow-zinc-500/20' : '',
  ].join(' ');

  return (
    <div 
      ref={ref} 
      className={containerClass} 
      style={{ width: 200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
