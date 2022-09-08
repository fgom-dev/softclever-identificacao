import { PrismaUsuarioRepositorio } from '../../repositorios/implementacoes/PrismaUsuarioRepositorio';
import { ListarUsuariosPelaEmpresaController } from './listarUsuariosPelaEmpresaController';
import { ListarUsuariosPelaEmpresaService } from './listarUsuariosPelaEmpresaService';

const usuarioRepositorio = new PrismaUsuarioRepositorio();

const listarUsuariosPelaEmpresaService = new ListarUsuariosPelaEmpresaService(usuarioRepositorio);

export const listarUsuariosPelaEmpresaController = new ListarUsuariosPelaEmpresaController(listarUsuariosPelaEmpresaService);