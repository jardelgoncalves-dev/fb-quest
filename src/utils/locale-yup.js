/* eslint-disable no-template-curly-in-string */

import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: '${path} é obrigatório',
  },
  string: {
    email: 'email inválido',
  },
});
