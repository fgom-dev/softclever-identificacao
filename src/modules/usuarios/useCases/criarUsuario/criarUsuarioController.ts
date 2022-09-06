import { Request, Response } from 'express';
import { IUsuarioCriacaoDTO } from '../../repositorios/IUsuarioRepositorio';
import { CriarUsuarioService } from './criarUsuarioService';


export class CriarUsuarioController {
	constructor(private criarUsuarioService: CriarUsuarioService) { }

	async handle(req: Request, res: Response) {
		const reqUser: IUsuarioCriacaoDTO = req.body;

		const user = await this.criarUsuarioService.execute(reqUser);

		return res.status(201).json(user);
	}
}