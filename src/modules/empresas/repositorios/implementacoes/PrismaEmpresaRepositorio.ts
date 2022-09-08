import { Empresa, PrismaClient } from '@prisma/client';
import { IEmpresaCriacaoDTO, IEmpresaRepositorio } from '../IEmpresaRepositorio';

const prisma = new PrismaClient();

export class PrismaEmpresaRepositorio implements IEmpresaRepositorio {
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