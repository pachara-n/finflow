'use client';

import { useRoadmapStore } from '@/store/useRoadmapStore';
import { Progress } from '@/components/ui/progress';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Header() {
  const getProgressPercentage = useRoadmapStore((state) => state.getProgressPercentage);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration fix for progress
  const progress = mounted ? getProgressPercentage() : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4 md:px-8">
        <div className="flex gap-2 items-center mr-4">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold tracking-tighter">
            FF
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">FinFlow</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-12 max-w-2xl mx-auto">
          <div className="w-full flex justify-between text-xs mb-1.5 font-medium text-muted-foreground">
            {mounted ? <span>ความคืบหน้าการลงทุน</span> : <span className="text-transparent">0</span>}
            {mounted ? <span>{progress}%</span> : <span className="text-transparent">0</span>}
          </div>
          {mounted ? (
            <Progress value={progress} className="h-2 w-full" />
          ) : (
            <Progress value={0} className="h-2 w-full opacity-0" />
          )}
        </div>

        <div className="flex items-center justify-end space-x-2 w-24">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
