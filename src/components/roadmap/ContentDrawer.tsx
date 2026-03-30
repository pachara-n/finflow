'use client';

import { useEffect, useState } from 'react';
import { useRoadmapStore } from '@/store/useRoadmapStore';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Optional components (will render if data.interactiveType matches)
import { DCASimulator } from '@/components/interactive/DCASimulator';
import { EmergencyFundCalculator } from '@/components/interactive/EmergencyFundCalculator';

export function ContentDrawer() {
  const isDrawerOpen = useRoadmapStore((state) => state.isDrawerOpen);
  const selectedNode = useRoadmapStore((state) => state.selectedNode);
  const setDrawerOpen = useRoadmapStore((state) => state.setDrawerOpen);
  const markNodeAsCompleted = useRoadmapStore((state) => state.markNodeAsCompleted);

  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isDrawerOpen && selectedNode?.data.contentFile) {
      setIsLoading(true);
      fetch(`/content/${selectedNode.data.contentFile}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load');
          return res.text();
        })
        .then((text) => setMarkdownContent(text))
        .catch(() => setMarkdownContent('ขออภัย เนื้อหาไฟล์นี้ไม่พร้อมใช้งาน (File not found or network error)'))
        .finally(() => setIsLoading(false));
    } else {
      setMarkdownContent('');
    }
  }, [isDrawerOpen, selectedNode]);

  if (!selectedNode) return null;

  const handleMarkAsDone = () => {
    markNodeAsCompleted(selectedNode.id);
    setDrawerOpen(false);
  };

  const interactiveType = selectedNode.data.interactiveType;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto outline-none">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">{selectedNode.data.label}</SheetTitle>
          <SheetDescription>
            {selectedNode.data.status === 'completed'
              ? 'คุณเรียนรู้เรื่องนี้จบแล้ว ทบทวนได้เสมอ'
              : 'อ่านเนื้อหานี้เพื่อปลดล็อกขั้นต่อไป'}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-20">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-xl prose-a:text-emerald-600">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          )}

          {/* Interactive Calculator Rendering */}
          {!isLoading && interactiveType === 'EmergencyFundCalculator' && (
            <EmergencyFundCalculator />
          )}
          {!isLoading && interactiveType === 'DCASimulator' && (
            <DCASimulator />
          )}

          <div className="pt-8">
            <Button
              onClick={handleMarkAsDone}
              className="w-full text-lg h-12 bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={selectedNode.data.status === 'completed' || isLoading}
            >
              {selectedNode.data.status === 'completed' ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" /> สำเร็จแล้ว
                </>
              ) : (
                'อ่านจบแล้ว (Mark as Done)'
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
