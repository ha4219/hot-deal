import { NextResponse } from "next/server";
import { load } from "cheerio";
import prisma from "@/app/libs/prismadb";

type DealType = {
  title?: string;
  productId: number;
  imgUrl?: string;
  shop?: string;
  displayPrice?: string;
  category?: string;
  price?: number;
  deliveryPrice?: string;
  uploadAt?: Date;
}[];

const getHTML = async () => {
  try {
    const res = await fetch("https://www.fmkorea.com/hotdeal");
    const body = await res.text();

    const $ = load(body);
    const dealList = $(".li_best2_pop0");
    const ret: DealType = [];
    dealList.each((_, element) => {
      ret.push({
        title: $(element).find("h3.title > a").text().replace(/\s/g, "").trim(),
        productId: Number(
          $(element).find("h3.title > a").attr("href")!.replace("/", "").trim(),
        ),
        imgUrl: $(element).find("a > img.thumb").attr("data-original"),
        shop: $(element)
          .find("div.hotdeal_info > span:nth-of-type(1) > a")
          .text()
          .trim(),
        displayPrice: $(element)
          .find("div.hotdeal_info > span:nth-of-type(2) > a")
          .text()
          .trim(),
        deliveryPrice: $(element)
          .find("div.hotdeal_info > span:nth-of-type(3) > a")
          .text()
          .trim(),
        category: $(element).find("div > span.category > a").text().trim(),
        uploadAt: (() => {
          const [h, m] = $(element)
            .find("div > span.regdate")
            .text()
            .replace(/\s/g, "")
            .split(":");
          const ms = new Date().setHours(Number(h), Number(m));
          return new Date(ms);
        })(),
      });
    });
    return ret;
  } catch (err) {
    console.log(err);
  }
};

export async function GET() {
  try {
    const data = await getHTML();
    if (typeof data !== "undefined") {
      prisma.deal.createMany({
        data,
      });
    }

    return NextResponse.json({ Hello: "World" });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
