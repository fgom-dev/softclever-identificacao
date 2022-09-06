import { CustomError } from '../../../../Errors/CustomError';
import { ValidarCnpj } from '../../../../providers/ValidarCNPJ';
import { IEmpresaCriacaoDTO, IEmpresaRepositorio } from '../../repositorios/IEmpresaRepositorio';

export class CriaEmpresaService {
	constructor(private empresaRepositorio: IEmpresaRepositorio) { }

	async execute(novaEmpresa: IEmpresaCriacaoDTO, usuarioId: number) {
		const validaCnpj = new ValidarCnpj();
		if (!validaCnpj.execute(novaEmpresa.cnpj)) {
			throw new CustomError(400, 'CNPJ inválido');
		}

		const empresa = await this.empresaRepositorio.criarEmpresa(novaEmpresa, usuarioId);

		return empresa;
	}
}