import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import {
  type Order,
  type OrderStatus,
  getOrdersByStatus,
} from "@/src/lib/mock-data";
import { cn } from "@/src/lib/utils";

const statusLabel: Record<OrderStatus, string> = {
  NEW: "New",
  CONFIRMED: "Confirmed",
  IN_PRODUCTION: "In Production",
  READY: "Ready",
  DISPATCHED: "Dispatched",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const statusStyle: Record<OrderStatus, string> = {
  NEW: "bg-chart-2/20 text-chart-2",
  CONFIRMED: "bg-chart-3/20 text-chart-3",
  IN_PRODUCTION: "bg-chart-4/20 text-chart-4",
  READY: "bg-chart-5/20 text-chart-5",
  DISPATCHED: "bg-muted text-muted-foreground",
  DELIVERED: "bg-muted text-muted-foreground",
  CANCELLED: "bg-destructive/20 text-destructive",
};

const formatDue = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

export function UpcomingOrders() {
  const upcoming: Order[] = [
    ...getOrdersByStatus("NEW"),
    ...getOrdersByStatus("IN_PRODUCTION"),
    ...getOrdersByStatus("READY"),
  ]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);

  return (
    <section className="rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-display text-lg">Upcoming Orders</h2>
        </div>
        <Link
          href="/orders"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </header>

      <ul className="divide-y divide-border">
        {upcoming.map((order) => (
          <li key={order.id} className="flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">
                {order.items[0]?.productName ?? "Order"}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {order.customerName} · Due {formatDue(order.dueDate)}
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide",
                statusStyle[order.status],
              )}
            >
              {statusLabel[order.status]}
            </span>
          </li>
        ))}
        {upcoming.length === 0 && (
          <li className="p-6 text-center text-sm text-muted-foreground">
            No upcoming orders.
          </li>
        )}
      </ul>
    </section>
  );
}
