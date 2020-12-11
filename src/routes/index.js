import { Router } from 'express';
import * as models from '@src/models';
import { ServiceManager } from '@src/services';
import usersRouter from './users.routes';

const serviceManager = new ServiceManager({ models });
const router = Router();

router.use(usersRouter(router, serviceManager));

export default router;
