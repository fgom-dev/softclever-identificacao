import { Usuario } from '@prisma/client';
import { PrismaUsuarioRepositorio } from '../../../usuarios/repositorios/implementacoes/PrismaUsuarioRepositorio';
import { IIdentificacaoRepositorio, ILoginDTO } from '../IIdentificacaoRepositorio';

export class IdentificacaoRepositorio implements IIdentificacaoRepositorio {
	async login({ cnpj, email, senha }: ILoginDTO): Promise<Usuario | null> {
		const usuarioRepositorio = new PrismaUsuarioRepositorio();

		const usuario = await usuarioRepositorio.encontrarPeloEmail(email);

		return usuario;
	}

}