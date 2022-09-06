import { sign } from 'jsonwebtoken';

export class GerarTokenProvider {
	async execute(id: number) {
		const token = sign({}, process.env.SECRET as string, {
			subject: String(id),
			expiresIn: '30m',
		});

		return token;
	}
}