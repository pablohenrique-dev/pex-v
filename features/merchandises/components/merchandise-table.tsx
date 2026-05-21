import Link from "next/link";
import type {
  MerchandiseCondition,
  MerchandiseStatus,
} from "@/lib/generated/prisma/client";

import { MerchandiseStatusBadge } from "./merchandise-status-badge";

type MerchandiseTableItem = {
  id: string;
  code: string;
  description: string;
  recipientName: string | null;
  status: MerchandiseStatus;
  condition: MerchandiseCondition;
  receivedAt: Date;
  deliveredAt: Date | null;
  createdAt: Date;
};

type MerchandiseTableProps = {
  merchandises: MerchandiseTableItem[];
};

export function MerchandiseTable({ merchandises }: MerchandiseTableProps) {
  if (merchandises.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-card p-8 text-center">
        <p className="text-sm font-medium text-foreground">
          Nenhuma mercadoria cadastrada.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Cadastre a primeira mercadoria para começar o controle.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Código
              </th>
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Mercadoria
              </th>
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Destinatário
              </th>
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Recebida em
              </th>
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Ação
              </th>
            </tr>
          </thead>

          <tbody>
            {merchandises.map((merchandise) => (
              <tr
                key={merchandise.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30"
              >
                <td className="px-4 py-4 font-medium text-foreground">
                  {merchandise.code}
                </td>

                <td className="px-4 py-4">
                  <p className="font-medium text-foreground">
                    {merchandise.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Condição: {merchandise.condition}
                  </p>
                </td>

                <td className="px-4 py-4 text-muted-foreground">
                  {merchandise.recipientName ?? "Não informado"}
                </td>

                <td className="px-4 py-4">
                  <MerchandiseStatusBadge status={merchandise.status} />
                </td>

                <td className="px-4 py-4 text-muted-foreground">
                  {new Intl.DateTimeFormat("pt-BR").format(
                    merchandise.receivedAt,
                  )}
                </td>

                <td className="px-4 py-4">
                  <Link
                    href={`/mercadorias/${merchandise.id}`}
                    className="font-medium text-primary transition hover:text-primary/80"
                  >
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
