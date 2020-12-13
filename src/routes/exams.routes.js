import ExamsController from '@src/controllers/exams.controller';

export default (routerInstance, serviceManager, middlewares = {}) => {
  const router = routerInstance();

  const examsController = ExamsController(serviceManager);

  router.use(middlewares.auth);
  router.get('/', examsController.index);
  router.get('/:id', examsController.show);
  router.get(
    '/:examId/questao/:questionId/alternativa/:alternativaId/verifica',
    examsController.verify
  );
  router.post('/', examsController.store);
  return router;
};
