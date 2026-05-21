import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  Clock3,
  FileText,
  ImageIcon,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";

import { MerchandiseConditionBadge } from "@/features/merchandises/components/merchandise-condition-badge";
import { MerchandiseDetailItem } from "@/features/merchandises/components/merchandise-detail-item";
import { MerchandiseStatusBadge } from "@/features/merchandises/components/merchandise-status-badge";
import { getMerchandiseById } from "@/features/merchandises/data/get-merchandise-by-id";
import { merchandiseConditionLabels } from "@/features/merchandises/constants/merchandise-condition";
import { merchandiseStatusLabels } from "@/features/merchandises/constants/merchandise-status";

import type { MerchandiseCondition } from "@/lib/generated/prisma/client";

function formatCondition(condition?: MerchandiseCondition | null) {
  if (!condition) {
    return "Não informada";
  }

  return merchandiseConditionLabels[condition];
}

type MerchandiseDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date?: Date | null) {
  if (!date) {
    return "Não informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function getPhotoTypeLabel(type: string) {
  const labels: Record<string, string> = {
    GENERAL: "Foto geral",
    PACKAGE_PROOF: "Comprovação da embalagem",
    DAMAGE_PROOF: "Comprovação de dano",
    DELIVERY_PROOF: "Comprovação de entrega",
  };

  return labels[type] ?? "Foto";
}

export default async function MerchandiseDetailsPage({
  params,
}: MerchandiseDetailsPageProps) {
  const { id } = await params;

  const merchandise = await getMerchandiseById(id);

  if (!merchandise) {
    notFound();
  }

  const mainPhoto = merchandise.photos[0];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Voltar para dashboard
          </Link>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Package className="size-6" />
            </div>

            <div>
              <p className="text-sm font-medium text-primary">
                Detalhes da mercadoria
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {merchandise.code}
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Visualize todas as informações cadastradas sobre a mercadoria,
            incluindo status, condição, foto, destinatário, observações e
            histórico.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <MerchandiseStatusBadge status={merchandise.status} />
          <MerchandiseConditionBadge condition={merchandise.condition} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-md border border-border bg-card p-4 shadow-card sm:p-6">
            <div className="border-b border-border pb-4">
              <h2 className="text-base font-semibold text-foreground">
                Informações principais
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Dados básicos usados para identificação e acompanhamento da
                entrega.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <MerchandiseDetailItem label="Código" value={merchandise.code} />

              <MerchandiseDetailItem
                label="Descrição"
                value={merchandise.description}
              />

              <MerchandiseDetailItem
                label="Status"
                value={merchandiseStatusLabels[merchandise.status]}
              />

              <MerchandiseDetailItem
                label="Condição"
                value={merchandiseConditionLabels[merchandise.condition]}
              />

              <MerchandiseDetailItem
                label="Recebida em"
                value={formatDate(merchandise.receivedAt)}
              />

              <MerchandiseDetailItem
                label="Entregue em"
                value={formatDate(merchandise.deliveredAt)}
              />

              <MerchandiseDetailItem
                label="Criada em"
                value={formatDate(merchandise.createdAt)}
              />

              <MerchandiseDetailItem
                label="Última atualização"
                value={formatDate(merchandise.updatedAt)}
              />
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-4 shadow-card sm:p-6">
            <div className="border-b border-border pb-4">
              <h2 className="text-base font-semibold text-foreground">
                Destinatário e entrega
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Informações relacionadas à pessoa ou local de entrega.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="size-4" />
                  <p className="text-xs font-medium uppercase tracking-wide">
                    Destinatário
                  </p>
                </div>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {merchandise.recipientName || "Não informado"}
                </p>
              </div>

              <div className="rounded-md border border-border bg-background p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" />
                  <p className="text-xs font-medium uppercase tracking-wide">
                    Telefone
                  </p>
                </div>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {merchandise.recipientPhone || "Não informado"}
                </p>
              </div>

              <div className="rounded-md border border-border bg-background p-4  ">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  <p className="text-xs font-medium uppercase tracking-wide">
                    Endereço
                  </p>
                </div>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {merchandise.deliveryAddress || "Não informado"}
                </p>
              </div>

              <MerchandiseDetailItem
                label="Região de entrega"
                value={merchandise.deliveryRegion}
              />
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-4 shadow-card sm:p-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <FileText className="size-4 text-primary" />

              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Observações
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Detalhes adicionais registrados sobre a mercadoria.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-md border border-border bg-background p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
                {merchandise.notes || "Nenhuma observação cadastrada."}
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-md border border-border bg-card p-4 shadow-card sm:p-6">
            <div className="border-b border-border pb-4">
              <h2 className="text-base font-semibold text-foreground">
                Foto da mercadoria
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Imagem cadastrada para comprovação visual.
              </p>
            </div>

            <div className="mt-6">
              {mainPhoto ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-md border border-border bg-muted">
                    <img
                      src={mainPhoto.url}
                      alt={`Foto da mercadoria ${merchandise.code}`}
                      className="aspect-video w-full object-cover"
                    />
                  </div>

                  <div className="rounded-md border border-border bg-background p-3">
                    <p className="text-sm font-medium text-foreground">
                      {getPhotoTypeLabel(mainPhoto.type)}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Enviada em {formatDate(mainPhoto.createdAt)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-52 flex-col items-center justify-center rounded-md border border-dashed border-border bg-background p-6 text-center">
                  <div className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <ImageIcon className="size-6" />
                  </div>

                  <p className="mt-4 text-sm font-medium text-foreground">
                    Nenhuma imagem cadastrada.
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Esta mercadoria ainda não possui foto de comprovação.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-4 shadow-card sm:p-6">
            <div className="border-b border-border pb-4">
              <h2 className="text-base font-semibold text-foreground">
                Registro
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Informações de criação do cadastro.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-md border border-border bg-background p-3">
                <User className="mt-0.5 size-4 text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Cadastrada por
                  </p>

                  <p className="text-sm font-medium text-foreground">
                    {merchandise.createdBy.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {merchandise.createdBy.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-md border border-border bg-background p-3">
                <CalendarClock className="mt-0.5 size-4 text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Data de cadastro
                  </p>

                  <p className="text-sm font-medium text-foreground">
                    {formatDate(merchandise.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-md border border-border bg-card p-4 shadow-card sm:p-6">
        <div className="border-b border-border pb-4">
          <h2 className="text-base font-semibold text-foreground">Histórico</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Alterações registradas durante o ciclo da mercadoria.
          </p>
        </div>

        <div className="mt-6">
          {merchandise.history.length > 0 ? (
            <div className="space-y-3">
              {merchandise.history.map((history) => (
                <div
                  key={history.id}
                  className="flex gap-3 rounded-md border border-border bg-background p-4"
                >
                  <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Clock3 className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-semibold text-foreground">
                        Status:{" "}
                        {history.previousStatus
                          ? `${merchandiseStatusLabels[history.previousStatus]} → ${merchandiseStatusLabels[history.newStatus]}`
                          : merchandiseStatusLabels[history.newStatus]}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {formatDate(history.createdAt)}
                      </p>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Condição:{" "}
                      {history.previousCondition
                        ? `${formatCondition(history.previousCondition)} → ${formatCondition(history.newCondition)}`
                        : formatCondition(history.newCondition)}
                    </p>

                    {history.note && (
                      <p className="mt-3 rounded-md bg-muted px-3 py-2 text-sm text-foreground">
                        {history.note}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-muted-foreground">
                      Alterado por:{" "}
                      {history.changedBy
                        ? `${history.changedBy.name} (${history.changedBy.email})`
                        : "Usuário não informado"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-border bg-background p-8 text-center">
              <p className="text-sm font-medium text-foreground">
                Nenhum histórico registrado.
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                As alterações futuras da mercadoria aparecerão aqui.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
