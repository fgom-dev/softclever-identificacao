import { CustomError } from '../../../../Errors/CustomError';
import { IUsuarioRepositorio } from '../../repositorios/IUsuarioRepositorio';

export class InativarUsuarioService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute(id: number) {
		if (!await this.usuarioRepositorio.encontrarPeloId(id)) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		const usuario = await this.usuarioRepositorio.inativarUsuario(id);

		return usuario;
	}
}