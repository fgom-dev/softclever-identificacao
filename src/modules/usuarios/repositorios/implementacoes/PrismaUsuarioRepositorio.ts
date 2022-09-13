import { Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../../../prisma/client';
import { IUsuarioCriacaoDTO, IUsuarioRepositorio, IUsuarioAtualizacaoDTO, IUsuarioRetorno, IUsuarioDTO } from '../IUsuarioRepositorio';


export class PrismaUsuarioRepositorio implements IUsuarioRepositorio {
	async reativarUsuario(id: number): Promise<Usuario> {
		const usuario = await prisma.usuario.update({
			where: {
				id,
			},
			data: {
				situacao: '1',
				dhAtualizacao: new Date(),
			}
		});

		return usuario;
	}

	async encontrarPeloFone(fone: string): Promise<IUsuarioRetorno | null> {
		const usuario = await prisma.usuario.findUnique({
			where: {
				fone
			},
			select: {
				id: true,
				nome: true,
				sobrenome: true,
				email: true,
				fone: true,
				admin: true,
				situacao: true,
				dhCriacao: true,
				dhAtualizacao: true,
				UsuarioEmpresa: {
					select: {
						Empresa: true
					}
				}
			}
		});

		return usuario;
	}

	async listarUsuariosPelaEmpresa(empresaId: number): Promise<Usuario[]> {
		const usuarios = prisma.usuario.findMany({
			where: {
				UsuarioEmpresa: {
					some: {
						empresaId
					}
				}
			}
		});

		return usuarios;
	}

	async criarUsuario({ nome, sobrenome, email, senha, fone, empresaId }: IUsuarioCriacaoDTO): Promise<Usuario> {

		const usuario = await prisma.usuario.create({
			data: {
				nome,
				sobrenome,
				email,
				senha: await bcrypt.hash(senha, parseInt(process.env.SALT_ROUND as string)),
				fone,
				admin: !empresaId,
			}
		});

		if (empresaId) {
			await prisma.usuarioEmpresa.create({
				data: {
					usuarioId: usuario.id,
					empresaId
				}
			});
		}

		return usuario;
	}

	async encontrarPeloEmail(email: string): Promise<IUsuarioDTO | null> {
		const usuario = await prisma.usuario.findUnique({
			where: {
				email
			},
			select: {
				id: true,
				nome: true,
				sobrenome: true,
				email: true,
				senha: true,
				fone: true,
				admin: true,
				situacao: true,
				dhCriacao: true,
				dhAtualizacao: true,
				UsuarioEmpresa: {
					select: {
						Empresa: true
					}
				}
			}
		});

		return usuario;
	}

	async encontrarPeloId(id: number): Promise<IUsuarioRetorno | null> {
		const usuario = await prisma.usuario.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				nome: true,
				sobrenome: true,
				email: true,
				fone: true,
				admin: true,
				situacao: true,
				dhCriacao: true,
				dhAtualizacao: true,
				UsuarioEmpresa: {
					select: {
						Empresa: true
					}
				}
			}
		});

		return usuario;
	}

	async atualizarUsuario({ id, nome, sobrenome }: IUsuarioAtualizacaoDTO): Promise<Usuario> {
		const usuario = await prisma.usuario.update({
			where: {
				id
			},
			data: {
				nome,
				sobrenome,
				dhAtualizacao: new Date(),
			}
		});

		return usuario;
	}

	async inativarUsuario(id: number): Promise<Usuario> {
		const usuario = await prisma.usuario.update({
			where: {
				id,
			},
			data: {
				situacao: '2',
				dhAtualizacao: new Date(),
			}
		});

		return usuario;
	}

}
