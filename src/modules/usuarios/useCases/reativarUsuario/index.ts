import { PrismaUsuarioRepositorio } from '../../repositorios/implementacoes/PrismaUsuarioRepositorio';
import { ReativarUsuarioController } from './reativarUsuarioController';
import { ReativarUsuarioService } from './reativarUsuarioService';

const usuarioRepositorio = new PrismaUsuarioRepositorio();

const reativarUsuarioService = new ReativarUsuarioService(usuarioRepositorio);

export const reativarUsuarioController = new ReativarUsuarioController(reativarUsuarioService);