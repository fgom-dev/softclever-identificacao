import { GerarTokenProvider } from '../../../../providers/GerarTokenProvider';
import { IIdentificacaoRepositorio, ILoginDTO } from '../../repositorios/IIdentificacaoRepositorio';

export class LoginService {
	constructor(private identificacaoRepositorio: IIdentificacaoRepositorio) { }

	async execute({ cnpj, email, senha }: ILoginDTO): Promise<string> {
		const login = await this.identificacaoRepositorio.login({ cnpj, email, senha });

		const gerarTokenProvider = new GerarTokenProvider();

		const token = gerarTokenProvider.execute(login.usuarioId, login.empresaId);

		return token;
	}
}