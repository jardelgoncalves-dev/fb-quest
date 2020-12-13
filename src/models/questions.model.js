import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    materia: {
      type: String,
      required: [true, 'materia é obrigatório'],
    },
    vestibular: {
      type: String,
    },
    resolucao: {
      type: String,
    },
    enunciado: {
      type: String,
      required: [true, 'enunciado é obrigatório'],
    },
    numeroQuestao: {
      type: Number,
      required: [true, 'numeroQuestao é obrigatório'],
    },
    ano: {
      type: Number,
      required: [true, 'ano é obrigatório'],
    },
    alternativas: [
      {
        letra: String,
        correta: {
          type: Boolean,
          default: false,
        },
        texto: String,
      },
    ],
    disponivel: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;

        delete ret.resolucao;
        delete ret._id;
        delete ret.__v;

        ret.alternativas.forEach((r) => {
          r.id = r._id;

          delete r._id;
          delete r.correta;
        });
      },
    },
  }
);

export const Question = mongoose.model('Question', schema);
