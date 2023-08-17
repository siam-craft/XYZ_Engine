"use client";
import FormContext from "@/app/context/FormContext";
import { yupResolver } from "@hookform/resolvers/yup";
import Papa from "papaparse";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup
  .object({
    maxX: yup.number().required("You must put a number"),
    minX: yup.number().required("You must put a number"),
  })
  .required();
type Inputs = {
  maxX: number;
  minX: number;
};

const FormTwo = () => {
  const { setFormTwoData } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFormTwoData(data);
  };

  console.log(errors);

  const handleChange = (e: any) => {
    Papa.parse(e.target.files[0], {
      header: true,
      complete: (result) => {
        console.log(result?.data);
      },
    });
  };
  return (
    <div>
      <div className="mb-2">
        <label className="block mb-2 text-sm font-medium " htmlFor="file">
          Upload file
        </label>
        <input
          type="file"
          name="file"
          id="file"
          accept=".csv"
          onChange={handleChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
          aria-describedby="file_input_help"
        />
        <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
          .csv only
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <div className="mb-6">
            <label
              htmlFor="maxX"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Max X
            </label>
            <input
              {...register("maxX")}
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Max value of x"
            />
            <p className="text-red-500 mt-2">{errors.maxX?.message}</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="minX"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Min X
            </label>
            <input
              {...register("minX")}
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Min value of x"
            />
            <p className="text-red-500 mt-2">{errors.minX?.message}</p>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormTwo;
