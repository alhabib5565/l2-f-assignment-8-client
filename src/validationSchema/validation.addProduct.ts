import { z } from "zod";

// price: z.number().min(0, "price must be a positive number"),
// discountPercentage: z.number().optional(),
// stock: z.string().min(0, { message: "Stock must be a positive number" }),
export const ProductValidationSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    price: z.number().min(0, 'Price must be a posetive number'),
    category: z.string().min(1, { message: "Category is required" }),
    thumbnail: z.string().min(1, { message: " Thumbnail is required" }),
    images: z.array(z.string()).optional(),
    weight: z.string().optional(),
    type: z.string().optional(),
    features: z.array(z.string()).optional(),
});

// Usage:
export const productDefaultValue = {
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    stock: 0,
    brand: "",
    category: "",
    weight: "",
    type: "",
};

