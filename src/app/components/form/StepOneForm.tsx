"use client";
import { useContext } from "react";

import FormContext from "@/app/context/FormContext";

const StepOneForm = ({ register, disabled }: any) => {
  const { step } = useContext(FormContext);
  return (
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
          required
        />
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
      </div>
    </div>
  );
};

export default StepOneForm;
