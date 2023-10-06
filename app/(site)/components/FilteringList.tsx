"use client";

import { FilteringContext } from "@/app/context/FilteringContext";
import { useContext } from "react";

interface FilteringListProps {
  // initialItems: string[];
  remove: (value: string) => void;
}

const FilteringList: React.FC<FilteringListProps> = ({ remove }) => {
  const state = useContext(FilteringContext);
  return (
    <div className="flex flex-wrap  py-1">
      {state &&
        state.value.map((item) => (
          // # TODO css dark mode modify
          <button
            data-te-chip-init
            data-te-ripple-init
            // data-te-ripple-color="dark"
            key={item}
            onClick={() => remove(item)}
            className="[word-wrap: break-word] dark:hover:text-neutral my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] border border-[#3b71ca] bg-[#3b71ca] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#3b71ca] hover:!shadow-none dark:text-neutral-100"
          >
            {item}
            <span
              data-te-chip-close
              className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-200 dark:hover:text-neutral-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        ))}
    </div>
  );
};

export default FilteringList;
