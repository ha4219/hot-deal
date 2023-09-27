import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFiltering = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const filtering = await prisma.filtering.findUnique({
      where: {
        user_id: currentUser.id,
      },
    });
    return filtering ? filtering.filtering_text : [];
  } catch (err: any) {
    return [];
  }
};

export default getFiltering;
