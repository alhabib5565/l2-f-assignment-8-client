import { z } from "zod";

const MainCategoryValidationSchema = z.object({
    mainCategoryName: z.string().min(1, "Main category name is required"),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});

export default MainCategoryValidationSchema

export const mainCategoryDefaultValue = {
    mainCategoryName: '',
    metaTitle: '',
    metaDescription: ''
}