import { CustomError } from '../../../../Errors/CustomError';
import { PrismaEmpresaRepositorio } from '../../../empresas/repositorios/implementacoes/PrismaEmpresaRepositorio';
import { IUsuarioRepositorio } from '../../repositorios/IUsuarioRepositorio';

export class ListarUsuariosPelaEmpresaService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute(empresaCnpj: string) {
		if (!empresaCnpj) {
			throw new CustomError(404, 'Usuário não pertence a nenhuma empresa');
		}

		const empresaRepositorio = new PrismaEmpresaRepositorio();

		const empresa = await empresaRepositorio.encontrarPeloCnpj(empresaCnpj);

		if (!empresa) {
			throw new CustomError(404, 'Empresa não encontrada');
		}

		const usuarios = await this.usuarioRepositorio.listarUsuariosPelaEmpresa(empresa.id);

		return usuarios;
	}
}