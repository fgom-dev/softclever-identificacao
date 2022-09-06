import { Router } from 'express';

import { autenticarUsuaio } from '../middlewares/autenticarUsuario';
import { autorizarAtualizacaoUsuario } from '../middlewares/autorizarAtualizacaoUsuario';
import { atualizarUsuarioController } from '../modules/usuarios/useCases/atualizarUsuario';
import { criarUsuarioController } from '../modules/usuarios/useCases/criarUsuario';
import { inativarUsuarioController } from '../modules/usuarios/useCases/inativarUsuario';

export const usersRoutes = Router();

usersRoutes.post('/', (req, res) => {
	return criarUsuarioController.handle(req, res);
});

usersRoutes.put('/:id', autorizarAtualizacaoUsuario, (req, res) => {
	return atualizarUsuarioController.handle(req, res);
});

usersRoutes.patch('/inativarUsuario/:id', autorizarAtualizacaoUsuario, (req, res) => {
	return inativarUsuarioController.handle(req, res);
});

usersRoutes.get('/', autenticarUsuaio, (req, res) => {
	return res.status(200).json([
		{ id: 1, name: 'Fernando' },
		{ id: 2, name: 'Pamela' },
		{ id: 3, name: 'Isadora' },
		{ id: 4, name: 'Gustavo' },
	]);
});