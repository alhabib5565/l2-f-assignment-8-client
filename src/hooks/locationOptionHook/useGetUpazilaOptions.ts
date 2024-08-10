import { useGetAllUpazilaFromADistrictQuery } from "@/redux/api/bdLocation/upazila.api";
import { TSelectOptions } from "@/type";

type TUpazilaData = {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
};

export const useGetUpazilaOptions = (district: string) => {
  const { data, isLoading: upazilaLoading } =
    useGetAllUpazilaFromADistrictQuery(district, {
      skip: !district,
    });

  const upazilaOptions: TSelectOptions[] = data?.data.map(
    (upazila: TUpazilaData) => ({
      value: upazila.id,
      label: upazila.name,
    })
  );
  return { upazilaOptions, upazilaLoading };
};
