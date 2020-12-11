import * as yup from 'yup';

export const usersSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .noUnknown();
