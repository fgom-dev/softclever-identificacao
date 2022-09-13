import { Router } from 'express';

import { autenticarUsuario } from '../middlewares/autenticarUsuario';
import { atualizarUsuarioController } from '../modules/usuarios/useCases/atualizarUsuario';
import { criarUsuarioController } from '../modules/usuarios/useCases/criarUsuario';
import { inativarUsuarioController } from '../modules/usuarios/useCases/inativarUsuario';
import { listarUsuariosPelaEmpresaController } from '../modules/usuarios/useCases/listarUsuariosPelaEmpresa';
import { reativarUsuarioController } from '../modules/usuarios/useCases/reativarUsuario';
import { usuarioPeloIdController } from '../modules/usuarios/useCases/usuarioPeloId';

export const usuariosRoutes = Router();

usuariosRoutes.post('/', (req, res) => {
	return criarUsuarioController.handle(req, res);
});

usuariosRoutes.put('/:id', autenticarUsuario, (req, res) => {
	return atualizarUsuarioController.handle(req, res);
});

usuariosRoutes.patch('/inativarUsuario/:id', autenticarUsuario, (req, res) => {
	return inativarUsuarioController.handle(req, res);
});

usuariosRoutes.patch('/reativarUsuario/:id', autenticarUsuario, (req, res) => {
	return reativarUsuarioController.handle(req, res);
});

usuariosRoutes.get('/', autenticarUsuario, (req, res) => {
	return listarUsuariosPelaEmpresaController.handle(req, res);
});

usuariosRoutes.get('/:id', autenticarUsuario, (req, res) => {
	return usuarioPeloIdController.handle(req, res);
});