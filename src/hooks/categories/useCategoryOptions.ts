import { useGetCategoriesQuery } from '@/redux/api/categories/category.api';

const useCategoryOptions = ({ mainCategory }: { mainCategory: string }) => {

    const { data: categoryData, isLoading: categoryLoading } =
        useGetCategoriesQuery(
            {
                query: `fields=categoryName&limit=20&mainCategory=${mainCategory}`,
            },
            { skip: !mainCategory }
        );

    const categoryOptions = categoryData && categoryData?.data.map(
        (item: { _id: string; categoryName: string }) => ({
            label: item.categoryName,
            value: item._id,
        })
    );

    return {
        categoryOptions,
        categoryLoading
    }
};

export default useCategoryOptions;