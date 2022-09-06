import { PrismaUsuarioRepositorio } from '../../repositorios/implementacoes/PrismaUsuarioRepositorio';
import { CriarUsuarioController } from './criarUsuarioController';
import { CriarUsuarioService } from './criarUsuarioService';

const usuarioRepositorio = new PrismaUsuarioRepositorio();

const criarUsuarioService = new CriarUsuarioService(usuarioRepositorio);

export const criarUsuarioController = new CriarUsuarioController(criarUsuarioService);