import { PrismaEmpresaRepositorio } from '../../repositorios/implementacoes/PrismaEmpresaRepositorio';
import { CriaEmpresaController } from './criaEmpresaController';
import { CriaEmpresaService } from './criaEmpresaService';

const empresaRepositorio = new PrismaEmpresaRepositorio();

const criaEmpresaService = new CriaEmpresaService(empresaRepositorio);

export const criaEmpresaController = new CriaEmpresaController(criaEmpresaService);
