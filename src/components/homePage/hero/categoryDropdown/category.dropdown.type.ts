export type TSubCategoryItemsData = {
    _id: string;
    categoryName: string;
    url: string;
};

export type TCategoryItemsData = {
    _id: string;
    categoryName: string;
    url: string;
    subCategories?: TSubCategoryItemsData[];
};

export type TMainCategoryItemsData = {
    _id: string;
    mainCategoryName: string;
    url: string;
    categories?: TCategoryItemsData[];
};