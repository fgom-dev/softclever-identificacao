import { Empresa } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { IEmpresaCriacaoDTO, IEmpresaRepositorio } from '../IEmpresaRepositorio';

export class PrismaEmpresaRepositorio implements IEmpresaRepositorio {
	async encontrarPelaInscEstadual(inscricaoEstadual: string): Promise<Empresa | null> {
		const empresa = await prisma.empresa.findUnique({
			where: {
				inscricaoEstadual
			}
		});

		return empresa;
	}

	async encontrarPeloCnpj(cnpj: string): Promise<Empresa | null> {
		const empresa = await prisma.empresa.findUnique({
			where: {
				cnpj
			}
		});

		return empresa;
	}

	async criarEmpresa(novaEmpresa: IEmpresaCriacaoDTO, usuarioId: number): Promise<Empresa> {
		const empresa = await prisma.empresa.create({
			data: {
				...novaEmpresa,
				nomeDoBanco: 'b' + novaEmpresa.cnpj,
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
				UsuarioEmpresa: {
					create: {
						usuarioId
					}
				}
			}
		});

		return empresa;
	}

	async listarEmpresas(usuarioId: number): Promise<Empresa[]> {
		const empresas = await prisma.empresa.findMany({
			where: {
				UsuarioEmpresa: {
					some: {
						usuarioId
					}
				}
			}
		});

		return empresas;
	}

}