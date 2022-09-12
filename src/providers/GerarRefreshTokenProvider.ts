import { sign } from 'jsonwebtoken';
import { IUsuarioDTO } from '../modules/usuarios/repositorios/IUsuarioRepositorio';

export class GerarRefreshTokenProvider {
	async execute(usuario: IUsuarioDTO) {
		const refreshToken = sign({
			usuarioEmail: usuario.email
		}, process.env.SECRET as string, {
			expiresIn: '30d',
		});

		return refreshToken;
	}
}