import Link from "next/link";
import { PackageX } from "lucide-react";

export default function MerchandiseNotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-md border border-border bg-card p-6 text-center shadow-card">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
          <PackageX className="size-6" />
        </div>

        <h1 className="mt-4 text-xl font-semibold text-foreground">
          Mercadoria não encontrada
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          A mercadoria solicitada não existe, foi removida ou está arquivada.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Voltar para dashboard
        </Link>
      </div>
    </div>
  );
}
