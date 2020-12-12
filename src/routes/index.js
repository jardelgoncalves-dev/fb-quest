import express from 'express';
import * as models from '@src/models';
import { ServiceManager } from '@src/services';
import { authMiddleware as auth } from '@src/middlewares/auth.middleware';
import usersRoutes from './users.routes';
import authRoutes from './auth.routes';

const serviceManager = new ServiceManager({ models });

const router = express.Router();

router.get('/', (req, res) => res.send('welcome to fb quest!'));
router.use('/users', usersRoutes(express.Router, serviceManager, { auth }));
router.use('/auth', authRoutes(express.Router, serviceManager));

export default router;
