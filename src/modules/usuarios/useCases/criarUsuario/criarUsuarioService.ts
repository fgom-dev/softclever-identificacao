import { IUsuarioCriacaoDTO, IUsuarioRepositorio, IUsuarioParaRetorno } from '../../repositorios/IUsuarioRepositorio';

export class CriarUsuarioService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute({ nome, sobrenome, email, senha, celular }: IUsuarioCriacaoDTO): Promise<IUsuarioParaRetorno> {
		const usuario = await this.usuarioRepositorio.criarUsuario({ nome, sobrenome, email, senha, celular });

		return usuario;
	}
}