import { useEffect, useRef, useState } from 'react';

/**
 * Hook ที่ใช้ Intersection Observer เพื่อดึง element เข้า viewport
 * ค่อยๆ animate element เมื่อเลื่อนหน้าจอเh้องมา
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // ปิด observer หลังจากกำหนดแล้ว (เพื่อให้ animate เพียงครั้งเดียว)
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isInView };
}
