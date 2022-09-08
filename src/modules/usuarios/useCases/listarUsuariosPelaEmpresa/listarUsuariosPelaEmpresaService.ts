import { IUsuarioRepositorio } from '../../repositorios/IUsuarioRepositorio';

export class ListarUsuariosPelaEmpresaService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute(empresaId: number) {
		const usuarios = await this.usuarioRepositorio.listarUsuariosPelaEmpresa(empresaId);

		return usuarios;
	}
}