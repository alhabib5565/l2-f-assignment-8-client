import { TSelectOptions } from "@/type";
import { useEffect, useState } from "react";

export const useGetUpazilaOptions = () => {
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((response) => response.json())
      .then((data) => setUpazilas(data));
  }, []);

  const upazilaOptoins: TSelectOptions[] = upazilas.map(
    (upazila: { name: string }) => ({
      value: upazila.name,
      label: upazila.name,
    })
  );
  return upazilaOptoins;
};
