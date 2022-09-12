import { Router } from 'express';
import { refreshTokenController } from '../modules/identificacao/useCases/refreshToken';

export const refreshTokenRoutes = Router();

refreshTokenRoutes.post('/', (req, res) => {
	return refreshTokenController.handle(req, res);
});