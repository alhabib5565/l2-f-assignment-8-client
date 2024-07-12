import { TSelectOptions } from "@/type";
import { useEffect, useState } from "react";

export const useGetDivisionOptions = () => {
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    fetch("/divisions.json")
      .then((response) => response.json())
      .then((data) => setDivisions(data));
  }, []);

  const divisionOptoins: TSelectOptions[] = divisions.map(
    (division: { name: string }) => ({
      value: division.name,
      label: division.name,
    })
  );
  return divisionOptoins;
};
