import { Empresa } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { IUsuarioDTO } from '../modules/usuarios/repositorios/IUsuarioRepositorio';

export class GerarRefreshTokenProvider {
	async execute(usuario: IUsuarioDTO, empresa: Empresa | undefined) {
		const refreshToken = sign({
			usuarioEmail: usuario.email,
			empresaCnpj: empresa?.cnpj
		}, process.env.SECRET as string, {
			expiresIn: '30d',
		});

		return refreshToken;
	}
}