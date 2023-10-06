"use client";
import { Dispatch, createContext, useReducer } from "react";

interface IFiltering {
  value: string[];
  page: number;
  realValue: string[];
}

export const FilteringContext = createContext<IFiltering | null>(null);
export const FilteringDispatchContext = createContext<
  Dispatch<Action> | undefined
>(undefined);

type Action =
  | { type: "SET"; value: string[] }
  | { type: "ADD"; value: string }
  | { type: "REMOVE"; value: string }
  | { type: "SAVE"; value: string[] }
  | { type: "PAGE_NEXT" }
  | { type: "PAGE_PREV"; value: string[] };

const filteringReducers = (state: IFiltering, action: Action): IFiltering => {
  switch (action.type) {
    case "SET":
      return { ...state, value: [...new Set([...action.value])] };
    case "SAVE":
      // TODO 수정해야함. 무조건 context with promise
      fetch(`/api/filter`, {
        method: "POST",
        body: JSON.stringify({ value: action.value }),
      });
      return { ...state, value: action.value, realValue: action.value };
    case "ADD":
      return { ...state, value: [...new Set([...state.value, action.value])] };
    case "REMOVE":
      return {
        ...state,
        value: state.value.filter((item) => item !== action.value),
      };
    case "PAGE_NEXT":
      return { ...state, page: state.page + 1 };
    case "PAGE_PREV":
      return { ...state, page: state.page - 1 };
    default:
      throw new Error("unhandled action");
  }
};

const initializedValue: IFiltering = {
  realValue: [],
  value: [],
  page: 0,
};

export const FilteringContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(filteringReducers, initializedValue);
  return (
    <FilteringDispatchContext.Provider value={dispatch}>
      <FilteringContext.Provider value={state}>
        {children}
      </FilteringContext.Provider>
    </FilteringDispatchContext.Provider>
  );
};
