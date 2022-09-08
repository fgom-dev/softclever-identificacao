import { Usuario } from '@prisma/client';

export interface IUsuarioParaRetorno {
	id: number;
	nome: string;
	sobrenome: string;
	email: string;
	situacao?: string;
	dhCriacao?: Date;
	dhAtualizacao?: Date;
}

export interface IUsuarioCriacaoDTO {
	nome: string;
	sobrenome: string;
	email: string;
	senha: string;
	fone: string;
	empresaId?: number;
}

export interface IUsuarioAtualizacaoDTO {
	id: number;
	nome: string;
	sobrenome: string;
}

export interface IUsuarioRepositorio {
	criarUsuario({ nome, sobrenome, email, senha, fone, empresaId }: IUsuarioCriacaoDTO): Promise<IUsuarioParaRetorno>
	encontrarPeloEmail(email: string): Promise<Usuario>
	encontrarPeloId(id: number): Promise<Usuario>
	usuarioExiste(email?: string, fone?: string): Promise<boolean>
	atualizarUsuario({ id, nome, sobrenome }: IUsuarioAtualizacaoDTO): Promise<IUsuarioParaRetorno>
	inativarUsuario(id: number): Promise<IUsuarioParaRetorno>
	listarUsuariosPelaEmpresa(empresaId: number): Promise<IUsuarioParaRetorno[]>
}