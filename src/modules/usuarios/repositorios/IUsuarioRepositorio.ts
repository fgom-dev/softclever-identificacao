import { Empresa, Usuario } from '@prisma/client';

interface IUsuarioEmpresaDTO {
	Empresa: Empresa
}

export interface IUsuarioDTO extends Usuario {
	UsuarioEmpresa: IUsuarioEmpresaDTO[]
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
	criarUsuario({ nome, sobrenome, email, senha, fone, empresaId }: IUsuarioCriacaoDTO): Promise<Usuario>
	encontrarPeloEmail(email: string): Promise<IUsuarioDTO | null>
	encontrarPeloFone(fone: string): Promise<Usuario | null>
	encontrarPeloId(id: number): Promise<Usuario | null>
	atualizarUsuario({ id, nome, sobrenome }: IUsuarioAtualizacaoDTO): Promise<Usuario>
	inativarUsuario(id: number): Promise<Usuario>
	listarUsuariosPelaEmpresa(empresaId: number): Promise<Usuario[]>
}