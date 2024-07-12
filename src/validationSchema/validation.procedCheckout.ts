import { z } from "zod";

export const CheckoutValidationSchema = z.object({
  recipient_name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, { message: "Name must be at least 2 characters long" }),
  recipient_phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(11, { message: "Phone number must be at least 11 characters long" }),
  recipient_address: z.string().min(1, { message: "Address is required" }),
  recipient_area: z
    .string({
      required_error: "Area is required",
    })
    .min(2, { message: "Area name must be at least 2 characters long" }),
  item_type: z
    .string({
      required_error: "Item type is required",
    })
    .min(4, { message: "Item type is required" }),
  delivery_type: z
    .string({
      required_error: "Delivery type is required",
    })
    .min(4, { message: "Delivery type is required" }),
});

// Example data to validate
export const checkoutDefaultValue = {
  recipient_name: "",
  recipient_phone: "",
  recipient_address: "",
  recipient_area: "",
  item_type: "",
  delivery_type: "",
};
