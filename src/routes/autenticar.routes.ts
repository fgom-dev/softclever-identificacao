import { Router } from 'express';
import { autenticarController } from '../modules/identificacao/useCases/autenticar';

export const autenticarRoutes = Router();

autenticarRoutes.get('/', (req, res) => {
	return autenticarController.handle(req, res);
});