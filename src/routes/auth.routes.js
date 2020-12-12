import AuthController from '@src/controllers/auth.controller';

export default (routerInstance, serviceManager) => {
  const router = routerInstance();

  const authController = AuthController(serviceManager);
  router.post('/', authController.store);

  return router;
};
