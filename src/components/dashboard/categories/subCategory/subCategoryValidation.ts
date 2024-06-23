import { z } from "zod";


export const subCategoryValidationSchema = z.object({
    mainCategory: z.string({
        required_error: 'Main Category Name is required'
    }),
    category: z.string({
        required_error: 'Category Name is required'
    }),
    subCategoryName: z.string({
        required_error: 'Sub Category Name is required'
    }),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});


export const subCategoryDefaultValues = {
    mainCategory: "",
    category: "",
    subCategoryName: ""
};
