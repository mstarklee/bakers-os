import Link from "next/link";
import { ArrowRight, PackageX } from "lucide-react";

import { getLowStockIngredients, ingredients } from "@/src/lib/mock-data";

export function LowStockPanel() {
  const lowStock = getLowStockIngredients();
  const totalItems = ingredients.length;

  return (
    <section className="rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <PackageX className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-display text-lg">Low Stock</h2>
        </div>
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Inventory
          <ArrowRight className="h-3 w-3" />
        </Link>
      </header>

      {lowStock.length === 0 ? (
        <div className="p-6 text-center text-sm text-muted-foreground">
          All {totalItems} ingredients above threshold.
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {lowStock.map((item) => {
            const pct = Math.min(
              100,
              Math.round((item.currentStock / Math.max(item.lowStockThreshold, 1)) * 100),
            );
            return (
              <li key={item.id} className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium">{item.name}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {item.currentStock} {item.unit} / {item.lowStockThreshold} {item.unit}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-destructive"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
