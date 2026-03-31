# 💰 FinFlow — Investment Roadmap for Beginners

> Interactive learning roadmap สำหรับคนที่อยากเริ่มต้นจัดการเงินและลงทุนอย่างมีระบบ

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React Flow](https://img.shields.io/badge/React_Flow-Graph_Based-blue)](https://reactflow.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Overview

**FinFlow** คือเว็บแอปพลิเคชันที่รวบรวมความรู้ด้านการเงินและการลงทุนสำหรับมือใหม่ไว้ในรูปแบบ **Interactive Roadmap** ที่อ่านง่ายและเรียนรู้ได้ตามลำดับขั้น ตั้งแต่พื้นฐานการจัดการเงิน ไปจนถึงกลยุทธ์การลงทุนระยะยาว

### 🎯 เหมาะสำหรับ

- คนทำงานรุ่นใหม่ที่อยากเริ่มลงทุน
- นักศึกษาจบใหม่ที่อยากจัดการเงินเป็นระบบ
- ใครก็ตามที่สนใจแนวคิด FIRE (Financial Independence, Retire Early)

---

## 📚 Curriculum (4 Phases, 15 Topics)

| Phase | หัวข้อ | เนื้อหา |
|---|---|---|
| **1. วางรากฐาน** | ทำไมต้องลงทุน? · Cash Flow · FIRE Concept · เงินสำรองฉุกเฉิน | ทำความเข้าใจเงินเฟ้อ, สุขภาพการเงิน, กฎ 4%, Split Strategy |
| **2. รู้จักเครื่องมือ** | หุ้นคืออะไร? · ผลตอบแทน · Index Fund · ดอกเบี้ยทบต้น | S&P 500, Nasdaq, VT, VXUS, Compound Interest |
| **3. กลยุทธ์** | DCA · Growth vs Dividend · Common-Sense Investing | Dollar Cost Averaging, Business Moat, Pricing Power |
| **4. เร่งเครื่อง** | Side Hustles · Lifestyle Inflation · ลงทุนในตัวเอง | รายได้เสริม, กับดักรายจ่าย, Specialist vs Generalist |

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | App Router, SSR, SEO |
| [React Flow](https://reactflow.dev/) | Interactive graph-based roadmap (Desktop) |
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight state management with persistence |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible UI components (Sheet, Badge, Progress) |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Rich content rendering from `.md` files |
| [IBM Plex Sans Thai](https://fonts.google.com/specimen/IBM+Plex+Sans+Thai) | Typography |

---

## 📱 Responsive Design

FinFlow ใช้ระบบ **Dual Layout** สำหรับ Roadmap:

- **Desktop (≥768px):** แสดงเป็น Interactive Graph Canvas ด้วย React Flow พร้อม Phase Headers และ Edge Connections
- **Mobile (<768px):** สลับเป็น Vertical Card Layout อัตโนมัติ เรียงตามเฟส อ่านง่าย ไม่ต้องซูม

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/pachara-n/finflow.git
cd finflow

# Install dependencies
npm install

# Start development server
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

### Build for Production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
finflow/
├── public/
│   └── content/          # Markdown lesson files (1-1 to 4-3)
├── src/
│   ├── app/
│   │   ├── page.tsx      # Main page
│   │   ├── layout.tsx    # Global layout, SEO metadata
│   │   ├── icon.svg      # Custom FF favicon
│   │   ├── robots.ts     # SEO robots.txt
│   │   └── sitemap.ts    # SEO sitemap.xml
│   ├── components/
│   │   ├── layout/       # Header, HeroSection, ResourceSection, Footer
│   │   ├── roadmap/      # RoadmapCanvas, MobileRoadmap, RoadmapSection,
│   │   │                 # CustomNode, PhaseHeaderNode, ContentDrawer
│   │   ├── interactive/  # DCASimulator, EmergencyFundCalculator
│   │   └── ui/           # shadcn/ui components
│   ├── store/
│   │   └── useRoadmapStore.ts  # Zustand store (nodes, edges, progress)
│   └── types/
│       └── roadmap.ts    # TypeScript interfaces
└── package.json
```

---

## ⚠️ Disclaimer

> ข้อมูลและเนื้อหาทั้งหมดบนเว็บไซต์จัดทำขึ้นเพื่อการศึกษาพื้นฐานเท่านั้น ไม่ใช่การให้คำแนะนำเฉพาะเจาะจงทางการเงินหรือเชิญชวนให้ลงทุน ผลการดำเนินงานทางการเงินในอดีตไม่ได้เป็นสิ่งยืนยันหรือรับประกันผลตอบแทนในอนาคต การลงทุนมีความเสี่ยง ผู้ลงทุนควรศึกษาข้อมูลและประเมินความเสี่ยงด้วยตนเองก่อนตัดสินใจลงทุนทุกครั้ง
