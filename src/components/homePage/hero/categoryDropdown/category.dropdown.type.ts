export type TSubCategoryItemsData = {
    _id: string;
    categoryName: string;
    imageURL: string
    url: string;
};

export type TCategoryItemsData = {
    _id: string;
    categoryName: string;
    imageURL: string
    url: string;
    subCategories?: TSubCategoryItemsData[];
};

export type TMainCategoryItemsData = {
    _id: string;
    imageURL: string
    mainCategoryName: string;
    url: string;
    categories?: TCategoryItemsData[];
};