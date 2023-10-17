import { QueryResult } from "pg";
import { userCreateSchema, userSchema, userUpdateSchema } from "../schemas/user.schema";
import { z } from "zod";


export type User = z.infer<typeof userSchema>

export type UserCreate = z.infer<typeof userCreateSchema>
export type UserRead = Array<User>;
export type UserUpdate = z.infer<typeof userUpdateSchema>
export type UserResult = QueryResult<User>;

export interface UserCreateWithId extends User {
    id: number;
}

export interface UserWithoutPassword {
  id: number;
  name: string;
  password: string;
  email: string;
  admin: boolean;
}

export interface RequestUser extends User {
  password: string;
}