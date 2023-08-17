"use client";
import { useContext } from "react";
import * as yup from "yup";
import FormOne from "./components/form/FormOne";
import FormTwo from "./components/form/FromTwo";
import FormContext from "./context/FormContext";

type Inputs = {
  projectName: string;
  client: string;
  contractor: string;
  projectDescription: string;
  maxX: number;
  minX: number;
};

const schema = yup
  .object({
    projectName: yup.string().required(),
    client: yup.string().required(),
    contractor: yup.string().required(),
    projectDescription: yup.string().required(),
    maxX: yup.number().required(),
    minX: yup.number().required(),
  })
  .required();

export default function Home() {
  const { step } = useContext(FormContext);

  return (
    <div className="max-w-[1200px] m-auto border-1 border shadow-md px-3 py-4 min-h-screen">
      <h1 className="text-3xl text-center font-bold text-gray-700 mb-5">
        Multi Step Form Handling
      </h1>
      {step === 1 ? (
        <FormOne />
      ) : (
        <>
          <FormOne />
          <FormTwo />
        </>
      )}
    </div>
  );
}
