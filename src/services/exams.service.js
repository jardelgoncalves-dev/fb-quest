import { examsSchema } from '@src/schema/exams.schema';
import { QUESTION_TYPES } from '@src/utils/constants';
import { errorResponse, successResponse } from '@src/utils/response';
import { STATUS } from '@src/models/exams.model';
import { ServiceBase } from './service-base';

export class ExamsService extends ServiceBase {
  constructor(serviceManager) {
    super({
      serviceManager,
      model: serviceManager.models.Exam,
      schema: examsSchema,
      alias: 'questionario',
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
      disponivel: true,
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

  async verifyQuestion({ questionId, examId, alternativaId, usuario }) {
    try {
      const exam = await this.Model.findOne({
        _id: examId,
        usuario,
        status: STATUS.INICIADO,
      });
      if (!exam)
        return errorResponse({ error: 'questionário não encontrado' }, 404);

      const questionIndex = exam.questoes.findIndex(
        (q) => String(q) === questionId
      );
      if (questionIndex === -1)
        return errorResponse({ error: 'questão não encontrado' }, 404);

      const question = await this.Question.findOne({ _id: questionId }).lean();
      if (!question)
        return errorResponse({ error: 'questão não encontrado' }, 404);

      const [myResponse] = question.alternativas.filter(
        (a) => String(a._id) === alternativaId
      );

      if (!myResponse)
        return errorResponse({ error: 'resposta não encontrado' }, 404);

      const [correct] = question.alternativas.filter((a) => a.correta);

      const isLastQuestion = exam.questoes.length - 1 === questionIndex;
      exam.set({
        ultimaQuestao: questionId,
        status: isLastQuestion ? STATUS.FINALIZADO : STATUS.INICIADO,
        acertos: myResponse.correta ? exam.acertos + 1 : exam.acertos,
        ...(isLastQuestion && { tempoGasto: new Date().getTime() }),
      });

      await exam.save();

      return successResponse(
        {
          correta: myResponse.correta,
          detalhes: {
            alternativa: correct,
            resolucao: question.resolucao,
          },
        },
        200
      );
    } catch (error) {
      return this.handleError(error);
    }
  }
}
