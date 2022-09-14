import { Request, Response } from 'express';
import { AutenticarService } from './autenticarService';

export class AutenticarController {
	constructor(private autenticarService: AutenticarService) { }

	handle(req: Request, res: Response) {
		const authToken = req.headers.authorization;

		if (!authToken) {
			return res.status(400).json({
				error: 'Token está vazio',
			});
		}

		const [, token] = authToken.split(' ');

		const response = this.autenticarService.execute(token);

		return res.status(200).json(response);
	}
}