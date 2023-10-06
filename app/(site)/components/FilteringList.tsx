interface FilteringListProps {
  initialItems: string[];
}

const FilteringList: React.FC<FilteringListProps> = ({ initialItems }) => {
  return (
    <div>
      <label>filtering_text : </label>
      <span>{initialItems.join(", ")}</span>
    </div>
  );
};

export default FilteringList;
