import { IUsuarioRepositorio, IUsuarioAtualizacaoDTO } from '../../repositorios/IUsuarioRepositorio';

export class AtualizarUsuarioService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute({ id, nome, sobrenome }: IUsuarioAtualizacaoDTO) {
		const usuario = await this.usuarioRepositorio.atualizarUsuario({ id, nome, sobrenome });

		return usuario;
	}
}