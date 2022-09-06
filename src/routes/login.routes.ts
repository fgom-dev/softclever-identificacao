import { Router } from 'express';
import { loginController } from '../modules/usuarios/useCases/login';

export const loginRoutes = Router();

loginRoutes.post('/', (req, res) => {
	return loginController.handle(req, res);
});