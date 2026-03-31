import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FinFlow — แผนที่นำทางนักลงทุนมือใหม่',
    short_name: 'FinFlow',
    description:
      'Roadmap การเงินและการลงทุนสำหรับผู้เริ่มต้น เรียนรู้เป็นลำดับและติดตามความคืบหน้าได้ในหน้าเดียว',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
