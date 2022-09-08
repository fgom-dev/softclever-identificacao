import { PrismaClient, Usuario, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CustomError } from '../../../../Errors/CustomError';
import { IUsuarioCriacaoDTO, IUsuarioRepositorio, IUsuarioAtualizacaoDTO, IUsuarioParaRetorno } from '../IUsuarioRepositorio';

const prisma = new PrismaClient();

const usuarioParaRetorno = Prisma.validator<Prisma.UsuarioSelect>()({
	id: true,
	nome: true,
	sobrenome: true,
	email: true
});

export class PrismaUsuarioRepositorio implements IUsuarioRepositorio {
	listarUsuariosPelaEmpresa(empresaId: number): Promise<IUsuarioParaRetorno[]> {
		const usuarios = prisma.usuario.findMany({
			where: {
				UsuarioEmpresa: {
					some: {
						empresaId
					}
				}
			},
			select: usuarioParaRetorno
		});

		return usuarios;
	}

	async criarUsuario({ nome, sobrenome, email, senha, fone, empresaId }: IUsuarioCriacaoDTO): Promise<IUsuarioParaRetorno> {
		const usuarioJaExiste = await this.usuarioExiste(email, fone);

		if (usuarioJaExiste) {
			throw new CustomError(409, 'Usuário já existe');
		}

		try {
			const usuario = await prisma.usuario.create({
				data: {
					nome,
					sobrenome,
					email,
					senha: await bcrypt.hash(senha, parseInt(process.env.SALT_ROUND as string)),
					fone,
					admin: !empresaId,
					UsuarioEmpresa: {
						create: {
							empresaId: empresaId ?? 0
						}
					}
				},
				select: usuarioParaRetorno
			});

			return usuario;

		} catch (err) {
			if (err instanceof Prisma.PrismaClientValidationError) {
				throw new CustomError(400, 'Bad request');
			}

			throw err;
		}
	}

	async encontrarPeloEmail(email: string): Promise<Usuario> {
		const usuario = await prisma.usuario.findUnique({
			where: {
				email
			}
		});

		if (!usuario) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		return usuario;
	}

	async encontrarPeloId(id: number): Promise<Usuario> {
		const usuario = await prisma.usuario.findUnique({
			where: {
				id
			}
		});

		if (!usuario) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		return usuario;
	}

	async usuarioExiste(email?: string, fone?: string): Promise<boolean> {
		const usuarioCont = await prisma.usuario.count({
			where: {
				OR: [
					{
						email: {
							equals: email,
						}
					},
					{
						fone: {
							equals: fone,
						}
					}
				]
			}
		});

		return usuarioCont > 0;
	}

	async atualizarUsuario({ id, nome, sobrenome }: IUsuarioAtualizacaoDTO): Promise<IUsuarioParaRetorno> {
		await this.encontrarPeloId(id);

		const usuario = await prisma.usuario.update({
			where: {
				id
			},
			data: {
				nome,
				sobrenome,
				dhAtualizacao: new Date(),
			},
			select: usuarioParaRetorno
		});

		return usuario;
	}

	async inativarUsuario(id: number): Promise<IUsuarioParaRetorno> {
		await this.encontrarPeloId(id);

		const usuario = await prisma.usuario.update({
			where: {
				id,
			},
			data: {
				situacao: '2',
				dhAtualizacao: new Date(),
			},
			select: usuarioParaRetorno
		});

		return usuario;
	}

}
