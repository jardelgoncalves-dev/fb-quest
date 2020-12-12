import QuestionController from '@src/controllers/questions.controller';

export default (routerInstance, serviceManager, middlewares = {}) => {
  const router = routerInstance();

  const questionController = QuestionController(serviceManager);
  router.use(middlewares.auth);
  router.get('/', questionController.index);
  router.get('/:id', questionController.show);
  router.use(middlewares.isAdmin);
  router.post('/', questionController.store);
  router.delete('/:id', questionController.destroy);

  return router;
};
