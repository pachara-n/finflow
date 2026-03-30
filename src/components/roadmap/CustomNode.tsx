import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle2, Lock, BookOpen } from 'lucide-react';
import type { NodeProps } from '@xyflow/react';
import type { RoadmapNode } from '@/types/roadmap';

export const CustomNode = memo(({ data }: NodeProps<RoadmapNode>) => {
  const isLocked = data.status === 'locked';
  const isCompleted = data.status === 'completed';
  const isUnlocked = data.status === 'unlocked';

  let containerClass = 'flex items-center space-x-3 px-4 py-3 rounded-xl border-2 shadow-sm transition-all ';
  
  if (isLocked) {
    containerClass += 'bg-zinc-100 border-zinc-200 text-zinc-400 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-600';
  } else if (isCompleted) {
    containerClass += 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-500/50 dark:text-emerald-400 cursor-pointer hover:bg-emerald-100 hover:dark:bg-emerald-900/40';
  } else if (isUnlocked) {
    containerClass += 'bg-white border-zinc-900 text-zinc-900 shadow-md ring-2 ring-zinc-900/10 dark:bg-zinc-950 dark:border-zinc-100 dark:text-zinc-100 dark:ring-zinc-100/10 cursor-pointer overflow-hidden relative';
  }

  return (
    <div className={containerClass} style={{ width: 280 }}>
      {/* Target handle at the top */}
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-zinc-300 dark:!bg-zinc-700 !border-0" />
      
      <div className="shrink-0 flex items-center justify-center">
        {isLocked && <Lock className="w-5 h-5" />}
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
        {isUnlocked && (
          <div className="relative">
            <BookOpen className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{data.label}</p>
        <p className="text-xs opacity-70 mt-0.5">
          {isLocked ? 'ยังไม่ปลดล็อก' : isCompleted ? 'เรียนจบแล้ว' : 'พร้อมเรียนรู้'}
        </p>
      </div>

      {isUnlocked && (
        <div className="absolute inset-0 border-2 border-transparent animate-pulse rounded-xl pointer-events-none" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
      )}

      {/* Source handle at the bottom */}
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-zinc-300 dark:!bg-zinc-700 !border-0" />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
