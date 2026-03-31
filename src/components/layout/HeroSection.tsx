"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useRoadmapStore } from "@/store/useRoadmapStore";

export function HeroSection() {
  useRoadmapStore((state) => state.nodes);

  const getProgressPercentage = useRoadmapStore((state) => state.getProgressPercentage);
  const getCompletedCount = useRoadmapStore((state) => state.getCompletedCount);
  const getTotalCount = useRoadmapStore((state) => state.getTotalCount);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const progress = mounted ? getProgressPercentage() : 0;
  const completed = mounted ? getCompletedCount() : 0;
  const total = mounted ? getTotalCount() : 21;

  return (
    <div className="border-b bg-muted/40 dark:bg-muted/10">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          การเงิน & การลงทุน 101
        </h1>
        <p className="mt-2 text-muted-foreground text-base">
          คู่มือเริ่มต้นสำหรับมือใหม่ที่อยากจัดการเงินและเริ่มลงทุนอย่างเป็นระบบ
        </p>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
          {mounted && progress > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
              {progress}% DONE
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {completed} / {total} หัวข้อเสร็จแล้ว
          </span>
          <div className="sm:ml-auto w-full sm:w-64">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 inline-block"></span>
            เรียนจบแล้ว
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm border-2 border-zinc-400 bg-white dark:bg-zinc-900 dark:border-zinc-500 inline-block"></span>
            ยังไม่ได้เรียน (คลิกเพื่อเปิด)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm border-2 border-dashed border-zinc-400 dark:border-zinc-600 inline-block"></span>
            เส้นทางแนะนำ
          </span>
        </div>
      </div>
    </div>
  );
}
