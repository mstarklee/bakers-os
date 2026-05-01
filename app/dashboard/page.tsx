import { AlertsPanel } from "@/src/components/dashboard/alerts-panel";
import { KpiRow } from "@/src/components/dashboard/kpi-row";
import { LowStockPanel } from "@/src/components/dashboard/low-stock-panel";
import { UpcomingOrders } from "@/src/components/dashboard/upcoming-orders";
import { WelcomeHeader } from "@/src/components/dashboard/welcome-header";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <WelcomeHeader />
      <KpiRow />
      <AlertsPanel />

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingOrders />
        <LowStockPanel />
      </div>
    </div>
  );
}
