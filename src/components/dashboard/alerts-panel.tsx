import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

import { type Alert, getActiveAlerts } from "@/src/lib/mock-data";
import { cn } from "@/src/lib/utils";

const severityStyle: Record<Alert["severity"], string> = {
  CRITICAL: "border-l-destructive",
  WARNING: "border-l-chart-4",
  INFO: "border-l-chart-2",
};

export function AlertsPanel() {
  const alerts = getActiveAlerts();

  return (
    <section className="space-y-3">
      <header className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <h2 className="font-display text-xl">Needs Attention</h2>
        <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {alerts.length}
        </span>
      </header>

      {alerts.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          All caught up. Nothing urgent right now.
        </div>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className={cn(
                "flex flex-col gap-3 rounded-[var(--radius-md)] border border-border border-l-4 bg-card p-4 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between",
                severityStyle[alert.severity],
              )}
            >
              <div className="min-w-0">
                <div className="font-medium text-foreground">{alert.title}</div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
              <Link
                href={alert.actionHref}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {alert.actionLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
