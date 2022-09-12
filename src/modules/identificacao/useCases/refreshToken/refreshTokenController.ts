import { Request, Response } from 'express';
import { RefreshTokenService } from './refreshTokenService';

export class RefreshTokenController {
	constructor(private refreshTokenService: RefreshTokenService) { }

	async handle(req: Request, res: Response) {
		const authToken = req.headers.authorization;

		if (!authToken) {
			return res.status(400).json({
				error: 'Token está vazio',
			});
		}

		const tokens = await this.refreshTokenService.execute(authToken as string);

		res.status(200).json(tokens);
	}
}