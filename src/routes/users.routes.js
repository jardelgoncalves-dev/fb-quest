import UsersController from '@src/controllers/users.controller';

export default (routerInstance, serviceManager, middlewares = {}) => {
  const router = routerInstance();

  const usersController = UsersController(serviceManager);
  router.post('/', usersController.store);

  router.use(middlewares.auth);
  router.get('/me', usersController.find);

  return router;
};
