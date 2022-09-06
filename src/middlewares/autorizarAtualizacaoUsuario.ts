import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomError } from '../Errors/CustomError';

export function autorizarAtualizacaoUsuario(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;
	const { id } = req.params;

	if (!authToken) {
		return res.status(400).json({
			error: 'Token está vazio',
		});
	}

	const [, token] = authToken.split(' ');

	const jwt = verify(token, process.env.SECRET as string, {
		complete: true
	});

	if (!jwt) {
		throw new CustomError(401, 'Token invalido');
	}

	if (jwt.payload.sub !== id) {
		throw new CustomError(401, 'Não autorizado');
	}

	return next();

}