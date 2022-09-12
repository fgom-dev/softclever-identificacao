import { Request, Response } from 'express';
import { ListarEmpresasService } from './listarEmpresasService';

export class ListarEmpresasController {
	constructor(private listarEmpresasService: ListarEmpresasService) { }

	async handle(req: Request, res: Response) {
		const usuarioEmail = res.get('usuarioEmail') as string;

		const empresas = await this.listarEmpresasService.execute(usuarioEmail);

		return res.status(200).json(empresas);
	}
}