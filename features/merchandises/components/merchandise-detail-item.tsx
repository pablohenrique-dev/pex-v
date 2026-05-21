type MerchandiseDetailItemProps = {
  label: string;
  value?: string | null;
};

export function MerchandiseDetailItem({
  label,
  value,
}: MerchandiseDetailItemProps) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-foreground">
        {value || "Não informado"}
      </p>
    </div>
  );
}
