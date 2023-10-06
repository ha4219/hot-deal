import prisma from "@/app/libs/prismadb";
import { PAGE_LIMIT } from "../constant";

const getDeals = async (filterings: string[], page: number) => {
  if (!filterings.length) {
    // get all
    const deals = await prisma.deal.findMany({
      skip: PAGE_LIMIT * page,
      take: PAGE_LIMIT,
      orderBy: {
        created_at: "desc",
      },
    });
    return deals;
  }
  const deals = await prisma.deal.findMany({
    skip: PAGE_LIMIT * page,
    take: PAGE_LIMIT,
    orderBy: {
      created_at: "desc",
    },
    where: {
      OR: filterings.map((item) => ({
        title: {
          contains: item,
        },
      })),
    },
  });
  return deals;
};

export default getDeals;
