import type { ReactNode } from "react";

type MetricCardProps = {
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
};

export function MetricCard({
  title,
  value,
  description,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-md border border-border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <strong className="mt-2 block text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </strong>
        </div>

        <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
