import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();

    const filtering = await prisma.filtering.findUnique({
      where: {
        user_id: user.id as string,
      },
    });

    if (filtering) {
      const res = await prisma.filtering.update({
        where: {
          id: filtering.id,
        },
        data: {
          filtering_text: [...filtering.filtering_text, body.value as string],
        },
      });

      return NextResponse.json(res);
    } else {
      const res = await prisma.filtering.create({
        data: {
          filtering_text: [body.value as string],
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          user: true,
        },
      });
      return NextResponse.json(res);
    }
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const filtering = await prisma.filtering.findUnique({
      where: {
        user_id: user.id as string,
      },
    });
    return NextResponse.json(filtering);
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internel Error", { status: 505 });
  }
}
