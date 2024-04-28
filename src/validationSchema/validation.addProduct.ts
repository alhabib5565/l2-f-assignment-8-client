import { z } from "zod";

// price: z.number().min(0, "price must be a positive number"),
// discountPercentage: z.number().optional(),
// stock: z.string().min(0, { message: "Stock must be a positive number" }),
export const ProductValidationSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    price: z.preprocess((value) => (value), z.coerce.number().int().min(1, "price must be a positive number")),
    discountPercentage: z.preprocess((value) => (value), z.coerce.number().int().optional()),
    stock: z.preprocess((value) => (value), z.coerce.number().int().min(1, "stock must be a positive number")),
    category: z.string().min(1, { message: "Category is required" }),
    weight: z.preprocess((value) => (value), z.coerce.number().int().min(1, "weight must be a positive number")),
    unit: z.string().min(1, 'unit is required'),
    type: z.string().min(1, 'product is required')
});

// Usage:
export const productDefaultValue = {
    title: "",
    description: "",
    brand: "",
    price: 0,
    discountPercentage: 0,
    stock: 0,
    category: "",
    weight: 0,
    type: "",
    unit: ''
};

