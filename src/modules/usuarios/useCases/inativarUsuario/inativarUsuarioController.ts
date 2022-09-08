import { Request, Response } from 'express';
import { CustomError } from '../../../../Errors/CustomError';
import { InativarUsuarioService } from './inativarUsuarioService';

export class InativarUsuarioController {
	constructor(private inativarUsuarioService: InativarUsuarioService) { }

	async handle(req: Request, res: Response) {
		const { id } = req.params;

		const usuarioId = res.get('usuarioId') as string;

		if (usuarioId !== id) {
			throw new CustomError(401, 'Não autorizado');
		}

		const user = await this.inativarUsuarioService.execute(parseInt(id));

		return res.status(200).json(user);
	}
}