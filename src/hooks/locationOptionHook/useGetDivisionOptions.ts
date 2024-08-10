import { useGetAllDivisionQuery } from "@/redux/api/bdLocation/division.api";
import { TSelectOptions } from "@/type";

type TDivisionData = { id: string; name: string; bn_name: string; url: string };

export const useGetDivisionOptions = () => {
  const { data, isLoading: divisionLoading } = useGetAllDivisionQuery({});
  const divisionOptions: TSelectOptions[] = data?.data?.map(
    (division: TDivisionData) => ({
      value: division.id,
      label: division.name,
    })
  );
  return { divisionOptions, divisionLoading };
};
