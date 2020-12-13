import mongoose, { Schema } from 'mongoose';

export const STATUS = Object.freeze({
  INICIADO: 'INICIADO',
  FINALIZADO: 'FINALIZADO',
});

const schema = new Schema(
  {
    nome: {
      type: String,
      required: [true, 'nome é obrigatório'],
    },
    questoes: [Schema.Types.ObjectId],
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    inicio: {
      type: Number,
      default: new Date().getTime(),
    },
    ultimaQuestao: Schema.Types.ObjectId,
    status: {
      type: String,
      enum: [STATUS.INICIADO, STATUS.FINALIZADO],
      default: STATUS.INICIADO,
      validate: {
        validator(value) {
          return !!STATUS[value];
        },
        message: (props) => `${props.value} não é permitido!`,
      },
    },
    tempoGasto: Number,
    acertos: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Exam = mongoose.model('Exam', schema);
