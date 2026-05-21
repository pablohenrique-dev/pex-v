import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const [
    totalMerchandises,
    pendingMerchandises,
    deliveredMerchandises,
    issueMerchandises,
    merchandises,
  ] = await Promise.all([
    prisma.merchandise.count({
      where: {
        archivedAt: null,
      },
    }),

    prisma.merchandise.count({
      where: {
        archivedAt: null,
        status: {
          in: ["RECEIVED", "SEPARATED", "OUT_FOR_DELIVERY"],
        },
      },
    }),

    prisma.merchandise.count({
      where: {
        archivedAt: null,
        status: "DELIVERED",
      },
    }),

    prisma.merchandise.count({
      where: {
        archivedAt: null,
        OR: [
          {
            status: "WITH_ISSUE",
          },
          {
            condition: {
              not: "NORMAL",
            },
          },
        ],
      },
    }),

    prisma.merchandise.findMany({
      where: {
        archivedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        code: true,
        description: true,
        recipientName: true,
        status: true,
        condition: true,
        receivedAt: true,
        deliveredAt: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    metrics: {
      totalMerchandises,
      pendingMerchandises,
      deliveredMerchandises,
      issueMerchandises,
    },
    merchandises,
  };
}
