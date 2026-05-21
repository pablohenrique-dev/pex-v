-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "MerchandiseStatus" AS ENUM ('RECEIVED', 'SEPARATED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'NOT_DELIVERED', 'RETURNED', 'WITH_ISSUE');

-- CreateEnum
CREATE TYPE "MerchandiseCondition" AS ENUM ('NORMAL', 'DAMAGED_PACKAGE', 'VIOLATED_PACKAGE', 'DAMAGED_PRODUCT', 'INCOMPLETE_PRODUCT', 'OTHER');

-- CreateEnum
CREATE TYPE "MerchandisePhotoType" AS ENUM ('GENERAL', 'PACKAGE_PROOF', 'DAMAGE_PROOF', 'DELIVERY_PROOF');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'OPERATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchandises" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recipientName" TEXT,
    "recipientPhone" TEXT,
    "deliveryAddress" TEXT,
    "deliveryRegion" TEXT,
    "status" "MerchandiseStatus" NOT NULL DEFAULT 'RECEIVED',
    "condition" "MerchandiseCondition" NOT NULL DEFAULT 'NORMAL',
    "notes" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchandises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchandise_photos" (
    "id" TEXT NOT NULL,
    "merchandiseId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "type" "MerchandisePhotoType" NOT NULL DEFAULT 'GENERAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchandise_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchandise_history" (
    "id" TEXT NOT NULL,
    "merchandiseId" TEXT NOT NULL,
    "changedById" TEXT,
    "previousStatus" "MerchandiseStatus",
    "newStatus" "MerchandiseStatus" NOT NULL,
    "previousCondition" "MerchandiseCondition",
    "newCondition" "MerchandiseCondition",
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchandise_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "merchandises_code_key" ON "merchandises"("code");

-- CreateIndex
CREATE INDEX "merchandises_status_idx" ON "merchandises"("status");

-- CreateIndex
CREATE INDEX "merchandises_condition_idx" ON "merchandises"("condition");

-- CreateIndex
CREATE INDEX "merchandises_receivedAt_idx" ON "merchandises"("receivedAt");

-- CreateIndex
CREATE INDEX "merchandises_deliveredAt_idx" ON "merchandises"("deliveredAt");

-- CreateIndex
CREATE INDEX "merchandises_archivedAt_idx" ON "merchandises"("archivedAt");

-- CreateIndex
CREATE INDEX "merchandise_photos_merchandiseId_idx" ON "merchandise_photos"("merchandiseId");

-- CreateIndex
CREATE INDEX "merchandise_history_merchandiseId_idx" ON "merchandise_history"("merchandiseId");

-- CreateIndex
CREATE INDEX "merchandise_history_changedById_idx" ON "merchandise_history"("changedById");

-- CreateIndex
CREATE INDEX "merchandise_history_newStatus_idx" ON "merchandise_history"("newStatus");

-- CreateIndex
CREATE INDEX "merchandise_history_createdAt_idx" ON "merchandise_history"("createdAt");

-- AddForeignKey
ALTER TABLE "merchandises" ADD CONSTRAINT "merchandises_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise_photos" ADD CONSTRAINT "merchandise_photos_merchandiseId_fkey" FOREIGN KEY ("merchandiseId") REFERENCES "merchandises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise_history" ADD CONSTRAINT "merchandise_history_merchandiseId_fkey" FOREIGN KEY ("merchandiseId") REFERENCES "merchandises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise_history" ADD CONSTRAINT "merchandise_history_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
