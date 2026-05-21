# Sistema Web de Controle de Mercadorias e Entregas

Este projeto foi desenvolvido como parte de um Projeto de Extensão do curso de Ciência da Computação. A proposta tem como objetivo auxiliar no controle de mercadorias recebidas em um galpão e destinadas à entrega, substituindo registros manuais feitos em caderneta por uma solução web simples, organizada e acessível.

## Problema identificado

Atualmente, o controle das mercadorias é realizado manualmente em uma caderneta de papel. Esse processo pode gerar dificuldades como perda de informações, inconsistência nos registros, dificuldade de consulta, ausência de histórico e falta de métricas sobre as entregas realizadas.

Além disso, algumas mercadorias podem chegar com problemas, como embalagem danificada, embalagem violada ou produto danificado. Sem um registro digital com observações e fotos, torna-se mais difícil comprovar o estado da mercadoria e acompanhar sua situação até a entrega.

## Objetivo do sistema

O sistema tem como objetivo permitir o cadastro, acompanhamento e organização das mercadorias destinadas à entrega. A aplicação possibilita registrar informações da mercadoria, adicionar foto, indicar o estado do produto, atualizar o status da entrega e consultar métricas básicas sobre a operação.

## Funcionalidades principais

- Autenticação de usuário;
- Cadastro de mercadorias;
- Registro de foto da mercadoria;
- Registro do estado da mercadoria;
- Controle de status da entrega;
- Observações sobre ocorrências;
- Listagem de mercadorias;
- Busca e filtros;
- Tela de detalhes da mercadoria;
- Histórico de alterações de status;
- Dashboard com indicadores simples.

## Tecnologias utilizadas

- Next.js App Router;
- TypeScript;
- Tailwind CSS;
- shadcn/ui;
- lucide-react;
- React Hook Form;
- Zod;
- Prisma ORM;
- PostgreSQL;
- Docker Compose;
- Supabase;
- Cloudinary.

## Principais status da mercadoria

- Recebida;
- Separada;
- Em rota;
- Entregue;
- Não entregue;
- Devolvida;
- Com ocorrência.

## Estados da mercadoria

- Normal;
- Embalagem danificada;
- Embalagem violada;
- Produto danificado;
- Produto incompleto;
- Outro.

## Como executar o projeto localmente

Clone o repositório:

```bash
git clone <url-do-repositorio>