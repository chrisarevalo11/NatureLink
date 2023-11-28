"use client";

import { useFormik } from "formik";
import { ReactNode, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type DonateProps = {
  amount: number;
};

export default function Donate(): ReactNode {
  const [values, setValues] = useState<DonateProps>({
    amount: 0,
  });

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value }: { name: string; value: string } = e.target;
      setValues({
        ...values,
        [name]: parseInt(value),
      });
    },
    1000
  );

  const formik = useFormik({
    initialValues: values,
    onSubmit: () => {
      console.log(values);
    },
  });

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Donate</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col items-center gap-5"
      >
        <div className="flex w-[90%]">
          <input
            name="amount"
            type="number"
            onChange={handleChange}
            className="input w-[90%] rounded-r-none bg-gray-700"
            placeholder="Amount"
          />
          <span className="px-5 bg-gray-800 flex items-center rounded-r-full">
            MATIC
          </span>
        </div>
        <button className="btn btn-primary btn-wide" type="submit">
          {" "}
          Donate
        </button>
      </form>
      <div>
        <progress
          className="progress progress-primary w-56"
          value={1378}
          max={"100"}
        ></progress>
        <h3></h3>
        <h3></h3>
      </div>
    </div>
  );
}
