import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export function autenticarUsuario(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(400).json({
			error: 'Token está vazio',
		});
	}

	const [, token] = authToken.split(' ');

	try {
		const jwt = verify(token, process.env.SECRET as string, {
			complete: true
		});

		const payload = jwt.payload as JwtPayload;

		res.set({ usuarioId: payload.usuarioId, empresaId: payload.empresaId });

		return next();
	} catch (err) {
		return res.status(401).json({
			error: 'Token inválido',
		});
	}

}