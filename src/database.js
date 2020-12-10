import config from 'config';
import mongoose from 'mongoose';

const dbConfig = config.get('App.database');

export const connect = async () =>
  mongoose.connect(dbConfig.get('mongoUrl'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
export const close = () => mongoose.connection.close();
