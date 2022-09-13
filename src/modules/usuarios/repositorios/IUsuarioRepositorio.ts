import { Empresa, Usuario } from '@prisma/client';

interface IUsuarioEmpresaDTO {
	Empresa: Empresa
}

export interface IUsuarioRetorno {
	id: number;
	nome: string;
	sobrenome: string;
	email: string;
	fone: string;
	admin: boolean;
	situacao: string | null;
	dhCriacao: Date | null;
	dhAtualizacao: Date | null;
	UsuarioEmpresa: IUsuarioEmpresaDTO[];
}

export interface IUsuarioDTO extends Usuario {
	UsuarioEmpresa: IUsuarioEmpresaDTO[];
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
	email: string;
	nome: string;
	sobrenome: string;
}

export interface IUsuarioRepositorio {
	criarUsuario({ nome, sobrenome, email, senha, fone, empresaId }: IUsuarioCriacaoDTO): Promise<Usuario>
	encontrarPeloEmail(email: string): Promise<IUsuarioDTO | null>
	encontrarPeloFone(fone: string): Promise<IUsuarioRetorno | null>
	encontrarPeloId(id: number): Promise<IUsuarioRetorno | null>
	atualizarUsuario({ id, nome, sobrenome }: IUsuarioAtualizacaoDTO): Promise<Usuario>
	inativarUsuario(id: number): Promise<Usuario>
	reativarUsuario(id: number): Promise<Usuario>
	listarUsuariosPelaEmpresa(empresaId: number): Promise<Usuario[]>
}