import { Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../../../../prisma/client';
import { IUsuarioCriacaoDTO, IUsuarioRepositorio, IUsuarioAtualizacaoDTO, IUsuarioDTO } from '../IUsuarioRepositorio';


export class PrismaUsuarioRepositorio implements IUsuarioRepositorio {
	async encontrarPeloFone(fone: string): Promise<Usuario | null> {
		const usuario = await prisma.usuario.findUnique({
			where: {
				fone
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
			include: {
				UsuarioEmpresa: {
					include: {
						Empresa: true
					}
				}
			}
		});

		return usuario;
	}

	async encontrarPeloId(id: number): Promise<Usuario | null> {
		const usuario = await prisma.usuario.findUnique({
			where: {
				id
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
