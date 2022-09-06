import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';
import { CustomError } from './Errors/CustomError';

const app = express();

app.use(express.json());

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof CustomError) {
		res.status(error.statusCode).json({
			status: 'Error',
			message: error.message,
		});
	}

	return res.json({
		status: 'Error',
		message: error.message,
	});
});

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));