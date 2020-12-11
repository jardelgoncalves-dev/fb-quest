import AuthController from '@src/controllers/auth.controller';

export default (router, serviceManager) => {
  const authController = AuthController(serviceManager);
  router.post('/auth', authController.store);

  return router;
};
