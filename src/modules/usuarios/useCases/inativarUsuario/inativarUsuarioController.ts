import { Request, Response } from 'express';
import { InativarUsuarioService } from './inativarUsuarioService';

export class InativarUsuarioController {
	constructor(private inativarUsuarioService: InativarUsuarioService) { }

	async handle(req: Request, res: Response) {
		const { id } = req.params;

		const user = await this.inativarUsuarioService.execute(parseInt(id));

		return res.status(200).json(user);
	}
}