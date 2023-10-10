import { z } from "zod";

export const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const RegisterInput = z
  .object({
    name: z
      .string()
      .max(30, { message: "Name must not exceed 30 Characters" })
      .min(2, { message: "Name must be at least 2 Characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 Characters" })
      .max(100, { message: "Password must not exceed 100 Characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 Characters" })
      .max(100, { message: "Confirm Password must not exceed 100 Characters" }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const VerifyResponse = z.object({
  id: z.number(),
  email: z.string().email(),
  userID: z.number(),
  created: z.date(),
});

export const CodeResponse = z.object({
  code: z.string().max(6).min(6),
  email: z.string().email(),
});
