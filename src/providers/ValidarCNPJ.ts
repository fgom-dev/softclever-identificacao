export class ValidarCnpj {
	execute(cnpj: string): boolean {
		let peso = 2;
		let soma = 0;
		for (let i = 7; i > 0; i--) {
			soma += parseInt(cnpj[i]) * peso;
			peso = peso === 9 ? 2 : peso++;
		}

		let dig13 = 11 - (soma % 11);
		dig13 = dig13 >= 10 ? 0 : dig13;

		soma = 0;
		for (let i = 12; i > 0; i--) {
			soma += parseInt(cnpj[i]) * peso;
			peso = peso === 9 ? 2 : peso++;
		}

		let dig14 = 11 - (soma % 11);
		dig14 = dig14 >= 10 ? 0 : dig14;

		return (dig13 !== parseInt(cnpj[12])) && (dig14 !== parseInt(cnpj[13]));

	}
}