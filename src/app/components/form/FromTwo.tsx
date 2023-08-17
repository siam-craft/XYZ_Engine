"use client";
import CSVContext from "@/app/context/CSVContext";
import FormContext from "@/app/context/FormContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup
  .object({
    maxX: yup
      .number()
      .required("You must put a number")
      .min(1, "value should be greater than 0"),
    minX: yup
      .number()
      .required("You must put a number")
      .min(1, "value should be greater than 0"),
    minY: yup
      .number()
      .required("You must put a number")
      .min(1, "value should be greater than 0"),
    maxY: yup
      .number()
      .required("You must put a number")
      .min(1, "value should be greater than 0"),
    minZ: yup.number().required("You must put a number"),
    maxZ: yup.number().required("You must put a number"),
  })
  .required();

type FormValues = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
};

const FormTwo = () => {
  const router = useRouter();
  const { setFormTwoData, formOneData } = useContext(FormContext);
  const { setFileData, minX, maxX, minY, maxY, minZ, maxZ } =
    useContext(CSVContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    setFormTwoData({ ...formOneData, ...data });
    router.push("/result");
  };

  const handleChange = (e: any) => {
    Papa.parse(e.target.files[0], {
      header: true,
      complete: (result) => {
        setFileData(result?.data);
      },
    });
  };

  useEffect(() => {
    setValue("minX", minX);
    setValue("maxX", maxX);
    setValue("minY", minY);
    setValue("maxY", maxY);
    setValue("minZ", minZ);
    setValue("maxZ", maxZ);
  }, [minX, maxX, minY, maxY, minZ, maxZ]);

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
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label
              htmlFor="maxY"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Max Y
            </label>
            <input
              {...register("maxY")}
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Max value of x"
            />
            <p className="text-red-500 mt-2">{errors.maxY?.message}</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="minY"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Min Y
            </label>
            <input
              {...register("minY")}
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Min value of x"
            />
            <p className="text-red-500 mt-2">{errors.minY?.message}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="mb-6">
            <label
              htmlFor="maxZ"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Max Z
            </label>
            <input
              {...register("maxZ")}
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Min value of x"
            />
            <p className="text-red-500 mt-2">{errors.maxZ?.message}</p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="minZ"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Min Z
            </label>
            <input
              {...register("minZ")}
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Min value of x"
            />
            <p className="text-red-500 mt-2">{errors.minZ?.message}</p>
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
