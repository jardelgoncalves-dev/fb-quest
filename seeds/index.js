import questions from './questions.json';
import { Question } from '../src/models/questions.model';
import * as database from '../src/database';

(async () => {
  await database.connect();
  await Question.insertMany(questions);
  await database.close();
})();
