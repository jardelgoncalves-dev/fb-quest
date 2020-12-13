import { examsSchema } from '@src/schema/exams.schema';
import { QUESTION_TYPES } from '@src/utils/constants';
import { successResponse } from '@src/utils/response';
import { ServiceBase } from './service-base';

export class ExamsService extends ServiceBase {
  constructor(serviceManager) {
    super({
      serviceManager,
      model: serviceManager.models.Exam,
      schema: examsSchema,
      alias: 'exames',
    });
    this.Question = serviceManager.models.Question;
  }

  filterByQuestionType(acc, item, type) {
    if (item.tipo === type) return [...acc, item.nome];
    return acc;
  }

  async doCreate({ data }) {
    const materia = data.grupoQuestoes.reduce(
      (acc, item) =>
        this.filterByQuestionType(acc, item, QUESTION_TYPES.MATERIA),
      []
    );
    const vestibular = data.grupoQuestoes.reduce(
      (acc, item) =>
        this.filterByQuestionType(acc, item, QUESTION_TYPES.VESTIBULAR),
      []
    );

    const questions = await this.Question.find({
      $or: [
        {
          vestibular: { $in: vestibular },
        },
        {
          materia: { $in: materia },
        },
      ],
    })
      .sort({ numeroQuestao: 'asc' })
      .limit(42);

    const exam = new this.Model({
      nome: [...vestibular, ...materia].join('/'),
      questoes: [...new Set(questions.map((question) => question.id))],
      usuario: data.usuario,
    });

    await exam.save();

    return successResponse(exam, 200);
  }
}
