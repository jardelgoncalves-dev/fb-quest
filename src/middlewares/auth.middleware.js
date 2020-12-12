import logger from '@src/logger';
import { User } from '@src/models/users.model';
import { Hash } from '@src/utils/hash';

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers['x-access-token'];
    if (!accessToken)
      return res.status(401).json({ error: 'token não fornecido!' });

    const decoded = Hash.decodeToken(accessToken);
    const user = await User.findOne({ _id: decoded.id });
    if (!user)
      return res.status(404).json({ error: 'usuário não encontrado!' });

    req.userId = decoded.id;
    return next();
  } catch (error) {
    logger.error(`Auth Middleware Error: ${error.message}`);
    return res.status(401).json({ error: 'token inválido!' });
  }
};
