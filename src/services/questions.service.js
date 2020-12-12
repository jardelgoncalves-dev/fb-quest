import { questionsSchema } from '@src/schema/questions.schema';
import { ServiceBase } from './service-base';

export class QuestionsService extends ServiceBase {
  constructor(serviceManager) {
    super({
      serviceManager,
      model: serviceManager.models.Question,
      schema: questionsSchema,
      alias: 'questão',
    });
  }
}
