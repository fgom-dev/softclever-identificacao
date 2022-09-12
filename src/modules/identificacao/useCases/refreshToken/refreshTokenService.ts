import { JwtPayload, verify } from 'jsonwebtoken';
import { CustomError } from '../../../../Errors/CustomError';
import { GerarAccessTokenProvider } from '../../../../providers/GerarAccessTokenProvider';
import { GerarRefreshTokenProvider } from '../../../../providers/GerarRefreshTokenProvider';
import { PrismaUsuarioRepositorio } from '../../../usuarios/repositorios/implementacoes/PrismaUsuarioRepositorio';

interface IRetornoToken {
	accessToken: string;
	refreshToken: string;
}

export class RefreshTokenService {
	async execute(refreshToken: string): Promise<IRetornoToken> {

		const jwt = verify(refreshToken, process.env.SECRET as string, {
			complete: true
		});

		if (!jwt) {
			throw new CustomError(403, 'Token inválido');
		}

		const payload = jwt.payload as JwtPayload;

		const usuarioRepositorio = new PrismaUsuarioRepositorio();

		const usuario = await usuarioRepositorio.encontrarPeloEmail(payload.usuarioEmail);

		if (!usuario) {
			throw new CustomError(403, 'Token inválido');
		}

		const gerarAccessTokenProvider = new GerarAccessTokenProvider();

		const accessToken = await gerarAccessTokenProvider.execute(usuario);

		const gerarRefreshTokenProvider = new GerarRefreshTokenProvider();

		const newRefreshToken = await gerarRefreshTokenProvider.execute(usuario);

		return { accessToken, refreshToken: newRefreshToken };

	}
}