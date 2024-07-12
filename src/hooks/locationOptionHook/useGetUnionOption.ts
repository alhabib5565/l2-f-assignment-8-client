import { TSelectOptions } from "@/type";
import { useEffect, useState } from "react";

export const useGetUnionOptions = () => {
  const [unions, setUnions] = useState([]);

  useEffect(() => {
    fetch("/unions.json")
      .then((response) => response.json())
      .then((data) => setUnions(data));
  }, []);

  const divisionOptoins: TSelectOptions[] = unions.map(
    (division: { name: string }) => ({
      value: division.name,
      label: division.name,
    })
  );
  return divisionOptoins;
};
