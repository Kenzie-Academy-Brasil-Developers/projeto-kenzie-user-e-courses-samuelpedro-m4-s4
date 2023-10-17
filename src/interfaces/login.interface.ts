import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

export type loginCreate = z.infer<typeof loginSchema>
export type loginReturning = { token: string }

