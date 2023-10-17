import { userSchema } from "./user.schema";

export const loginSchema = userSchema.pick({
    email: true,
    password: true
})