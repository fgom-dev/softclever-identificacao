import { Request, Response } from 'express';
import { IEmpresaCriacaoDTO } from '../../repositorios/IEmpresaRepositorio';
import { CriaEmpresaService } from './criaEmpresaService';

export class CriaEmpresaController {
	constructor(private criaEmpresaService: CriaEmpresaService) { }

	async handle(req: Request, res: Response) {
		const novaEmpresa: IEmpresaCriacaoDTO = {
			...req.body,
		};

		const usuarioId = parseInt(res.get('usuarioId') as string);

		const empresa = await this.criaEmpresaService.execute(novaEmpresa, usuarioId);

		return res.status(201).json(empresa);
	}
}