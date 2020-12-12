import GroupQuestionController from '@src/controllers/group-questions.controller';

export default (routerInstance, serviceManager) => {
  const router = routerInstance();

  const questionController = GroupQuestionController(serviceManager);
  router.get('/', questionController.index);

  return router;
};
