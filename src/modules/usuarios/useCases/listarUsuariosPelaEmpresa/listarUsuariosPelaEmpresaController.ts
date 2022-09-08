import { Request, Response } from 'express';
import { ListarUsuariosPelaEmpresaService } from './listarUsuariosPelaEmpresaService';

export class ListarUsuariosPelaEmpresaController {
	constructor(private listarUsuariosPelaEmpresaService: ListarUsuariosPelaEmpresaService) { }

	async handle(req: Request, res: Response) {
		const empresaId = parseInt(res.get('empresaId') as string);

		const usuarios = await this.listarUsuariosPelaEmpresaService.execute(empresaId);

		res.status(200).json(usuarios);
	}
}