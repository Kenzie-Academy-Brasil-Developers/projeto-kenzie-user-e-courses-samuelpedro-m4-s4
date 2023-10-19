import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.middleware';
import { loginSchema } from '../schemas/login.schema';
import { loginController } from '../controllers/login.controller';


export const loginRouter: Router = Router();

loginRouter.post("/", validateBody(loginSchema), loginController);