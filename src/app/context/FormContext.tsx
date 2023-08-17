"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface IFormContext {
  step: number;
  setStep: Dispatch<SetStateAction<any>>;
  formOneData: any;
  formTwoData: any;
  setFormOneData: Dispatch<SetStateAction<any>>;
  setFormTwoData: Dispatch<SetStateAction<any>>;
}
interface IProps {
  children: ReactNode;
}

const FormContext = createContext<IFormContext>({
  step: 1,
  setStep: () => {},
  formTwoData: {},
  formOneData: {},
  setFormTwoData: () => {},
  setFormOneData: () => {},
});

export function FormProvider({ children }: IProps) {
  const [step, setStep] = useState(1);
  const [centralFormData, setCentralFormData] = useState({
    projectName: "",
    client: "",
    contractor: "",
    projectDescription: "",
    maxX: 0,
    minX: 0,
  });

  const [formOneData, setFormOneData] = useState({
    projectName: "",
    client: "",
    contractor: "",
    projectDescription: "",
  });
  const [formTwoData, setFormTwoData] = useState({ maxX: 0, minX: 0 });

  useEffect(() => {
    setCentralFormData({ ...formOneData, ...formTwoData });
  }, [formOneData, formTwoData]);

  const value = {
    step,
    setStep,
    formOneData,
    setFormOneData,
    formTwoData,
    setFormTwoData,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export default FormContext;
