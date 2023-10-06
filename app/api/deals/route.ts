import getDeals from "@/app/actions/getDeals";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 0;

    const filters = searchParams.get("filters")
      ? (searchParams.get("filters")?.split(",") as string[])
      : [];
    const deals = await getDeals(filters, page);

    return NextResponse.json(deals);
  } catch (err: any) {
    console.error("Internal Error by get reuqest at /api/deals", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
