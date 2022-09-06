import { Usuario } from '@prisma/client';

export interface IUsuarioParaRetorno {
	id: number;
	nome: string;
	sobrenome: string;
	email: string;
	situacao: string;
	dhCriacao: Date;
	dhAtualizacao: Date;
}

export interface IUsuarioCriacaoDTO {
	nome: string;
	sobrenome: string;
	email: string;
	senha: string;
	celular: string;
}

export interface IUsuarioAtualizacaoDTO {
	id: number;
	nome: string;
	sobrenome: string;
}

export interface IUsuarioLoginDTO {
	email: string;
	senha: string;
}

export interface IUsuarioRepositorio {
	criarUsuario({ nome, sobrenome, email, senha, celular }: IUsuarioCriacaoDTO): Promise<IUsuarioParaRetorno>
	encontrarPeloEmail(email: string): Promise<Usuario>
	encontrarPeloId(id: number): Promise<Usuario>
	usuarioExiste(email?: string, celular?: string): Promise<boolean>
	login({ email, senha }: IUsuarioLoginDTO): Promise<Usuario>
	atualizarUsuario({ id, nome, sobrenome }: IUsuarioAtualizacaoDTO): Promise<IUsuarioParaRetorno>
	inativarUsuario(id: number): Promise<IUsuarioParaRetorno>
}