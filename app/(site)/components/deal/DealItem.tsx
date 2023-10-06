import Image from "next/image";
import { DealType } from "@/app/types";

interface DealItemProps {
  data: DealType;
}

const DealItem: React.FC<DealItemProps> = ({ data }) => {
  return (
    <div className="">
      <div className="flex">
        <Image
          alt={data.title}
          src={`https:${data.thumb_img}`}
          width={100}
          height={100}
        />
        <div className="">{data.title}</div>
      </div>
    </div>
  );
};

export default DealItem;
