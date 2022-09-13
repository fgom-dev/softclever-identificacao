import bcrypt from 'bcrypt';

import { CustomError } from '../../../../Errors/CustomError';
import { GerarAccessTokenProvider } from '../../../../providers/GerarAccessTokenProvider';
import { GerarRefreshTokenProvider } from '../../../../providers/GerarRefreshTokenProvider';
import { PrismaEmpresaRepositorio } from '../../../empresas/repositorios/implementacoes/PrismaEmpresaRepositorio';
import { PrismaUsuarioRepositorio } from '../../../usuarios/repositorios/implementacoes/PrismaUsuarioRepositorio';
import { ILoginDTO } from '../../repositorios/IIdentificacaoRepositorio';

interface IRetornoLogin {
	accessToken: string;
	refreshToken: string;
}

export class LoginService {
	async execute({ cnpj, email, senha }: ILoginDTO): Promise<IRetornoLogin> {
		const usuarioRepositorio = new PrismaUsuarioRepositorio();

		const usuario = await usuarioRepositorio.encontrarPeloEmail(email);

		if (!usuario) {
			throw new CustomError(400, 'CNPJ, Email ou Senha incorretos');
		}

		let empresa;

		if (cnpj) {
			if (!usuario.UsuarioEmpresa.find(usuarioEmpresa => usuarioEmpresa.Empresa.cnpj === cnpj)) {
				throw new CustomError(400, 'CNPJ, Email ou Senha incorretos');
			}

			const empresaRepositorio = new PrismaEmpresaRepositorio();

			empresa = await empresaRepositorio.encontrarPeloCnpj(cnpj);

			if (!empresa) {
				throw new CustomError(400, 'CNPJ, Email ou Senha incorretos');
			}
		}

		const match = await bcrypt.compare(senha, usuario.senha as string);

		if (!match) {
			throw new CustomError(400, 'CNPJ, Email ou Senha incorretos');
		}

		const gerarAccessTokenProvider = new GerarAccessTokenProvider();

		const accessToken = await gerarAccessTokenProvider.execute(usuario, empresa);

		const gerarRefreshTokenProvider = new GerarRefreshTokenProvider();

		const refreshToken = await gerarRefreshTokenProvider.execute(usuario, empresa);

		return { accessToken, refreshToken };
	}
}