import { TSelectOptions } from "@/type";
import { useEffect, useState } from "react";

export const useGetDistrictOptions = () => {
  const [district, setdistrict] = useState([]);

  useEffect(() => {
    fetch("/district.json")
      .then((response) => response.json())
      .then((data) => setdistrict(data));
  }, []);

  const districtOptoins: TSelectOptions[] = district.map(
    (district: { name: string }) => ({
      value: district.name,
      label: district.name,
    })
  );
  return districtOptoins;
};
