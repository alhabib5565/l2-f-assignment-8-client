import { z } from "zod";

export const verifyEmailValidationSchema = z.object({
  code1: z.string().min(1, "Required").max(1, "Only 1 character allowed"),
  code2: z.string().min(1, "Required").max(1, "Only 1 character allowed"),
  code3: z.string().min(1, "Required").max(1, "Only 1 character allowed"),
  code4: z.string().min(1, "Required").max(1, "Only 1 character allowed"),
});

export const verifyEmailDefaultValue = {
  code1: "",
  code2: "",
  code3: "",
  code4: "",
};
