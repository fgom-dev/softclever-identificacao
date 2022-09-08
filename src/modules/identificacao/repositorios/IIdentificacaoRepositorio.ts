export interface ILoginDTO {
	cnpj: string;
	email: string;
	senha: string;
}

export interface IRetornoLogin {
	usuarioId: number;
	empresaId?: number;
}

export interface IIdentificacaoRepositorio {
	login({ cnpj, email, senha }: ILoginDTO): Promise<IRetornoLogin>
}