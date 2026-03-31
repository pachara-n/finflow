import type { Metadata } from 'next';
import { IBM_Plex_Sans_Thai, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const plexSansThai = IBM_Plex_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-plex-sans-thai',
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://finflow.pachara.app/'),
  title: "FinFlow — แผนที่นำทางนักลงทุนมือใหม่",
  description: "Roadmap การเงินที่เข้าใจง่ายที่สุด สำหรับคนที่อยากเริ่มลงทุนแต่ไม่รู้จะเริ่มตรงไหน ตั้งแต่พื้นฐานเงินเฟ้อไปจนถึงการปั้นพอร์ตด้วย DCA และ Index Fund",
  keywords: ["การเงิน", "ลงทุน", "Roadmap", "เกษียณรวย", "DCA", "หุ้น", "กองทุนดัชนี", "FIRE", "Financial Excellence"],
  authors: [{ name: "FinFlow Project" }],
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinFlow — แผนที่นำทางนักลงทุนมือใหม่',
    description:
      'เริ่มต้นวางแผนการเงินและการลงทุนด้วย Roadmap ที่เข้าใจง่ายสำหรับมือใหม่',
    images: ['/opengraph-image'],
  },
  openGraph: {
    title: "FinFlow — เริ่มต้นลงทุนอย่างถูกวิธีด้วย Roadmap ที่เข้าใจง่าย",
    description: "เปลี่ยนเรื่องการเงินที่ดูยาก ให้กลายเป็นแผนที่เดินทางที่ใครๆ ก็ทำตามได้",
    type: "website",
    locale: "th_TH",
    url: '/',
    siteName: 'FinFlow',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'FinFlow — แผนที่นำทางนักลงทุนมือใหม่',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={`${plexSansThai.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
