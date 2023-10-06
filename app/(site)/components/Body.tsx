"use client";

import useSWR from "swr";

import FilterForm from "./FilterForm";
import DealList from "./deal/DealList";
import { DealType } from "@/app/types";
import {
  FilteringContext,
  FilteringDispatchContext,
} from "@/app/context/FilteringContext";
import { useCallback, useContext } from "react";
import { ClipLoader } from "react-spinners";
import Button from "@/app/components/Button";

// for client side

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Body = () => {
  const state = useContext(FilteringContext);
  const dispatch = useContext(FilteringDispatchContext);
  const { data, error } = useSWR<DealType[]>(
    state
      ? `/api/deals?filters=${state.value.join(",")}&page=${state.page}`
      : `/api/deals`,
    fetcher,
  );
  const handleSubmit = useCallback(async () => {
    if (state?.value.length && dispatch) {
      dispatch({ type: "SAVE", value: state.value });
    }
  }, [dispatch, state?.value]);

  return (
    <div className="space-y-4">
      <FilterForm />

      <div>
        {!data ? (
          <div className="flex w-full items-center justify-center text-center">
            <ClipLoader size={40} color="#0284c7" />
          </div>
        ) : error ? (
          <div className="flex w-full items-center justify-center text-center">
            <p className="text-2xl text-red-500">{error}</p>
          </div>
        ) : (
          <DealList dealList={data} />
        )}
      </div>
      <div className="flex justify-center">
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
    // </FilteringContextProvider>
  );
};

export default Body;
