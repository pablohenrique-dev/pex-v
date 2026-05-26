import { prisma } from "@/lib/prisma";

type GetDashboardDataParams = {
  page?: number;
  search?: string;
};

const PAGE_SIZE = 20;

export async function getDashboardData({
  page = 1,
  search = "",
}: GetDashboardDataParams = {}) {
  const currentPage = Math.max(page, 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const normalizedSearch = search.trim();

  const merchandiseWhere = {
    archivedAt: null,
    ...(normalizedSearch && {
      OR: [
        {
          code: {
            contains: normalizedSearch,
            mode: "insensitive" as const,
          },
        },
        {
          recipientName: {
            contains: normalizedSearch,
            mode: "insensitive" as const,
          },
        },
      ],
    }),
  };

  const [
    totalMerchandises,
    pendingMerchandises,
    deliveredMerchandises,
    issueMerchandises,
    totalFilteredMerchandises,
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

    prisma.merchandise.count({
      where: merchandiseWhere,
    }),

    prisma.merchandise.findMany({
      where: merchandiseWhere,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: PAGE_SIZE,
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

  const totalPages = Math.max(
    Math.ceil(totalFilteredMerchandises / PAGE_SIZE),
    1,
  );

  return {
    metrics: {
      totalMerchandises,
      pendingMerchandises,
      deliveredMerchandises,
      issueMerchandises,
    },
    merchandises,
    pagination: {
      page: currentPage,
      pageSize: PAGE_SIZE,
      totalItems: totalFilteredMerchandises,
      totalPages,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
    },
    filters: {
      search: normalizedSearch,
    },
  };
}
