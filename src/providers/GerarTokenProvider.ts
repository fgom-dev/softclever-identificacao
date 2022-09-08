import { sign } from 'jsonwebtoken';

export class GerarTokenProvider {
	async execute(usuarioId: number, empresaId: number | undefined) {
		const token = sign({
			usuarioId: usuarioId,
			empresaId: empresaId
		}, process.env.SECRET as string, {
			expiresIn: '30m',
		});

		return token;
	}
}