import { z } from "zod";


export const subCategoryValidationSchema = z.object({
    mainCategoryName: z.string({
        required_error: 'Main Category Name is required'
    }),
    categoryName: z.string({
        required_error: 'Category Name is required'
    }),
    subCategoryName: z.string({
        required_error: 'Sub Category Name is required'
    }),
});


export const subCategoryDefaultValues = {
    mainCategoryName: "",
    categoryName: "",
    subCategoryName: ""
};
