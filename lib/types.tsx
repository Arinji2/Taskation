import { z } from "zod";
import {
  JwtResponse,
  LoginInput,
  RegisterInput,
  TodoInput,
  TodoResponse,
  User,
  VerifyResponse,
} from "./schema";

export type Register = z.infer<typeof RegisterInput>;
export type Login = z.infer<typeof LoginInput>;
export type FormUser = z.infer<typeof User>;
export type User = FormUser & {
  verified: 0 | 1;
};
export type Verify = z.infer<typeof VerifyResponse>;
export type JwtProps = z.infer<typeof JwtResponse>;
export type TodoProps = z.infer<typeof TodoResponse>;

export type TodoInput = z.infer<typeof TodoInput>;
