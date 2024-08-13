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
    .min(11, { message: "Phone number must be at least 11 characters" }),
  division: z.string().min(1, { message: "Division is required" }),
  district: z.string().min(1, { message: "District is required" }),
  upazila: z.string().min(1, { message: "Upazila is required" }),
  union: z.string().min(1, { message: "Union is required" }),

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
  recipient_area: "",
  // recipient_area: "Bachur ",
  item_type: "",
  delivery_type: "",
  division: "",
  district: "",
  upazila: "",
  union: "",
};
// import { ORDER_STATUS } from "./order.constant";

// export type TOrder = {
//   _id: string;
//   orderId: string;
//   products: TProductItem[];
//   totalQuantity: number;
//   totalAmount: number;
//   orderStatus: TOrderStatus;
//   shippingAddress: TShippingAddress;
//   paymentInfo: TPaymentInfo;
// };

// export type TOrderStatus = keyof typeof ORDER_STATUS;

// export type TProductItem = {
//   productId: string;
//   productName: string;
//   quantity: number;
//   price: number;
// };

// export type TShippingAddress = {
//   street: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
// };

// export type TPaymentInfo = {
//   method: string;
// };
