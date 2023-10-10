import { z } from "zod";
import { JwtResponse, RegisterInput, User, VerifyResponse } from "./schema";

export type Register = z.infer<typeof RegisterInput>;
export type FormUser = z.infer<typeof User>;
export type User = FormUser & {
  verified: 0 | 1;
};
export type Verify = z.infer<typeof VerifyResponse>;
export type JwtProps = z.infer<typeof JwtResponse>;
