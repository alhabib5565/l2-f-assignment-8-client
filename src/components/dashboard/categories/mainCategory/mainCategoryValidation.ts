import { z } from "zod";

const MainCategoryValidationSchema = z.object({
    mainCategoryName: z.string().min(1, "Main category name is required"),
});

export default MainCategoryValidationSchema

export const mainCategoryDefaultValue = {
    mainCategoryName: '',
    metaTitle: '',
    metaDescription: ''
}