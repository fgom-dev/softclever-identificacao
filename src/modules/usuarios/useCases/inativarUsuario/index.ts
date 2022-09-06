import { PrismaUsuarioRepositorio } from '../../repositorios/implementacoes/PrismaUsuarioRepositorio';
import { InativarUsuarioController } from './inativarUsuarioController';
import { InativarUsuarioService } from './inativarUsuarioService';

const usuarioRepositorio = new PrismaUsuarioRepositorio();

const inativarUsuarioService = new InativarUsuarioService(usuarioRepositorio);

export const inativarUsuarioController = new InativarUsuarioController(inativarUsuarioService);