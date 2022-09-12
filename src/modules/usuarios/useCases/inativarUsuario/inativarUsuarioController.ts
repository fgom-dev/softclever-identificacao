import { Request, Response } from 'express';
import { InativarUsuarioService } from './inativarUsuarioService';

export class InativarUsuarioController {
	constructor(private inativarUsuarioService: InativarUsuarioService) { }

	async handle(req: Request, res: Response) {
		const { id } = req.params;

		const usuarioEmail = res.get('usuarioEmail') as string;

		const usuario = await this.inativarUsuarioService.execute(parseInt(id), usuarioEmail);

		return res.status(200).json(usuario);
	}
}