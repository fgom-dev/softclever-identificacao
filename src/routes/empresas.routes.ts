import { Router } from 'express';

import { autenticarUsuario } from '../middlewares/autenticarUsuario';
import { criaEmpresaController } from '../modules/empresas/useCases/criaEmpresa';
import { listarEmpresasController } from '../modules/empresas/useCases/listarEmpresas';

export const empresasRoutes = Router();

empresasRoutes.post('/', autenticarUsuario, (req, res) => {
	criaEmpresaController.handle(req, res);
});

empresasRoutes.get('/', autenticarUsuario, (req, res) => {
	listarEmpresasController.handle(req, res);
});