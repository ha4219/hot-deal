"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HashtagIcon, PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

type FilterFormValue = {
  filter: string;
};
const FilterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterFormValue>({
    defaultValues: {
      filter: "",
    },
  });

  const onSubmit: SubmitHandler<FilterFormValue> = (data) => {
    setIsLoading(true);

    fetch(`/api/filter`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .catch(() => {
        console.log("fetch catch");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <form
        className="mt-40 flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-auto mt-5 flex w-full max-w-[90%] items-center rounded-full border border-gray-200 px-5 py-3 focus-within:shadow-md hover:shadow-md sm:max-w-xl lg:max-w-2xl">
          <HashtagIcon className="mr-3 h-5 text-gray-500" />
          {/* <Input
            id="filter"
            // label="filter"
            type="text"
            errors={errors}
            register={register}
            pattern={{
              value: /^[A-za-z0-9가-힣\s]{1,10}$/,
              message: "영문 대소문자, 글자 단위 한글, 숫자",
            }}
          /> */}
          <input
            id="filter"
            type="text"
            className="flex-grow focus:outline-none"
            {...register("filter", {
              pattern: {
                value: /^[A-za-z0-9가-힣\s]{1,10}$/,
                message: "영문 대소문자, 글자 단위 한글, 숫자",
              },
            })}
          />
          <button type="submit" disabled={isLoading}>
            <PlusIcon
              className={clsx(`focus-visible:outline-offset-2" h-5 font-semibold
  text-gray-500`)}
              aria-label="test"
            />
          </button>
        </div>
        {errors.filter && (
          <p className="mt-1 text-xs text-red-500">{errors.filter.message}</p>
        )}

        <div>
          <Button disabled={isLoading} type="submit">
            save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
