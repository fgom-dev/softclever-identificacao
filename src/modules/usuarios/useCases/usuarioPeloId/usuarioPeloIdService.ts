import { IUsuarioRepositorio } from '../../repositorios/IUsuarioRepositorio';

export class UsuarioPeloIdService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute(id: number) {
		const usuario = await this.usuarioRepositorio.encontrarPeloId(id);

		return usuario;
	}
}