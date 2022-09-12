import { Request, Response } from 'express';
import { IEmpresaCriacaoDTO } from '../../repositorios/IEmpresaRepositorio';
import { CriaEmpresaService } from './criaEmpresaService';

export class CriaEmpresaController {
	constructor(private criaEmpresaService: CriaEmpresaService) { }

	async handle(req: Request, res: Response) {
		const novaEmpresa: IEmpresaCriacaoDTO = {
			...req.body,
		};

		const usuarioEmail = res.get('usuarioEmail') as string;

		const empresa = await this.criaEmpresaService.execute(novaEmpresa, usuarioEmail);

		return res.status(201).json(empresa);
	}
}