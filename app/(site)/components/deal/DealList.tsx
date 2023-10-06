import { DealType } from "@/app/types";
import DealItem from "./DealItem";

interface DealListProps {
  dealList: DealType[];
}

const DealList: React.FC<DealListProps> = ({ dealList }) => {
  // TODO with pagination
  return (
    <div className="space-y-4">
      {dealList.map((item) => (
        <DealItem data={item} key={item.link} />
      ))}
    </div>
  );
};

export default DealList;
