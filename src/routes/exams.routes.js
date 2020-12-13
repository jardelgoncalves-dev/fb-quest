import ExamsController from '@src/controllers/exams.controller';

export default (routerInstance, serviceManager, middlewares = {}) => {
  const router = routerInstance();

  const questionController = ExamsController(serviceManager);

  router.use(middlewares.auth);
  router.post('/', questionController.store);

  return router;
};
