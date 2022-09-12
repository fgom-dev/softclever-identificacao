import { CustomError } from '../../../../Errors/CustomError';
import { ValidarCnpj } from '../../../../providers/ValidarCNPJ';
import { PrismaUsuarioRepositorio } from '../../../usuarios/repositorios/implementacoes/PrismaUsuarioRepositorio';
import { IEmpresaCriacaoDTO, IEmpresaRepositorio } from '../../repositorios/IEmpresaRepositorio';

export class CriaEmpresaService {
	constructor(private empresaRepositorio: IEmpresaRepositorio) { }

	async execute(novaEmpresa: IEmpresaCriacaoDTO, usuarioEmail: string) {
		const validaCnpj = new ValidarCnpj();

		if (!validaCnpj.execute(novaEmpresa.cnpj)) {
			throw new CustomError(400, 'CNPJ inválido');
		}

		const empresaExists = await this.empresaRepositorio.encontrarPeloCnpj(novaEmpresa.cnpj);

		if (empresaExists) {
			throw new CustomError(400, 'Empresa já existe');
		}

		const usuarioRepositorio = new PrismaUsuarioRepositorio();

		const usuario = await usuarioRepositorio.encontrarPeloEmail(usuarioEmail);

		if (!usuario) {
			throw new CustomError(404, 'Usuário não encontrado');
		}

		const empresa = await this.empresaRepositorio.criarEmpresa(novaEmpresa, usuario.id);

		return empresa;
	}
}