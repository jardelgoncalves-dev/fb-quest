import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { QuestionsService } from './questions.service';
import { GroupQuestionsService } from './group-questions.service';

const SERVICE = Symbol('services');

export class ServiceManager {
  constructor({ models }) {
    this.models = models;
    this[SERVICE] = {};
  }

  get auth() {
    return new AuthService(this);
  }

  get users() {
    return new UsersService(this);
  }

  get questions() {
    return new QuestionsService(this);
  }

  get groupQuestions() {
    return new GroupQuestionsService(this);
  }
}
