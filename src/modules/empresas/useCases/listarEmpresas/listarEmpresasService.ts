import { IEmpresaRepositorio } from '../../repositorios/IEmpresaRepositorio';

export class ListarEmpresasService {
	constructor(private empresaRepositorio: IEmpresaRepositorio) { }

	async execute(usuarioId: number) {
		const empresas = await this.empresaRepositorio.listarEmpresas(usuarioId);

		return empresas;
	}
}