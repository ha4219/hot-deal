import Image from "next/image";
import { DealType } from "@/app/types";
import { NULL_IMAGE } from "@/app/constant";
import Link from "next/link";

interface DealItemProps {
  data: DealType;
}

const DealItem: React.FC<DealItemProps> = ({ data }) => {
  return (
    <Link
      href={`https://fmkorea.com/hotdeal/${data.link}`}
      className="block border"
      prefetch={false}
    >
      <div className="flex space-x-4">
        <div className="p-2">
          <Image
            alt={data.title}
            src={data.thumb_img ? `https:${data.thumb_img}` : NULL_IMAGE}
            width={80}
            height={100}
          />
        </div>
        <div className="min-w-0">
          <p className="text-md truncate text-gray-900 ">{data.title}</p>
          <p className="text-sm text-gray-500 ">{data.price_info}</p>
        </div>
      </div>
    </Link>
  );
};

export default DealItem;
