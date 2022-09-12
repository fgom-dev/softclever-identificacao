import { Request, Response } from 'express';
import { AtualizarUsuarioService } from './atualizarUsuarioService';

export class AtualizarUsuarioController {
	constructor(private atualizarUsuarioService: AtualizarUsuarioService) { }

	async handle(req: Request, res: Response) {
		const { id } = req.params;
		const { nome, sobrenome } = req.body;

		const usuarioEmail = res.get('usuarioEmail') as string;

		const usuario = await this.atualizarUsuarioService.execute({
			id: parseInt(id),
			email: usuarioEmail,
			nome,
			sobrenome,
		});

		res.status(200).json(usuario);
	}
}