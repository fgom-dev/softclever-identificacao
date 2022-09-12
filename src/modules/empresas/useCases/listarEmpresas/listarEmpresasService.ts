import { CustomError } from '../../../../Errors/CustomError';
import { PrismaUsuarioRepositorio } from '../../../usuarios/repositorios/implementacoes/PrismaUsuarioRepositorio';
import { IEmpresaRepositorio } from '../../repositorios/IEmpresaRepositorio';

export class ListarEmpresasService {
	constructor(private empresaRepositorio: IEmpresaRepositorio) { }

	async execute(usuarioEmail: string) {
		const usuarioRepositorio = new PrismaUsuarioRepositorio();

		const usuario = await usuarioRepositorio.encontrarPeloEmail(usuarioEmail);

		if (!usuario) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		const empresas = await this.empresaRepositorio.listarEmpresas(usuario.id);

		return empresas;
	}
}