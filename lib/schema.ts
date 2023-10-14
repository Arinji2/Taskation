import { z } from "zod";

export const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  verified: z.number().refine((data) => data === 1 || data === 0),
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

export const LoginInput = z.object({
  name: z.string(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 Characters" })
    .max(100, { message: "Password must not exceed 100 Characters" }),
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

export const JwtResponse = z.object({
  id: z.number(),
  verified: z.number().refine((data) => data === 1 || data === 0),
});

export const TodoResponse = z.object({
  id: z.number(),
  name: z.string().max(40).min(1),
  description: z.string().max(100).min(10),
  created: z.date(),
  completed: z.number(),
  userID: z.number(),
  public: z.number().refine((data) => data === 1 || data === 0),
});

export const TodoResponses = z.array(TodoResponse);
export const SubTodoResponse = z.object({
  id: z.number(),
  name: z.string().max(40).min(1),
  description: z.string().max(100).min(10),
  created: z.date(),
  completed: z.number(),
  todoID: z.number(),
  public: z.number().refine((data) => data === 1 || data === 0),
});

export const SubTodoResponses = z.array(SubTodoResponse);
export const TodoInput = z.object({
  name: z.string().max(40).min(1),
  description: z.string().max(100).min(10),
});
