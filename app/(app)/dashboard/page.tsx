import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Package,
  Plus,
} from "lucide-react";

import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { MetricCard } from "@/features/merchandises/components/metric-card";
import { MerchandiseTable } from "@/features/merchandises/components/merchandise-table";
import { getDashboardData } from "@/features/merchandises/data/get-dashboard-data";
import { getCurrentUser } from "@/lib/current-user";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const { metrics, merchandises } = await getDashboardData();

  return (
    <div className="space-y-6">
      <DashboardHeader
        user={{
          name: currentUser.name,
          email: currentUser.email,
        }}
      />

      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Dashboard
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Resumo geral do controle de mercadorias e entregas.
          </p>
        </div>

        <Link
          href="/mercadorias/nova"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Nova mercadoria
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total de mercadorias"
          value={metrics.totalMerchandises}
          description="Mercadorias registradas no sistema."
          icon={<Package className="size-5" />}
        />

        <MetricCard
          title="Pendentes"
          value={metrics.pendingMerchandises}
          description="Recebidas, separadas ou em rota."
          icon={<Clock3 className="size-5" />}
        />

        <MetricCard
          title="Entregues"
          value={metrics.deliveredMerchandises}
          description="Mercadorias finalizadas com sucesso."
          icon={<CheckCircle2 className="size-5" />}
        />

        <MetricCard
          title="Ocorrências"
          value={metrics.issueMerchandises}
          description="Mercadorias com problema."
          icon={<AlertTriangle className="size-5" />}
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Mercadorias recentes
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Últimos registros cadastrados no sistema.
            </p>
          </div>
        </div>

        <MerchandiseTable merchandises={merchandises} />
      </section>
    </div>
  );
}