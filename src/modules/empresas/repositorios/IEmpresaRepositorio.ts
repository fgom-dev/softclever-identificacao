import { Empresa } from '@prisma/client';

export interface IEmpresaRepositorio {
	listarEmpresas(): Promise<Empresa[]>
}