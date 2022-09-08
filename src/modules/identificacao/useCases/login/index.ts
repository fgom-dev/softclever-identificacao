import { IdentificacaoRepositorio } from '../../repositorios/implementacoes/IdentificacaoRepositorio';
import { LoginController } from './loginController';
import { LoginService } from './loginService';

const identificacaoRepositorio = new IdentificacaoRepositorio();

const loginService = new LoginService(identificacaoRepositorio);

export const loginController = new LoginController(loginService);