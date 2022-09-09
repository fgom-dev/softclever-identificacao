import { Usuario } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export class GerarAccessTokenProvider {
	async execute(usuario: Usuario) {
		const accessToken = sign({
			usuarioEmail: usuario.email,
			empresaCnpj: usuario.UsuarioEmpresa.Empresa.cnpj
		}, process.env.SECRET as string, {
			expiresIn: '30m',
		});

		return accessToken;
	}
}