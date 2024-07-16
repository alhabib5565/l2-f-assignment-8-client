import { z } from "zod";
import dayjs from "dayjs";

export const AddFlashSaleFormValidationSchema = z
  .object({
    flashSaleDiscountPercentage: z
      .string({
        invalid_type_error: "Please provide a valid number",
      })
      .min(1, "Discount percentage cannot be less than 1")
      .max(100, "Discount percentage cannot be more than 100"),
    flashSaleStartDate: z.string().refine((date) => dayjs(date).isValid(), {
      message: "Invalid start date",
    }),
    flashSaleEndDate: z
      .string()
      .refine((date) => dayjs(date).isValid(), { message: "Invalid end date" }),
  })
  .refine(
    (data) =>
      dayjs(data.flashSaleEndDate).isAfter(dayjs(data.flashSaleStartDate)),
    {
      message: "End date must be after start date",
      path: ["flashSaleEndDate"],
    }
  );

export const addFlashSaleFormDefaultValues = {
  flashSaleDiscountPercentage: 0,
  flashSaleStartDate: dayjs(new Date()).format(),
  flashSaleEndDate: dayjs(new Date()).format(),
};
