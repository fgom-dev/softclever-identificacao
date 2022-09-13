import { PrismaUsuarioRepositorio } from '../../repositorios/implementacoes/PrismaUsuarioRepositorio';
import { UsuarioPeloIdController } from './usuarioPeloIdController';
import { UsuarioPeloIdService } from './usuarioPeloIdService';

const usuarioRepositorio = new PrismaUsuarioRepositorio();

const usuarioPeloIdService = new UsuarioPeloIdService(usuarioRepositorio);

export const usuarioPeloIdController = new UsuarioPeloIdController(usuarioPeloIdService);