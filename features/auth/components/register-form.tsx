"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextInput } from "@/components/form/text-input";
import { RegisterInput, registerSchema } from "../schemas/register.schema";
import { registerAction } from "../actions/register.action";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: RegisterInput) {
    startTransition(async () => {
      const result = await registerAction(data);

      if (!result.success) {
        setError("root", {
          message: result.message ?? "Não foi possível criar sua conta.",
        });
      }
    });
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <span className="text-xl font-bold">M</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">
          Criar conta
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Cadastre-se para começar a controlar suas mercadorias.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <TextInput
          label="Nome"
          placeholder="Digite seu nome"
          error={errors.name?.message}
          {...register("name")}
        />

        <TextInput
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          error={errors.email?.message}
          {...register("email")}
        />

        <TextInput
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <TextInput
          label="Confirmar senha"
          type="password"
          placeholder="Confirme sua senha"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {errors.root?.message && (
          <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
            {errors.root.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="h-11 w-full rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Já possui uma conta?{" "}
        <Link
          href="/login"
          className="font-medium text-primary transition hover:text-primary/80"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
