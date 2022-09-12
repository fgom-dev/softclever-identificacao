import { sign } from 'jsonwebtoken';
import { IUsuarioDTO } from '../modules/usuarios/repositorios/IUsuarioRepositorio';

export class GerarAccessTokenProvider {
	async execute(usuario: IUsuarioDTO) {

		const accessToken = sign({
			usuarioEmail: usuario.email
		}, process.env.SECRET as string, {
			expiresIn: '30m',
		});

		return accessToken;
	}
}