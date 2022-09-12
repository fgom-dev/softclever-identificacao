import { JwtPayload, verify } from 'jsonwebtoken';
import { CustomError } from '../../../../Errors/CustomError';
import { GerarAccessTokenProvider } from '../../../../providers/GerarAccessTokenProvider';
import { GerarRefreshTokenProvider } from '../../../../providers/GerarRefreshTokenProvider';
import { PrismaEmpresaRepositorio } from '../../../empresas/repositorios/implementacoes/PrismaEmpresaRepositorio';
import { PrismaUsuarioRepositorio } from '../../../usuarios/repositorios/implementacoes/PrismaUsuarioRepositorio';

interface IRetornoToken {
	accessToken: string;
	refreshToken: string;
}

export class RefreshTokenService {
	async execute(refreshToken: string): Promise<IRetornoToken> {

		const [, token] = refreshToken.split(' ');

		let jwt;

		try {
			jwt = verify(token, process.env.SECRET as string, {
				complete: true
			});
		} catch (err) {
			throw new CustomError(403, 'Token inválido');
		}

		const payload = jwt.payload as JwtPayload;

		const usuarioRepositorio = new PrismaUsuarioRepositorio();

		const usuario = await usuarioRepositorio.encontrarPeloEmail(payload.usuarioEmail);

		if (!usuario) {
			throw new CustomError(403, 'Token inválido');
		}

		let empresa;

		if (payload.cnpj) {
			const empresaRepositorio = new PrismaEmpresaRepositorio();

			empresa = await empresaRepositorio.encontrarPeloCnpj(payload.cnpj);

			if (!empresa) {
				throw new CustomError(403, 'Token inválido');
			}
		}

		const gerarAccessTokenProvider = new GerarAccessTokenProvider();

		const accessToken = await gerarAccessTokenProvider.execute(usuario, empresa);

		const gerarRefreshTokenProvider = new GerarRefreshTokenProvider();

		const newRefreshToken = await gerarRefreshTokenProvider.execute(usuario, empresa);

		return { accessToken, refreshToken: newRefreshToken };

	}
}