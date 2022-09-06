import { PrismaUsuarioRepositorio } from '../../repositorios/implementacoes/PrismaUsuarioRepositorio';
import { AtualizarUsuarioController } from './atualizarUsuarioController';
import { AtualizarUsuarioService } from './atualizarUsuarioService';

const usuarioRepositorio = new PrismaUsuarioRepositorio();

const atualizarUsuarioService = new AtualizarUsuarioService(usuarioRepositorio);

export const atualizarUsuarioController = new AtualizarUsuarioController(atualizarUsuarioService);