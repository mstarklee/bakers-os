import { Plus } from "lucide-react";

import { mockUser } from "@/src/lib/mock-data";

export function WelcomeHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-3xl md:text-4xl">
          Welcome to your Kitchen, {mockUser.name}!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s cooking today, Chef.
        </p>
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-2 self-start rounded-md bg-chart-4/80 px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-chart-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Plus className="h-4 w-4" />
        New Order
      </button>
    </div>
  );
}
