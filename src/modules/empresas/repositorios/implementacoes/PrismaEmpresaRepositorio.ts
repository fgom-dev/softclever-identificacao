import { Empresa, PrismaClient } from '@prisma/client';
import { IEmpresaRepositorio } from '../IEmpresaRepositorio';

const prisma = new PrismaClient();

export class PrismaEmpresaRepositorio implements IEmpresaRepositorio {
	async listarEmpresas(): Promise<Empresa[]> {
		const empresas = await prisma.empresa.findMany({
			where: {
				Grupos: {
					some: {
						UsuarioGrupo: {
							some: {
								usuarioId: 2
							}
						}
					}
				}
			}
		});

		return empresas;
	}

}