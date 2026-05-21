"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, PackagePlus } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { ImageFileInput } from "@/components/form/image-file-input";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { createMerchandiseAction } from "../actions/create-merchandise.action";
import { merchandiseConditionOptions } from "../constants/merchandise-condition";
import { merchandiseStatusOptions } from "../constants/merchandise-status";
import {
  CreateMerchandiseInput,
  createMerchandiseSchema,
  MAX_MERCHANDISE_IMAGE_SIZE,
} from "../schemas/create-merchandise.schema";

export function CreateMerchandiseForm() {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<CreateMerchandiseInput>({
    resolver: zodResolver(createMerchandiseSchema),
    defaultValues: {
      code: "",
      description: "",
      recipientName: "",
      recipientPhone: "",
      deliveryAddress: "",
      deliveryRegion: "",
      status: "RECEIVED",
      condition: "NORMAL",
      notes: "",
    },
  });

  function onSubmit(data: CreateMerchandiseInput) {
    const formData = new FormData();

    formData.append("code", data.code);
    formData.append("description", data.description);
    formData.append("recipientName", data.recipientName ?? "");
    formData.append("recipientPhone", data.recipientPhone ?? "");
    formData.append("deliveryAddress", data.deliveryAddress ?? "");
    formData.append("deliveryRegion", data.deliveryRegion ?? "");
    formData.append("status", data.status);
    formData.append("condition", data.condition);
    formData.append("notes", data.notes ?? "");

    if (image) {
      formData.append("image", image);
    }

    startTransition(async () => {
      const result = await createMerchandiseAction(formData);

      if (!result.success) {
        setError("root", {
          message: result.message ?? "Não foi possível cadastrar a mercadoria.",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Voltar para dashboard
          </Link>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Nova mercadoria
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Cadastre uma mercadoria recebida no galpão, adicione observações e,
            se necessário, uma foto para comprovação.
          </p>
        </div>

        <div className="hidden size-12 items-center justify-center rounded-md bg-primary/10 text-primary sm:flex">
          <PackagePlus className="size-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-md border border-border bg-card p-4 shadow-card sm:p-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-base font-semibold text-foreground">
              Informações da mercadoria
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Preencha os dados principais para identificar e acompanhar a
              entrega.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <TextInput
              label="Código da mercadoria"
              placeholder="Ex: ML123456789"
              error={errors.code?.message}
              {...register("code")}
            />

            <TextInput
              label="Descrição"
              placeholder="Ex: Caixa pequena, pacote, envelope..."
              error={errors.description?.message}
              {...register("description")}
            />

            <TextInput
              label="Destinatário"
              placeholder="Nome do destinatário"
              error={errors.recipientName?.message}
              {...register("recipientName")}
            />

            <TextInput
              label="Telefone do destinatário"
              placeholder="Ex: (00) 00000-0000"
              error={errors.recipientPhone?.message}
              {...register("recipientPhone")}
            />

            <TextInput
              label="Endereço de entrega"
              placeholder="Rua, número, bairro..."
              error={errors.deliveryAddress?.message}
              {...register("deliveryAddress")}
            />

            <TextInput
              label="Região de entrega"
              placeholder="Ex: Centro, Zona Norte..."
              error={errors.deliveryRegion?.message}
              {...register("deliveryRegion")}
            />

            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Status</Label>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 rounded-md">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>

                    <SelectContent>
                      {merchandiseStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.status?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="condition"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Condição da mercadoria</Label>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 rounded-md">
                      <SelectValue placeholder="Selecione a condição" />
                    </SelectTrigger>

                    <SelectContent>
                      {merchandiseConditionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.condition?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.condition.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Observações</Label>

              <Textarea
                id="notes"
                placeholder="Informe detalhes sobre a mercadoria, ocorrência, embalagem, tentativa de entrega ou qualquer informação relevante."
                className="min-h-28 resize-none rounded-md"
                {...register("notes")}
              />

              {errors.notes?.message && (
                <p className="text-sm font-medium text-destructive">
                  {errors.notes.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-4 shadow-card sm:p-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-base font-semibold text-foreground">
              Foto da mercadoria
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Adicione uma imagem para comprovar o estado da mercadoria ou da
              embalagem. Apenas uma imagem será permitida.
            </p>
          </div>

          <div className="mt-6">
            <ImageFileInput
              label="Imagem"
              value={image}
              error={imageError}
              maxSizeInMB={MAX_MERCHANDISE_IMAGE_SIZE / 1024 / 1024}
              onChange={(file) => {
                setImage(file);
                setImageError(undefined);
              }}
            />
          </div>
        </div>

        {errors.root?.message && (
          <p className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            {errors.root.message}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            asChild
            className="h-11 rounded-md"
          >
            <Link href="/dashboard">Cancelar</Link>
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="h-11 rounded-md bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isPending ? "Cadastrando..." : "Cadastrar mercadoria"}
          </Button>
        </div>
      </form>
    </div>
  );
}
