import { Router } from 'express';
import { empresasRoutes } from './empresas.routes';
import { loginRoutes } from './login.routes';
import { usersRoutes } from './users.routes';

export const router = Router();

router.use('/usuarios', usersRoutes);
router.use('/login', loginRoutes);
router.use('/empresas', empresasRoutes);