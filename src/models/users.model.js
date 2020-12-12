import mongoose, { Schema } from 'mongoose';
import { Hash } from '@src/utils/hash';
import logger from '@src/logger';
import { checkEmail, auth } from './__utils';

const CUSTOM_VALIDATION = Object.freeze({
  DUPLICATED: 'DUPLICATED',
});

export const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
});

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'nome é obrigatório'],
    },
    email: {
      type: String,
      required: [true, 'email é obrigatório'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'senha é obrigatória'],
    },
    role: {
      type: String,
      enum: Object.freeze([ROLES.ADMIN, ROLES.CLIENT]),
      default: ROLES.CLIENT,
      validate: {
        validator(value) {
          return !!ROLES[value];
        },
        message: (props) => `${props.value} não é permitido!`,
      },
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

schema.path('email').validate(
  async (email) => {
    const count = await mongoose.models.User.countDocuments({ email });
    return !count;
  },
  'email já existe',
  CUSTOM_VALIDATION.DUPLICATED
);

schema.pre('save', async function () {
  if (!this.password || !this.isModified('password')) return;
  try {
    const hashPassword = await Hash.generateHash(this.password);
    this.password = hashPassword;

    if (!this.email || !this.isModified('email')) return;
    this.email = this.email.toLowerCase();
  } catch (error) {
    logger.error(`Error hashing the password for the user ${this.name}`);
  }
});

schema.statics.checkEmail = checkEmail;
schema.statics.auth = auth;

export const User = mongoose.model('User', schema);
