import { prisma } from "@/lib/prisma";

export async function getMerchandiseById(id: string) {
  const merchandise = await prisma.merchandise.findFirst({
    where: {
      id,
      archivedAt: null,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      photos: {
        orderBy: {
          createdAt: "desc",
        },
      },
      history: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          changedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return merchandise;
}
