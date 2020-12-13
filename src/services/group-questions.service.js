import { questionsSchema } from '@src/schema/questions.schema';
import { successResponse } from '@src/utils/response';
import { QUESTION_TYPES } from '@src/utils/constants';
import { ServiceBase } from './service-base';

export class GroupQuestionsService extends ServiceBase {
  constructor(serviceManager) {
    super({
      serviceManager,
      model: serviceManager.models.Question,
      schema: questionsSchema,
      alias: 'materia/vestibular',
    });
  }

  async distinct(query = {}) {
    const materiaArr = await this.Model.find(query).distinct('materia');
    const vestibularArr = await this.Model.find(query).distinct('vestibular');

    const materias = materiaArr.map((materia) => ({
      nome: materia,
      tipo: QUESTION_TYPES.MATERIA,
    }));
    const vestibulares = vestibularArr.map((vestibular) => ({
      nome: vestibular,
      tipo: QUESTION_TYPES.VESTIBULAR,
    }));

    return successResponse([...vestibulares, ...materias], 200);
  }
}
