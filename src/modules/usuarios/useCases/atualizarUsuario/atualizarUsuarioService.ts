import { CustomError } from '../../../../Errors/CustomError';
import { IUsuarioRepositorio, IUsuarioAtualizacaoDTO } from '../../repositorios/IUsuarioRepositorio';

export class AtualizarUsuarioService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute({ id, email, nome, sobrenome }: IUsuarioAtualizacaoDTO) {
		const usuario = await this.usuarioRepositorio.encontrarPeloId(id);

		if (!usuario) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		if (usuario.email !== email) {
			throw new CustomError(400, 'Não autorizado');
		}

		const usuarioAtualizado = await this.usuarioRepositorio.atualizarUsuario({ id, email, nome, sobrenome });

		return usuarioAtualizado;
	}
}