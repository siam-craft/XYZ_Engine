"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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

  const handlePDFDownload = async () => {
    const doc = new jsPDF({ orientation: "landscape" });
    autoTable(doc, { html: "#table" });
    doc.save("table.pdf");
  };

  return (
    <div className="px-16">
      {/* table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <h1 className="text-center text-3xl font-bold py-4">
                Table Data
              </h1>
              <table
                className="min-w-full text-left text-sm font-light border border-1 shadow-sm"
                id="table"
              >
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
                    <th scope="col" className="px-6 py-4">
                      Max X
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Min Y
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Max Y
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Min Z
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Max Z
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
                        <td className="whitespace-nowrap px-6 py-4">
                          {data?.maxX}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data?.minY}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data?.maxY}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data?.minZ}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data?.maxZ}
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
      <div className="flex justify-between">
        <button
          className="border border-1 shadow-md px-3 py-2 inline-block"
          type="button"
          onClick={handleClick}
        >
          Home
        </button>
        <button
          type="button"
          className="border border-1 shadow-md px-3 py-2 inline-block"
          onClick={handlePDFDownload}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
