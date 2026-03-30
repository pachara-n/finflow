# 📄 Project Requirement Document (PRD): FinFlow
**Project Name:** FinFlow (Interactive Investment Roadmap)
**Description:** Web Application รูปแบบ Interactive Learning Roadmap สำหรับมือใหม่ที่ต้องการศึกษาด้านการเงินและการลงทุน นำเสนอในรูปแบบแผนผัง Node-based UI (คล้าย roadmap.sh) พร้อมระบบติดตามความคืบหน้า (Progress Tracking)
**Target Platform:** Web Browser (Desktop First, Responsive on Mobile)

---

## 1. Tech Stack & Core Libraries
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** `shadcn/ui` (ต้องการใช้งาน: `Sheet` สำหรับ Drawer, `Progress` สำหรับหลอดความคืบหน้า, `Button`, `Badge`, `Card`)
* **Interactive Map:** `@xyflow/react` (React Flow)
* **State Management:** `zustand` (ใช้งานร่วมกับ `persist` middleware สำหรับบันทึกลง LocalStorage)
* **Markdown Parser:** `react-markdown` (พร้อม `remark-gfm` สำหรับเรนเดอร์เนื้อหา)
* **Icons:** `lucide-react`

---

## 2. System Architecture & UI Layout
แอปพลิเคชันจะเป็น Single Page Application (SPA) ที่ประกอบด้วย 3 ส่วนหลัก:

1. **Top Navigation (Header):**
   * แสดง Logo / ชื่อโปรเจ็กต์ฝั่งซ้าย
   * ตรงกลางแสดง `Progress Bar` คำนวณเปอร์เซ็นต์จากจำนวน Node ที่สถานะเป็น `completed` เทียบกับ Node ทั้งหมด
   * ฝั่งขวามีปุ่ม Theme Toggle (Light/Dark)

2. **Main Canvas (`@xyflow/react`):**
   * พื้นที่หลักเต็มหน้าจอ (100vh - Header)
   * แสดง Custom Nodes ที่บรรจุหัวข้อความรู้
   * มีปุ่มควบคุมแคนวาส (Zoom in/out, Fit View) จาก React Flow
   * **Node UI:** ควรมี Icon, ชื่อหัวข้อ, และ Badge แสดงสถานะ (`locked`, `unlocked`, `completed`)

3. **Content Drawer (`shadcn/Sheet`):**
   * เลื่อนออกมาจากฝั่งขวาเมื่อผู้ใช้คลิกที่ Node ที่มีสถานะ `unlocked` หรือ `completed`
   * แสดงชื่อหัวข้อ (Title) และเนื้อหาที่ถูกเรนเดอร์จาก Markdown
   * ด้านล่างสุดมีปุ่ม Action: **"Mark as Done"** (ถ้ากดแล้วให้เปลี่ยนสถานะ Node เป็น `completed` ปิด Drawer และปลดล็อก Node ถัดไป)

---

## 3. Data Flow & State Logic (Zustand)
ต้องมีระบบ State Management เพื่อจัดการสถานะของแผนผัง ดังนี้:

**Node Status Logic:**
* `locked`: ผู้ใช้ยังคลิกดูเนื้อหาไม่ได้ (เป็นสีเทา)
* `unlocked`: ผู้ใช้คลิกดูเนื้อหาได้ (เป็นสีปกติ)
* `completed`: ผู้ใช้กด Mark as Done แล้ว (เป็นสีเขียว/สีสว่าง)
* *Rule:* Node แรกสุดจะต้องเป็น `unlocked` เสมอ เมื่อ Node ปัจจุบันถูกเปลี่ยนเป็น `completed` ให้เปลี่ยนสถานะ Node ปลายทางที่เชื่อมต่อกัน (ผ่าน Edges) ให้เป็น `unlocked` โดยอัตโนมัติ

**TypeScript Interfaces:**
```typescript
type NodeStatus = 'locked' | 'unlocked' | 'completed';

interface NodeData {
  label: string;
  description: string;
  content: string; // Markdown text
  status: NodeStatus;
}

interface RoadmapState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNode: Node<NodeData> | null;
  isDrawerOpen: boolean;
  
  // Actions
  setSelectedNode: (node: Node<NodeData> | null) => void;
  setDrawerOpen: (isOpen: boolean) => void;
  markNodeAsCompleted: (nodeId: string) => void;
  getProgressPercentage: () => number;
}
```

---

## 4. Initial Mock Data (สำหรับทดสอบระบบ)
ให้ AI ใช้ข้อมูลนี้เป็น Default State ใน Zustand Store เพื่อให้วาดแผนผังได้ทันที:

**Nodes:**
* `id: '1', position: { x: 250, y: 50 }, data: { label: 'ทำไมต้องลงทุน?', status: 'unlocked', content: '## พลังของเวลา\nเงินเฟ้อทำให้มูลค่าเงินลดลง การลงทุนคือการเอาชนะเงินเฟ้อ...' }`
* `id: '2', position: { x: 250, y: 200 }, data: { label: 'สำรวจสุขภาพการเงิน', status: 'locked', content: '## เช็คความมั่งคั่ง\nก่อนลงทุนต้องรู้ว่าตัวเองมีสินทรัพย์และหนี้สินเท่าไหร่...' }`
* `id: '3', position: { x: 250, y: 350 }, data: { label: 'จัดการหนี้สิน', status: 'locked', content: '## หนี้ดี vs หนี้เลว\nเคลียร์หนี้ดอกเบี้ยสูงก่อนเสมอ...' }`

**Edges:**
* `id: 'e1-2', source: '1', target: '2'`
* `id: 'e2-3', source: '2', target: '3'`

---

## 5. Development Phases (Instruction for AI)
กรุณาดำเนินการสร้างโปรเจ็กต์ตามสเต็ปต่อไปนี้อย่างเคร่งครัด:

* **Phase 1: Project Scaffolding & Dependencies**
  * สร้างโครงสร้างโฟลเดอร์ที่จำเป็น (เช่น `components/`, `store/`, `types/`)
  * เพิ่ม `shadcn/ui` components (`sheet`, `progress`, `badge`, `button`)
* **Phase 2: Global Store Implementation**
  * สร้าง `store/useRoadmapStore.ts` ด้วย `zustand` พร้อมใส่ Mock Data และ Logic การปลดล็อก Node ที่กำหนดไว้
* **Phase 3: React Flow Components**
  * สร้าง `components/RoadmapCanvas.tsx`
  * สร้าง Custom Node Component (`components/CustomNode.tsx`) เพื่อให้สามารถแสดงสีตาม Status (`locked`, `unlocked`, `completed`) ได้อย่างสวยงาม
* **Phase 4: Layout & Drawer Integration**
  * สร้าง Header พร้อมเชื่อมต่อ `getProgressPercentage` จาก Store
  * นำ `shadcn/Sheet` มาครอบเพื่อทำ Content Drawer
  * เพิ่มปุ่ม "Mark as Done" ที่ทำงานร่วมกับ `markNodeAsCompleted` ใน Store