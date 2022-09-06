import { Router } from 'express';
import { PrismaEmpresaRepositorio } from '../modules/empresas/repositorios/implementacoes/PrismaEmpresaRepositorio';

export const empresasRoutes = Router();

empresasRoutes.get('/', async (req, res) => {
	const empresaRepositorio = new PrismaEmpresaRepositorio();

	const empresas = await empresaRepositorio.listarEmpresas();

	res.status(200).json(empresas);
});