import express from 'express';
import * as models from '@src/models';
import { ServiceManager } from '@src/services';
import usersRouter from './users.routes';
import authRouter from './auth.routes';

const serviceManager = new ServiceManager({ models });
const router = express.Router();

authRouter(router, serviceManager);
usersRouter(router, serviceManager);

router.get('/', (req, res) => res.send('Hello World!'));

export default router;
