import { CustomError } from '../../../../Errors/CustomError';
import { IUsuarioRepositorio } from '../../repositorios/IUsuarioRepositorio';

export class ListarUsuariosPelaEmpresaService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute(empresaId: number) {
		if (!empresaId) {
			throw new CustomError(404, 'Usuário não pertence a nenhuma empresa');
		}

		const usuarios = await this.usuarioRepositorio.listarUsuariosPelaEmpresa(empresaId);

		return usuarios;
	}
}