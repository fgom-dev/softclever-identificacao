import { PrismaEmpresaRepositorio } from '../../repositorios/implementacoes/PrismaEmpresaRepositorio';
import { ListarEmpresasController } from './listarEmpresasController';
import { ListarEmpresasService } from './listarEmpresasService';

const empresaRepositorio = new PrismaEmpresaRepositorio();

const listarEmpresasService = new ListarEmpresasService(empresaRepositorio);

export const listarEmpresasController = new ListarEmpresasController(listarEmpresasService);