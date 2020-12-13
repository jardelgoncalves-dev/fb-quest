import * as yup from 'yup';

export const questionsSchema = yup
  .object()
  .shape({
    materia: yup.string().required(),
    vestibular: yup.string(),
    resolucao: yup.string(),
    enunciado: yup.string().required(),
    numeroQuestao: yup.number().required(),
    ano: yup.number().required(),
    alternativas: yup.array().of(
      yup.object().shape({
        letra: yup.string().required(),
        texto: yup.string().required(),
        correta: yup.bool(),
      })
    ),
    disponivel: yup.bool(),
  })
  .noUnknown();
