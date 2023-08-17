"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import FormContext from "../context/FormContext";

const ResultPage = () => {
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
  const {
    centralFormData,
    formOneData,
    formTwoData,
    setStep,
    setFormOneData,
    setFormTwoData,
  } = useContext(FormContext);

  const handleClick = (e: any) => {
    setFormTwoData({ maxX: 0, minX: 0 });
    setStep(1);
    setFormOneData({
      projectName: "",
      client: "",
      contractor: "",
      projectDescription: "",
    });
    router.push("/");
  };

  useEffect(() => {
    const tableData = centralFormData.filter(
      (formObj: any) => Object.keys(formObj).length > 2
    );
    setTableData(tableData);
  }, [centralFormData]);

  return (
    <div>
      {/* table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Project Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Contractor
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Min X
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data: any) => {
                    return (
                      <tr
                        key={data.projectName}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {data?.projectName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data?.client}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data?.contractor}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data?.minX}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button type="button" onClick={handleClick}>
        Home
      </button>
    </div>
  );
};

export default ResultPage;
