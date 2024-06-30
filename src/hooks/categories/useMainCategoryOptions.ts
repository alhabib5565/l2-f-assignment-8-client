import { useMemo } from 'react';
import { useGetMainCategoriesQuery } from '@/redux/api/categories/mainCategory.api';

const useMainCategoryOptions = () => {
    const { data: mainCategoryData, isLoading: mainCategoryLoading } = useGetMainCategoriesQuery({
        query: "fields=mainCategoryName&limit=20"
    });

    const mainCategoryOptions = useMemo(() => {
        return mainCategoryData?.data.map((item: { _id: string; mainCategoryName: string }) => ({
            label: item.mainCategoryName,
            value: item._id,
        })) || [];
    }, [mainCategoryData]);

    return {
        mainCategoryLoading,
        mainCategoryOptions
    };
};

export default useMainCategoryOptions;
