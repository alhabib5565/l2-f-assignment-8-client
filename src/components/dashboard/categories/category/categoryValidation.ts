import { z } from "zod";

const CategoryValidationSchema = z.object({
    mainCategory: z.string({
        required_error: 'Please select a main category'
    }),
    categoryName: z.string({
        required_error: 'Category name is required'
    }),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});

export default CategoryValidationSchema

export const categoryDefaultValues = {
    mainCategory: "",
    categoryName: "",
};