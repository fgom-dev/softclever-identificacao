import { CustomError } from '../../../../Errors/CustomError';
import { IUsuarioRepositorio, IUsuarioAtualizacaoDTO } from '../../repositorios/IUsuarioRepositorio';

export class AtualizarUsuarioService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute({ id, nome, sobrenome }: IUsuarioAtualizacaoDTO) {
		if (!await this.usuarioRepositorio.encontrarPeloId(id)) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		const usuario = await this.usuarioRepositorio.atualizarUsuario({ id, nome, sobrenome });

		return usuario;
	}
}