import { Empresa } from '@prisma/client';

export interface IGrupoCriacaoDTO {
	descricao: string;
}

export interface IContatoCriacaoDTO {
	descricao: string;
	contato: string;
}

export interface IEnderecoCriacaoDTO {
	descricao: string;
	logradouro: string;
	numero: string;
	complemento?: string;
	bairro: string;
	municipio: string;
	codMunicipio: string;
	UF: string;
	cep: string;
}

export interface IEmpresaCriacaoDTO {
	cnpj: string;
	razaoSocial: string;
	fantasia: string;
	regimeTributario: string;
	inscricaoEstadual: string;
	Enderecos?: IEnderecoCriacaoDTO[];
	Contatos?: IContatoCriacaoDTO[];
	Grupos?: IGrupoCriacaoDTO[];
}

export interface IEmpresaRepositorio {
	criarEmpresa(novaEmpresa: IEmpresaCriacaoDTO, usuarioId: number): Promise<Empresa>
	listarEmpresas(usuarioId: number): Promise<Empresa[]>
}