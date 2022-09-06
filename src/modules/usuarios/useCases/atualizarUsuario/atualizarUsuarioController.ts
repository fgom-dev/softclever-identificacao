import { Request, Response } from 'express';
import { AtualizarUsuarioService } from './atualizarUsuarioService';

export class AtualizarUsuarioController {
	constructor(private atualizarUsuarioService: AtualizarUsuarioService) { }

	async handle(req: Request, res: Response) {
		const { id } = req.params;
		const { nome, sobrenome } = req.body;

		const usuario = await this.atualizarUsuarioService.execute({ id: parseInt(id), nome, sobrenome });

		res.status(200).json(usuario);


	}
}