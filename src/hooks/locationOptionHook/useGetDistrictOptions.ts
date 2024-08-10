import { useGetAllDistrictFromADivisionQuery } from "@/redux/api/bdLocation/district.api";
import { TSelectOptions } from "@/type";

type TDistrictData = {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  url: string;
};

export const useGetDistrictOptions = (divisionId: string) => {
  const { data, isLoading: districtLoading } =
    useGetAllDistrictFromADivisionQuery(divisionId, {
      skip: !divisionId,
    });

  const districtOptions: TSelectOptions[] = data?.data?.map(
    (district: TDistrictData) => ({
      value: district.id,
      label: district.name,
    })
  );
  return { districtOptions, districtLoading };
};
