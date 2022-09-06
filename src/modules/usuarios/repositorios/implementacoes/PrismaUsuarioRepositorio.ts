import { PrismaClient, Usuario, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CustomError } from '../../../../Errors/CustomError';
import { IUsuarioCriacaoDTO, IUsuarioLoginDTO, IUsuarioRepositorio, IUsuarioAtualizacaoDTO, IUsuarioParaRetorno } from '../IUsuarioRepositorio';

const prisma = new PrismaClient();

const usuarioParaRetorno = Prisma.validator<Prisma.UsuarioSelect>()({
	id: true,
	nome: true,
	sobrenome: true,
	email: true
});

export class PrismaUsuarioRepositorio implements IUsuarioRepositorio {
	async criarUsuario({ nome, sobrenome, email, senha, celular }: IUsuarioCriacaoDTO): Promise<IUsuarioParaRetorno> {
		const usuarioJaExiste = await this.usuarioExiste(email, celular);

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
					celular
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

	async usuarioExiste(email?: string, celular?: string): Promise<boolean> {
		const usuarioCont = await prisma.usuario.count({
			where: {
				OR: [
					{
						email: {
							equals: email,
						}
					},
					{
						celular: {
							equals: celular,
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

	async login({ email, senha }: IUsuarioLoginDTO): Promise<Usuario> {
		try {
			const usuario = await this.encontrarPeloEmail(email);

			const match = await bcrypt.compare(senha, usuario.senha);

			if (!match) {
				throw new CustomError(403, 'Email ou senha incorretos');
			}

			return usuario;
		} catch (err) {
			if (err instanceof CustomError) {
				throw new CustomError(403, 'Email ou senha incorretos');
			}

			throw err;
		}
	}
}
