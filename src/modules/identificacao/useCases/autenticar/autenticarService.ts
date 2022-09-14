import { JwtPayload, verify } from 'jsonwebtoken';
import { CustomError } from '../../../../Errors/CustomError';

export class AutenticarService {
	execute(acessToken: string) {
		try {
			const jwt = verify(acessToken, process.env.SECRET as string, {
				complete: true
			});

			const payload = jwt.payload as JwtPayload;

			return payload;

		} catch (err) {
			throw new CustomError(401, 'Token inválido');
		}
	}
}