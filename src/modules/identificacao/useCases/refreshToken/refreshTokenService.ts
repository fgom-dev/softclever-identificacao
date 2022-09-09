import { verify } from 'jsonwebtoken';
import { CustomError } from '../../../../Errors/CustomError';
import { GerarAccessTokenProvider } from '../../../../providers/GerarAccessTokenProvider';

export class RefreshTokenService {
	execute(refreshToken: string) {

		if (!verify(refreshToken, process.env.SECRET as string)) {
			throw new CustomError(403, 'Token inválido');
		}

		const gerarAccessTokenProvider = new GerarAccessTokenProvider();

		// gerarAccessTokenProvider.execute();

	}
}