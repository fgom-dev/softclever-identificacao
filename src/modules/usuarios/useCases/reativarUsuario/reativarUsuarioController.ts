import { Request, Response } from 'express';
import { ReativarUsuarioService } from './reativarUsuarioService';

export class ReativarUsuarioController {
	constructor(private reativarUsuarioService: ReativarUsuarioService) { }

	async handle(req: Request, res: Response) {
		const { id } = req.params;

		const usuarioEmail = res.get('usuarioEmail') as string;

		const usuario = await this.reativarUsuarioService.execute(parseInt(id), usuarioEmail);

		return res.status(200).json(usuario);
	}
}