import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/App.error";
import { UserResult } from "../interfaces/user.interface";

export const uniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) return next();

  const query: UserResult = await client.query(
    `SELECT * FROM "users" WHERE "email" = $1`,
    [email]
  );

  if (query.rowCount) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};
