import { useGetSubCategoriesQuery } from "@/redux/api/categories/subCategory.api";

const useSubCategoryOptions = ({
  category: category,
}: {
  category: string;
}) => {
  const { data: subCategoryData, isLoading: subSategoryLoading } =
    useGetSubCategoriesQuery(
      {
        query: `fields=subCategoryName&limit=20&category=${category}`,
      },
      { skip: !category }
    );
  const subCategoryOptions =
    subCategoryData &&
    subCategoryData?.data?.map(
      (item: { _id: string; subCategoryName: string }) => ({
        label: item.subCategoryName,
        value: item._id,
      })
    );

  return {
    subCategoryOptions,
    subSategoryLoading,
  };
};

export default useSubCategoryOptions;
