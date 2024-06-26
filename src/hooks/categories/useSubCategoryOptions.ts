import { useGetCategoriesQuery } from '@/redux/api/categories/category.api';

const useSubCategoryOptions = ({ category: category }: { category: string }) => {

    const { data: sucCategoryData, isLoading: subSategoryLoading } =
        useGetCategoriesQuery(
            {
                query: `fields=categoryName&limit=20&mainCategory=${category}`,
            },
            { skip: !category }
        );

    const subCategoryOptions = sucCategoryData && sucCategoryData?.data.map(
        (item: { _id: string; categoryName: string }) => ({
            label: item.categoryName,
            value: item._id,
        })
    );

    return {
        subCategoryOptions,
        subSategoryLoading
    }
};

export default useSubCategoryOptions;