import { CustomError } from '../../../../Errors/CustomError';
import { IUsuarioCriacaoDTO, IUsuarioRepositorio, IUsuarioParaRetorno } from '../../repositorios/IUsuarioRepositorio';

export class CriarUsuarioService {
	constructor(private usuarioRepositorio: IUsuarioRepositorio) { }

	async execute({ nome, sobrenome, email, senha, celular }: IUsuarioCriacaoDTO): Promise<IUsuarioParaRetorno> {
		const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const regexSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
		const regexFone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

		if (!regexEmail.test(email)) {
			throw new CustomError(400, 'Email inválido');
		}

		if (!regexSenha.test(senha)) {
			throw new CustomError(400, 'Senha inválida');
		}

		if (!regexFone.test(celular)) {
			throw new CustomError(400, 'Celular inválido');
		}

		const usuario = await this.usuarioRepositorio.criarUsuario({ nome, sobrenome, email, senha, celular });

		return usuario;
	}
}