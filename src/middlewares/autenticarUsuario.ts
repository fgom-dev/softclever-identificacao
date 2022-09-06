import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function autenticarUsuaio(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(400).json({
			error: 'Token está vazio',
		});
	}

	const [, token] = authToken.split(' ');

	try {
		verify(token, process.env.SECRET as string, {
			complete: true
		});

		return next();
	} catch (err) {
		return res.status(401).json({
			error: 'Token inválido',
		});
	}

}