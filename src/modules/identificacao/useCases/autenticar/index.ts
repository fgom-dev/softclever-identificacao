import { AutenticarController } from './autenticarController';
import { AutenticarService } from './autenticarService';

const autenticarService = new AutenticarService();

export const autenticarController = new AutenticarController(autenticarService);