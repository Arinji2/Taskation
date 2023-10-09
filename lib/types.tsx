import { z } from "zod";
import { RegisterInput, User } from "./schema";

export type Register = z.infer<typeof RegisterInput>;
export type FormUser = z.infer<typeof User>;
export type User = FormUser & {
  verified: 0 | 1;
};
