import { Request, Response } from 'express';
import { UsuarioPeloIdService } from './usuarioPeloIdService';

export class UsuarioPeloIdController {
	constructor(private usuarioPeloIdService: UsuarioPeloIdService) { }

	async handle(req: Request, res: Response) {
		const { id } = req.params;

		const usuario = await this.usuarioPeloIdService.execute(parseInt(id));

		return res.status(200).json(usuario);
	}
}