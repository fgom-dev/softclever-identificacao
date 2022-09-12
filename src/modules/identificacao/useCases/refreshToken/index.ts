import { RefreshTokenController } from './refreshTokenController';
import { RefreshTokenService } from './refreshTokenService';

const refreshTokenService = new RefreshTokenService();

export const refreshTokenController = new RefreshTokenController(refreshTokenService);