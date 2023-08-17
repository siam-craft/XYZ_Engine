"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface IProps {
  children: ReactNode;
}

interface IFormContext {
  setFileData: Dispatch<SetStateAction<any>>;
  fileData: object[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}
const CSVContext = createContext<IFormContext>({
  setFileData: () => {},
  fileData: [{}],
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
  minZ: 0,
  maxZ: 0,
});

export function CSVContextProvider({ children }: IProps) {
  const [fileData, setFileData] = useState([{}]);
  const [minX, setMinX] = useState(0);
  const [maxX, setMaxX] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [minZ, setMinZ] = useState(0);
  const [maxZ, setMaxZ] = useState(0);

  // const data = [
  //   { KP: "10", X: "585281.709", Y: "2108892.92", Z: "-3.56" },
  //   { KP: "6", X: "585281.10", Y: "2108892.40", Z: "-3.56" },
  //   { KP: "7", X: "5852817", Y: "2108892.4", Z: "-3.56" },
  //   { KP: "3", X: "709", Y: "877.92", Z: "-3.56" },
  // ];

  function findMinMax(data: any) {
    let firstEntryX = data.find((entry: any) => entry.X); // Find the first entry with a valid X value
    let firstEntryY = data.find((entry: any) => entry.Y);
    let firstEntryZ = data.find((entry: any) => entry.Z);

    if (!firstEntryX) {
      return { minX: undefined, maxX: undefined }; // No valid X values found
    }

    if (!firstEntryY) {
      return { minZ: undefined, maxZ: undefined };
    }

    if (!firstEntryZ) {
      return { minZ: undefined, maxZ: undefined };
    }

    let minX = parseFloat(firstEntryX.X);
    let maxX = minX;
    let minY = parseFloat(firstEntryY.Y);
    let maxY = minY;
    let minZ = parseFloat(firstEntryZ.Z);
    let maxZ = minZ;

    for (const entry of data) {
      if (entry.X) {
        const xValue = parseFloat(entry.X);
        minX = Math.min(minX, xValue);
        maxX = Math.max(maxX, xValue);
      }

      if (entry.Y) {
        const yValue = parseFloat(entry.Y);
        minY = Math.min(minY, yValue);
        maxY = Math.max(maxY, yValue);
      }

      if (entry.Z) {
        const zValue = parseFloat(entry.Z);
        minZ = Math.min(minZ, zValue);
        maxZ = Math.max(maxZ, zValue);
      }
    }
    return { minX, maxX, minY, maxY, minZ, maxZ };
  }

  useEffect(() => {
    setFileData(fileData);
    const { minX, maxX, minY, maxY, minZ, maxZ } = findMinMax(fileData);
    if (minX) {
      setMinX(minX);
    }
    if (maxX) {
      setMaxX(maxX);
    }
    if (minY) {
      setMinY(minY);
    }
    if (maxY) {
      setMaxY(maxY);
    }
    if (minZ) {
      setMinZ(minZ);
    }
    if (maxZ) {
      setMaxZ(maxZ);
    }

    // setMaxX(maxX);
  }, [fileData, minX, maxX, minY, maxY, minZ, maxZ]);

  const value = {
    setFileData,
    fileData,
    minX,
    maxX,
    minY,
    maxY,
    minZ,
    maxZ,
  };

  return <CSVContext.Provider value={value}>{children}</CSVContext.Provider>;
}

export default CSVContext;
