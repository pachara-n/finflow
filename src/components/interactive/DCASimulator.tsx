'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DCASimulator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(3000);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);

  // Future Value = P * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)
  // Monthly rate
  const r = expectedReturn / 100 / 12;
  const n = years * 12;
  const futureValue = r === 0 ? (monthlyAmount * n) : (monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const totalInvested = monthlyAmount * n;
  const totalProfit = futureValue - totalInvested;

  return (
    <Card className="my-6 border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20">
      <CardHeader>
        <CardTitle className="text-lg text-blue-800 dark:text-blue-400">
          📈 จำลองการเติบโต DCA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">ลงทุนเดือนละ (บาท)</label>
            <input 
              type="number" 
              value={monthlyAmount} 
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              step="1000"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">ผลตอบแทนเฉลี่ย (%/ปี)</label>
            <input 
              type="number" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block flex justify-between">
            <span>ระยะเวลา (ปี)</span>
            <span className="text-blue-600 dark:text-blue-400">{years} ปี</span>
          </label>
          <input 
            type="range" 
            min="1" 
            max="30" 
            value={years} 
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        
        <div className="pt-4 border-t border-blue-500/10 space-y-2">
           <div className="flex justify-between items-center text-sm">
             <span className="text-muted-foreground">เงินต้นทั้งหมด:</span>
             <span className="font-semibold">฿{totalInvested.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center text-sm">
             <span className="text-muted-foreground">ดอกเบี้ย/กำไรทั้งหมด:</span>
             <span className="font-semibold text-emerald-600 dark:text-emerald-400">+฿{Math.round(totalProfit).toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center pt-2">
             <span className="font-medium text-lg">สรุปเงินรวม:</span>
             <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
               ฿{Math.round(futureValue).toLocaleString()}
             </span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
