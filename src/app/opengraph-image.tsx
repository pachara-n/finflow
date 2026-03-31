import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FinFlow — แผนที่นำทางนักลงทุนมือใหม่';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 60%, #27272a 100%)',
          color: '#f4f4f5',
          padding: '56px 64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#fafafa',
              color: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 24,
            }}
          >
            FF
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>FinFlow</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 980 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
            แผนที่นำทางนักลงทุนมือใหม่
          </div>
          <div style={{ fontSize: 30, color: '#d4d4d8', lineHeight: 1.3 }}>
            เริ่มวางแผนการเงินและการลงทุนอย่างเป็นระบบ ตั้งแต่พื้นฐานจนถึงการสร้างพอร์ต
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, color: '#a1a1aa' }}>finflow.pachara.app</div>
          <div
            style={{
              fontSize: 22,
              color: '#111827',
              background: '#e4e4e7',
              padding: '8px 14px',
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Investment Roadmap
          </div>
        </div>
      </div>
    ),
    size
  );
}
