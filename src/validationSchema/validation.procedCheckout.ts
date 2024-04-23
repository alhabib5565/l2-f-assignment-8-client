import { z } from "zod";

export const CheckoutValidationSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }).min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string({
        required_error: 'Phone number is required'
    }).min(11, { message: "Phone number must be at least 11 characters long" }),
    town_city: z.string({
        required_error: 'Town/City is required'
    }).min(2, { message: "Town/City name must be at least 2 characters long" }),
    post_code: z.string({
        required_error: 'Pose code is required'
    }).min(4, { message: "Invalid postcode" }),
});

// Example data to validate
export const checkoutDefaultValue = {
    name: "",
    email: "",
    phone: "",
    townCity: "",
    postcode: "",
};
