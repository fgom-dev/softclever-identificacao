import { sign } from 'jsonwebtoken';

export class GerarRefreshTokenProvider {
	async execute(usuarioId: number) {
		const refreshToken = sign({
			usuarioId: usuarioId
		}, process.env.SECRET as string, {
			expiresIn: '30d',
		});

		return refreshToken;
	}
}