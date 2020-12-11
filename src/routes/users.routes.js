import UsersController from '@src/controllers/users.controller';

export default (router, serviceManager) => {
  const usersController = UsersController(serviceManager);
  router.post('/users', usersController.store);

  return router;
};
