"use client";

import { differenceInDays, subMonths, subYears } from "date-fns";

interface PlanProgressProps {
  startDate: string;
  endDate: string;
  billingCycle?: "monthly" | "yearly";
  className?: string;
}

export function PlanProgress({
  startDate,
  endDate,
  billingCycle = "monthly",
  className = "",
}: PlanProgressProps) {
  const progressValue = (() => {
    const end = new Date(endDate);
    const now = new Date();

    // Calculate start date based on billing cycle
    let start = new Date(startDate);

    // If start date is far in the past, calculate the current cycle start
    if (start < subMonths(end, billingCycle === "yearly" ? 12 : 1)) {
      if (billingCycle === "yearly") {
        start = subYears(end, 1);
      } else {
        start = subMonths(end, 1);
      }
    }

    const total = differenceInDays(end, start);
    const elapsed = differenceInDays(now, start);
    const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
    return progress;
  })();

  
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-300 ${className}`}>
      <div
        className="h-full bg-slate-950 transition-all"
        style={{ width: `${progressValue}%` }}
      />
    </div>
  );
}
