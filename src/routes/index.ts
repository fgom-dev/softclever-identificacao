import { Router } from 'express';
import { empresasRoutes } from './empresas.routes';
import { loginRoutes } from './login.routes';
import { refreshTokenRoutes } from './refreshToken.routes';
import { usuariosRoutes } from './usuarios.routes';

export const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/login', loginRoutes);
router.use('/empresas', empresasRoutes);
router.use('/refresh-token', refreshTokenRoutes);