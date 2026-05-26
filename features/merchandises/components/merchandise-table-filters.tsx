import { Search } from "lucide-react";

type MerchandiseTableFiltersProps = {
  search?: string;
};

export function MerchandiseTableFilters({
  search = "",
}: MerchandiseTableFiltersProps) {
  return (
    <form
      action="/dashboard"
      className="flex w-full flex-col gap-3 sm:max-w-md"
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="search"
          name="q"
          defaultValue={search}
          placeholder="Buscar por código ou destinatário..."
          className="h-10 w-full rounded-md border border-border bg-card pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </div>

      <input type="hidden" name="page" value="1" />
    </form>
  );
}
