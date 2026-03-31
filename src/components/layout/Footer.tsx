'use client';

export function Footer() {
  return (
    <footer className="border-t bg-zinc-950 border-zinc-900/50 py-12">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
        <p className="text-[11px] text-zinc-600 uppercase tracking-[0.2em] font-medium">
          © {new Date().getFullYear()} FinFlow Project.
        </p>
        <div className="max-w-2xl mx-auto pt-6 border-t border-zinc-900/50">
          <p className="text-[12px] text-zinc-500/80 leading-relaxed font-medium">
            Disclaimer: ข้อมูลและเนื้อหาทั้งหมดบนเว็บไซต์จัดทำขึ้นเพื่อการศึกษาพื้นฐานเท่านั้น ไม่ใช่การให้คำแนะนำเฉพาะเจาะจงทางการเงินหรือเชิญชวนให้ลงทุน 
          </p>
          <p className="text-[12px] text-zinc-500/80 leading-relaxed font-bold mt-1">
            "ผลการดำเนินงานทางการเงินในอดีต (Past Performance) ไม่ได้เป็นสิ่งยืนยันหรือรับประกันผลตอบแทนในอนาคต"
          </p>
          <p className="text-[12px] text-zinc-500/80 leading-relaxed font-medium mt-1">
            การลงทุนมีความเสี่ยง ผู้ลงทุนควรศึกษาข้อมูลและประเมินความเสี่ยงด้วยตนเอง หรือปรึกษาผู้เชี่ยวชาญก่อนตัดสินใจลงทุนทุกครั้ง
          </p>
        </div>
      </div>
    </footer>
  );
}
