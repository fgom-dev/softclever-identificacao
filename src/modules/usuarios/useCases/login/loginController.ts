import { Request, Response } from 'express';
import { LoginService } from './loginService';

export class LoginController {
	constructor(private loginService: LoginService) { }

	async handle(req: Request, res: Response) {
		const { email, senha } = req.headers;

		const token = await this.loginService.execute({ email: email as string, senha: senha as string });

		res.status(200).json({ token: token });
	}
}