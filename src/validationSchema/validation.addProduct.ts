import { z } from "zod";

const flashSaleSchema = z.object({
    sale_end: z.string({
        required_error: "Sale end date is required",
    }),
    sale_start: z.string({
        required_error: "Sale start date is required",
    }),
});

const variantsSchema = z.object({
    color: z.string({
        required_error: "Color ID is required",
    }),
});

const weightSchema = z.object({
    value: z.string({
        required_error: "Weight value is required",
    }),
    unit: z.string({
        required_error: "Weight unit is required",
    }),
});

export const ProductValidationSchema = z.object({
    productName: z.string({
        required_error: "Product name is required",
    }),
    mainCategory: z.string({
        required_error: "Main category is required",
    }),
    category: z.string({
        required_error: "Category is required",
    }),
    subCategory: z.string({
        required_error: "Subcategory is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    price: z.number({
        required_error: "Price is required",
    }).min(1, { message: "Price must be at least 1" }),
    totalQuantity: z.number({
        required_error: "Total quantity is required",
    }).min(1, { message: "Total quantity must be at least 1" }),
    brand: z.string().optional(),
    type: z.string().optional(),
    discountPercentage: z.number().optional(),
    variants: variantsSchema.optional(),
    flash_sale: flashSaleSchema.optional(),
    weight: weightSchema.optional(),
    features: z.array(z.string()).optional(),
    status: z.enum(["Published", "Draft", "Archived"]).default("Published"),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});


// Usage:
export const productDefaultValue = {
    productName: "Baby Feeding Bottle",
    mainCategory: "mother-and-baby",
    category: "feeding",
    subCategory: "bottle-feeding",
    description: "A high-quality baby feeding bottle made from BPA-free materials, ensuring safety and comfort for your baby.",
    price: 15.99,
    totalQuantity: 100,
    availableQuantity: 80,
    thumbnail: "http://example.com/images/baby-feeding-bottle.jpg",
    brand: "BabyBrand",
    type: "Feeding Bottle",
    discountPercentage: 10,
    images: [
        "http://example.com/images/baby-feeding-bottle-1.jpg",
        "http://example.com/images/baby-feeding-bottle-2.jpg"
    ],
    // variants: {
    //     color: "609c5a108129ec7ad8e9e5e9", // Assume this is a valid ObjectId for a color
    // },
    flash_sale: {
        sale_end: "2024-12-31",
        sale_start: "2024-06-01",
    },
    weight: {
        value: 100,
        unit: 'g'
    },
    features: ["BPA-free", "Leak-proof", "Easy to clean"],
    rating: 4.5,
    status: "Published",
    metaTitle: "Buy Baby Feeding Bottle Online",
    metaDescription: "Shop for high-quality baby feeding bottles online. Safe, durable, and affordable feeding bottles for your baby.",
};
/*{
    productName: "",
    mainCategory: "",
    category: "",
    subCategory: "",
    description: "",
    price: undefined,
    totalQuantity: undefined,
    availableQuantity: undefined,
    thumbnail: "",
    brand: "",
    type: "",
    discount_percentage: undefined,
    images: [],
    variants: {
        color: "",
    },
    flash_sale: {
        sale_end: "",
        sale_start: "",
    },
    weight: "",
    features: [],
    rating: undefined,
    status: "Published", // This will use the default value
    metaTitle: "",
    metaDescription: "",
};*/


