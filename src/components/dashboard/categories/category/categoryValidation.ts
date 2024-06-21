import { z } from "zod";

const CategoryValidationSchema = z.object({
    mainCategoryName: z.string({
        required_error: 'Please select a main category'
    }),
    categoryName: z.string({
        required_error: 'Category name is required'
    }),
});

export default CategoryValidationSchema