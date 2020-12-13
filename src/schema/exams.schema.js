import * as yup from 'yup';
import { QUESTION_TYPES } from '@src/utils/constants';

export const examsSchema = yup.object().shape({
  grupoQuestoes: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          nome: yup.string().required(),
          tipo: yup
            .string()
            .required()
            .test({
              message: 'valor inválido',
              test(value) {
                return !!QUESTION_TYPES[value];
              },
            }),
        })
        .noUnknown()
    )
    .test({
      message: 'é necessário informar um array de dados',
      test(value) {
        return Array.isArray(value) && !!value.length;
      },
    }),
});
