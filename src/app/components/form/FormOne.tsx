"use client";
import FormContext from "@/app/context/FormContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup
  .object({
    projectName: yup.string().required("Project Name is required"),
    client: yup.string().required("Client is required"),
    contractor: yup.string().required("Contractor is required"),
    projectDescription: yup
      .string()
      .required("Project Description is required"),
  })
  .required();
type Inputs = {
  projectName: string;
  client: string;
  contractor: string;
  projectDescription: string;
};

const FormOne = () => {
  const { setFormOneData, setStep, formOneData, step } =
    useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: formOneData,
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setStep((prev: number) => prev + 1);
    setFormOneData(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <div className="mb-6">
            <label
              htmlFor="projectName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Project Name
            </label>
            <input
              disabled={step === 1 ? false : true}
              {...register("projectName")}
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Project Name"
            />
            <p className="text-red-500 mt-2">{errors.projectName?.message}</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="client"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Client
            </label>
            <input
              disabled={step === 1 ? false : true}
              {...register("client")}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Client"
            />
            <p className="text-red-500 mt-2">{errors.client?.message}</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="contractor"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Contractor
            </label>
            <input
              disabled={step === 1 ? false : true}
              {...register("contractor")}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="contractor"
            />
            <p className="text-red-500 mt-2">{errors.contractor?.message}</p>
          </div>
          <div className="mb-6 col-span-3">
            <label
              htmlFor="projectDescription"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Project Description
            </label>
            <textarea
              disabled={step === 1 ? false : true}
              {...register("projectDescription")}
              rows={4}
              id="projectDescription"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Project Description"
            />
            <p className="text-red-500 mt-2">
              {errors.projectDescription?.message}
            </p>
          </div>
        </div>
        {step === 1 && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
      </form>
    </div>
  );
};

export default FormOne;
