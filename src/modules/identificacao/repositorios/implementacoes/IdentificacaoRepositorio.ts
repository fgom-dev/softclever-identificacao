import bcrypt from 'bcrypt';
import { CustomError } from '../../../../Errors/CustomError';

import { PrismaEmpresaRepositorio } from '../../../empresas/repositorios/implementacoes/PrismaEmpresaRepositorio';
import { PrismaUsuarioRepositorio } from '../../../usuarios/repositorios/implementacoes/PrismaUsuarioRepositorio';
import { IIdentificacaoRepositorio, ILoginDTO, IRetornoLogin } from '../IIdentificacaoRepositorio';

export class IdentificacaoRepositorio implements IIdentificacaoRepositorio {
	async login({ cnpj, email, senha }: ILoginDTO): Promise<IRetornoLogin> {
		let empresa;

		if (cnpj) {
			const empresaRepositorio = new PrismaEmpresaRepositorio();
			empresa = await empresaRepositorio.encontrarPeloCnpj(cnpj);
		}

		const usuarioRepositorio = new PrismaUsuarioRepositorio();

		const usuario = await usuarioRepositorio.encontrarPeloEmail(email);

		const match = await bcrypt.compare(senha, usuario.senha);

		if (!match) {
			throw new CustomError(403, 'Email ou senha incorretos');
		}

		return { usuarioId: usuario.id, empresaId: empresa?.id };
	}

}