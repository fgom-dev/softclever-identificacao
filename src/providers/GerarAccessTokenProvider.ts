import { Empresa } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { IUsuarioDTO } from '../modules/usuarios/repositorios/IUsuarioRepositorio';

export class GerarAccessTokenProvider {
	async execute(usuario: IUsuarioDTO, empresa: Empresa | undefined) {

		const accessToken = sign({
			usuarioEmail: usuario.email,
			empresaCnpj: empresa?.cnpj,
			nomeBanco: empresa?.nomeDoBanco
		}, process.env.SECRET as string, {
			expiresIn: '1h',
		});

		return accessToken;
	}
}