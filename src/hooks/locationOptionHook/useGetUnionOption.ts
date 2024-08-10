import { useGetAllUnionFromAUnionQuery } from "@/redux/api/bdLocation/union.api";
import { TSelectOptions } from "@/type";

export const useGetUnionOptions = (upazila: string) => {
  const { data, isLoading: unionLoading } = useGetAllUnionFromAUnionQuery(
    upazila,
    {
      skip: !upazila,
    }
  );

  const unionOptions: TSelectOptions[] = data?.data?.map(
    (union: { name: string }) => ({
      value: union.name,
      label: union.name,
    })
  );
  return { unionOptions, unionLoading };
};
