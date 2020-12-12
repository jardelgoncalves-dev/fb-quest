import logger from '@src/logger';
import { User, ROLES } from '@src/models/users.model';

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user.role !== ROLES.ADMIN)
      return res
        .status(401)
        .json({ error: 'você não possui permissão para executar esta açao!' });

    return next();
  } catch (error) {
    logger.error(`Auth Middleware Error: ${error.message}`);
    return res.status(401).json({ error: 'erro interno!' });
  }
};
