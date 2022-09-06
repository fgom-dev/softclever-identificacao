import { PrismaUsuarioRepositorio } from '../../repositorios/implementacoes/PrismaUsuarioRepositorio';
import { LoginController } from './loginController';
import { LoginService } from './loginService';

const usuarioRepositorio = new PrismaUsuarioRepositorio();

const loginService = new LoginService(usuarioRepositorio);

export const loginController = new LoginController(loginService);