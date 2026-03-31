'use client';

import { useEffect, useState } from 'react';
import { useRoadmapStore } from '@/store/useRoadmapStore';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Calculator, X, ChevronDown, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { DCASimulator } from '@/components/interactive/DCASimulator';
import { EmergencyFundCalculator } from '@/components/interactive/EmergencyFundCalculator';

export function ContentDrawer() {
  const isDrawerOpen = useRoadmapStore((state) => state.isDrawerOpen);
  const selectedNode = useRoadmapStore((state) => state.selectedNode);
  const setDrawerOpen = useRoadmapStore((state) => state.setDrawerOpen);
  const setNodeStatus = useRoadmapStore((state) => state.setNodeStatus);

  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (isDrawerOpen && selectedNode?.data.contentFile) {
      const loadContent = async () => {
        setIsLoading(true);

        try {
          const res = await fetch(`/content/${selectedNode.data.contentFile}`, {
            signal: controller.signal,
          });

          if (!res.ok) throw new Error('Failed to load');

          const text = await res.text();
          setMarkdownContent(text);
        } catch {
          if (!controller.signal.aborted) {
            setMarkdownContent('# ขออภัย\nเนื้อหาไฟล์นี้ไม่พร้อมใช้งาน (File not found or network error)');
          }
        } finally {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        }
      };

      void loadContent();
    } else {
      setMarkdownContent('');
      setIsStatusMenuOpen(false);
    }

    return () => {
      controller.abort();
    };
  }, [isDrawerOpen, selectedNode]);

  if (!selectedNode) return null;

  const currentStatus = selectedNode.data.status || 'unlocked';
  const isCompleted = currentStatus === 'completed';

  const updateStatus = (status: 'unlocked' | 'completed') => {
    setNodeStatus(selectedNode.id, status);
    setIsStatusMenuOpen(false);
  };

  const interactiveType = selectedNode.data.interactiveType;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto outline-none border-l border-zinc-800 bg-zinc-950 p-0 sm:rounded-l-2xl shadow-2xl">
        <div className="sticky top-0 z-20 w-full flex items-center justify-end px-6 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 gap-3">
          <div className="relative">
            <button
              onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
              className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-lg border transition-all text-xs font-bold leading-none ${
                isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-yellow-500'}`}></div>
              <span className="uppercase tracking-wider">{isCompleted ? 'Done' : 'In Progress'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isStatusMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isStatusMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in duration-200">
                <button
                  onClick={() => updateStatus('unlocked')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  In Progress
                </button>
                <button
                  onClick={() => updateStatus('completed')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-800/50 hover:text-emerald-500 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  Done
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-600 hover:text-zinc-300 transition-all border border-transparent hover:border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-8 sm:px-14 py-10 pb-24">
          <header className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest bg-zinc-900 text-zinc-500 border-zinc-800 py-0.5 px-2.5 h-auto">
                Topic Guideline
              </Badge>
            </div>
          </header>

          <main className="space-y-12">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-700">Loading Content</p>
              </div>
            ) : (
              <div className="prose prose-zinc prose-invert max-w-none
                prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-14 prose-h2:border-b prose-h2:border-zinc-900/50 prose-h2:pb-4
                prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-[16px]
                prose-li:text-zinc-400 prose-li:text-[16px]
                prose-strong:text-emerald-400 prose-strong:font-bold
                prose-blockquote:border-emerald-500/30 prose-blockquote:bg-emerald-500/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-6
                prose-hr:border-zinc-900/50">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdownContent}
                </ReactMarkdown>
              </div>
            )}

            {interactiveType && !isLoading && (
              <div className="mt-16 bg-zinc-900/30 rounded-2xl border border-zinc-900 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-none mb-1">Interactive Tool</h3>
                    <p className="text-xs text-zinc-500 italic lowercase">Simulator & Calculator</p>
                  </div>
                </div>

                {interactiveType === 'EmergencyFundCalculator' && <EmergencyFundCalculator />}
                {interactiveType === 'DCASimulator' && <DCASimulator />}
              </div>
            )}
          </main>
        </div>
      </SheetContent>
    </Sheet>
  );
}
