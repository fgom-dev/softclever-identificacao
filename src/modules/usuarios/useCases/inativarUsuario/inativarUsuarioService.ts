import { IUsuarioRepositorio } from '../../repositorios/IUsuarioRepositorio';

export class InativarUsuarioService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute(id: number) {
		const usuario = await this.usuarioRepositorio.inativarUsuario(id);

		return usuario;
	}
}