import { Empresa, PrismaClient } from '@prisma/client';
import { IEmpresaCriacaoDTO, IEmpresaRepositorio } from '../IEmpresaRepositorio';

const prisma = new PrismaClient();

export class PrismaEmpresaRepositorio implements IEmpresaRepositorio {
	async criarEmpresa(novaEmpresa: IEmpresaCriacaoDTO, usuarioId: number): Promise<Empresa> {
		const empresa = await prisma.empresa.create({
			data: {
				...novaEmpresa,
				Enderecos: {
					createMany: {
						data: [
							...novaEmpresa.Enderecos ?? [],
						]
					}
				},
				Contatos: {
					createMany: {
						data: [
							...novaEmpresa.Contatos ?? [],
						]
					}
				},
				Grupos: {
					create: {
						descricao: 'Supervisor',
						UsuarioGrupo: {
							create: {
								usuarioId
							}
						}
					}
				}
			}
		});

		return empresa;
	}

	async listarEmpresas(usuarioId: number): Promise<Empresa[]> {
		const empresas = await prisma.empresa.findMany({
			where: {
				Grupos: {
					some: {
						UsuarioGrupo: {
							some: {
								usuarioId
							}
						}
					}
				}
			}
		});

		return empresas;
	}

}