import {
  ClipboardList,
  IndianRupee,
  LayoutGrid,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { dashboardMetrics } from "@/src/lib/mock-data";
import { cn } from "@/src/lib/utils";

type Kpi = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: string;
};

const formatRevenue = (value: number) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${Math.round(value / 1000)}K`;
  return `₹${value}`;
};

export function KpiRow() {
  const kpis: Kpi[] = [
    {
      label: "Pending Orders",
      value: String(dashboardMetrics.pendingOrders),
      icon: ClipboardList,
      accent: "bg-chart-3/20 text-chart-3",
    },
    {
      label: "Active Menu",
      value: String(dashboardMetrics.activeMenuItems),
      icon: LayoutGrid,
      accent: "bg-chart-2/20 text-chart-2",
    },
    {
      label: "Revenue (MTD)",
      value: formatRevenue(dashboardMetrics.revenueMTD),
      icon: IndianRupee,
      accent: "bg-chart-4/20 text-chart-4",
    },
    {
      label: "Avg Margin",
      value: `${Math.round(dashboardMetrics.avgMargin * 100)}%`,
      icon: TrendingUp,
      accent: "bg-chart-5/20 text-chart-5",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className="rounded-[var(--radius-lg)] border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {kpi.label}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md",
                  kpi.accent,
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4 font-mono text-3xl tracking-tight text-foreground">
              {kpi.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
