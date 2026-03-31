'use client';

import { ExternalLink, Play } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Channel {
  name: string;
  url: string;
}

const channels: Channel[] = [
  { name: 'SundayBoyInvest', url: 'https://www.youtube.com/@SundayboyInvest' },
  { name: 'Invest Hub', url: 'https://www.youtube.com/channel/UC4hG54NVWQjT1PbwnNkpL3Q' },
  { name: 'Paul Pattarapon', url: 'https://www.youtube.com/@PaulPattarapon' },
  { name: 'THE MONEY COACH', url: 'https://www.youtube.com/@THEMONEYCOACHTH/' },
  { name: 'THE MONEY GAME by Tanin Kunkamedee', url: 'https://www.youtube.com/@THEMONEYGAMEbyTaninKunkamedee' },
  { name: 'ลงทุน Diary', url: 'https://www.youtube.com/@ลงทุนDiary' },
  { name: 'ลงทุนหุ้นอเมริกา', url: 'https://www.youtube.com/@Thaiusinvest' },
  { name: 'Bizwithturb', url: 'https://www.youtube.com/@Bizwithturb' },
  { name: 'The Dam Investor', url: 'https://www.youtube.com/@TheDamInvestor2025' },
  { name: 'Nack Siwakorn', url: 'https://www.youtube.com/@NackSiwakorn' },
  { name: 'THE STANDARD WEALTH', url: 'https://www.youtube.com/@TheStandardWealth' },
];

export function ResourceSection() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: listRef, isInView: listInView } = useInView();

  return (
    <section id="resources-section" className="w-full bg-zinc-900/40 border-t border-zinc-800/50 pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className={`mb-16 transition-all ${headerInView ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-400/80 mb-3">
            Curated by Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            ช่อง YouTube ที่ติดตาม
          </h2>
          <p className="text-zinc-500 text-sm max-w-md leading-relaxed">
            รวมช่องที่ฟังมาจริงและได้ความรู้กลับไปใช้ได้จริง 
          </p>
        </div>

        {/* Channel List */}
        <div ref={listRef} className={`grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all ${listInView ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
          {channels.map((ch, i) => (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-5 py-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300"
            >
              {/* Index number */}
              <span className="text-[13px] font-black text-zinc-700 tabular-nums w-5 text-right select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Divider dot */}
              <div className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-red-500/60 transition-colors" />

              {/* Channel name */}
              <span className="flex-1 text-[15px] font-semibold text-zinc-300 group-hover:text-white transition-colors truncate">
                {ch.name}
              </span>

              {/* Play icon + arrow */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
