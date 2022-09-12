import { Request, Response } from 'express';
import { ListarUsuariosPelaEmpresaService } from './listarUsuariosPelaEmpresaService';

export class ListarUsuariosPelaEmpresaController {
	constructor(private listarUsuariosPelaEmpresaService: ListarUsuariosPelaEmpresaService) { }

	async handle(req: Request, res: Response) {
		const empresaCnpj = res.get('empresaCnpj') as string;

		const usuarios = await this.listarUsuariosPelaEmpresaService.execute(empresaCnpj);

		res.status(200).json(usuarios);
	}
}