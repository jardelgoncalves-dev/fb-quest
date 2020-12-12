import { questionsSchema } from '@src/schema/questions.schema';
import { successResponse } from '@src/utils/response';
import { ServiceBase } from './service-base';

export class GroupQuestionsService extends ServiceBase {
  constructor(serviceManager) {
    super({
      serviceManager,
      model: serviceManager.models.Question,
      schema: questionsSchema,
      alias: 'materia/vestibular',
    });
    this.types = Object.freeze({
      MATERIA: 'MATERIA',
      VESTIBULAR: 'VESTIBULAR',
    });
  }

  async distinct(query = {}) {
    const materiaArr = await this.Model.find(query).distinct('materia');
    const vestibularArr = await this.Model.find(query).distinct('vestibular');

    const materias = materiaArr.map((materia) => ({
      name: materia,
      tipo: this.types.MATERIA,
    }));
    const vestibulares = vestibularArr.map((vestibular) => ({
      name: vestibular,
      tipo: this.types.VESTIBULAR,
    }));

    return successResponse([...vestibulares, ...materias], 200);
  }
}
