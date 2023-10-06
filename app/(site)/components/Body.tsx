"use client";

import useSWR from "swr";

import FilterForm from "./FilterForm";
import DealList from "./deal/DealList";
import { DealType } from "@/app/types";

// for client side

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Body = () => {
  const { data, error, isLoading } = useSWR<DealType[]>(`/api/deals`, fetcher);
  return (
    <div className="space-y-6">
      <FilterForm />
      {data && <DealList dealList={data} />}
    </div>
  );
};

export default Body;
