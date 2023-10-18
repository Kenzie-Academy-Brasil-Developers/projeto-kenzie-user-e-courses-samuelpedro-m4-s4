import { compare } from 'bcryptjs';
import { User, UserResult } from '../interfaces/user.interface';
import { client } from '../database';
import AppError from '../errors/App.error';
import { loginCreate, loginReturning } from '../interfaces/login.interface';
import { sign } from 'jsonwebtoken';

export const loginService = async (data: loginCreate): Promise<loginReturning> => {
  const query: UserResult = await client.query('SELECT * FROM "users" WHERE "email" = $1;', [data.email]);

  if (query.rowCount === 0) {
    throw new AppError('Wrong email/password', 401);
  }

  const user: User = query.rows[0];

  const passwordMatch = await compare(data.password, user.password);

  if (!passwordMatch) {
    throw new AppError('Wrong email/password', 401);
  }

  const token: string = sign({ admin: user.admin }, process.env.SECRET_KEY!, {
    subject: user.id.toString(),
    expiresIn: process.env.EXPIRES_IN!,
  });

  return { token };
};
