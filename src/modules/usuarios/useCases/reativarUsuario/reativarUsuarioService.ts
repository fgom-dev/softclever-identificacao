import { CustomError } from '../../../../Errors/CustomError';
import { IUsuarioRepositorio } from '../../repositorios/IUsuarioRepositorio';

export class ReativarUsuarioService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute(id: number, email: string) {
		if (!await this.usuarioRepositorio.encontrarPeloId(id)) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		const usuario = await this.usuarioRepositorio.encontrarPeloEmail(email);

		if (!usuario) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		if (usuario.id !== id) {
			throw new CustomError(400, 'Não autorizado');
		}

		const usuarioReativado = await this.usuarioRepositorio.reativarUsuario(id);

		return usuarioReativado;
	}
}