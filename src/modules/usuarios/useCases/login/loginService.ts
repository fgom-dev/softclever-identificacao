import { GerarTokenProvider } from '../../../../providers/GerarTokenProvider';

import { IUsuarioRepositorio, IUsuarioLoginDTO } from '../../repositorios/IUsuarioRepositorio';

export class LoginService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute({ email, senha }: IUsuarioLoginDTO): Promise<string> {

		const usuario = await this.usuarioRepositorio.login({ email, senha });

		const gerarTokenProvider = new GerarTokenProvider();

		const token = gerarTokenProvider.execute(usuario.id);

		return token;
	}
}