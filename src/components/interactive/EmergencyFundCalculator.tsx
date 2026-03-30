'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState<number>(15000);
  const [months, setMonths] = useState<number>(6);

  const total = expenses * months;

  return (
    <Card className="my-6 border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20">
      <CardHeader>
        <CardTitle className="text-lg text-emerald-800 dark:text-emerald-400">
          💸 เครื่องคิดเลขสำรองฉุกเฉิน
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">ค่าใช้จ่ายจำเป็นต่อเดือน (บาท)</label>
          <input 
            type="number" 
            value={expenses} 
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">จำนวนเดือนที่ต้องการสำรอง</label>
          <div className="flex gap-2">
            {[3, 6, 12].map((m) => (
              <Button 
                key={m} 
                variant={months === m ? 'default' : 'outline'}
                className={months === m ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent' : 'bg-background/50 border-emerald-500/20'}
                onClick={() => setMonths(m)}
              >
                {m} เดือน
              </Button>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-emerald-500/10">
          <p className="text-sm text-muted-foreground mb-1">เป้าหมายเงินสำรองขั้นต่ำของคุณ:</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            ฿{total.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
