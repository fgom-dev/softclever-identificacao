import { Request, Response } from 'express';
import { ListarEmpresasService } from './listarEmpresasService';

export class ListarEmpresasController {
	constructor(private listarEmpresasService: ListarEmpresasService) { }

	async handle(req: Request, res: Response) {
		const usuarioId = parseInt(res.get('usuarioId') as string);

		const empresas = await this.listarEmpresasService.execute(usuarioId);

		return res.status(200).json(empresas);
	}
}