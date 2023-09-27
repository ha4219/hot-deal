"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const FilterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      value: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="value"
          label="filter"
          type="text"
          errors={errors}
          register={register}
        />
        <div>
          <Button disabled={isLoading} fullWidth type="submit">
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
