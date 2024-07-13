import { any, z } from "zod";

const flashSaleSchema = z.object({
  sale_end: z.string().min(1, { message: "Sale end date is required" }),
  sale_start: z.string().min(1, { message: "Sale start date is required" }),
});

const variantsSchema = z.object({
  color: z.string().min(1, { message: "Color ID is required" }),
});

const weightSchema = z.object({
  value: z.any().optional(),
  unit: z.any().optional(),
});

export const ProductValidationSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  mainCategory: z.string().min(1, { message: "Main category is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  subCategory: z.string().min(1, { message: "Subcategory is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .string({ invalid_type_error: "Price must be a valid number" })
    .min(1, { message: "Price must be greater than or equal to 1" }),
  totalQuantity: z
    .string({ invalid_type_error: "Total quantity must be a valid number" })
    .min(1, { message: "Total quantity must be greater than or equal to 1" }),
  brand: z.string().optional(),
  type: z.string().optional(),
  discountPercentage: z.any(),
  variants: z.any(),
  weight: weightSchema.optional(),
  status: z.enum(["Published"]).default("Published"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// Default values for product form
export const productDefaultValue = {
  productName: "",
  mainCategory: "",
  category: "",
  subCategory: "",
  description: "",
  price: null,
  totalQuantity: null,
  thumbnail: "",
  brand: "",
  type: "",
  discountPercentage: null,
  variants: {
    color: [],
  },
  weight: {
    value: null,
    unit: "",
  },
  flash_sale: {
    sale_end: "",
    sale_start: "",
  },
  status: "Published",
  metaTitle: "",
  metaDescription: "",
};
