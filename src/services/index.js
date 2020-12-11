import { UsersService } from './users.service';
import { AuthService } from './auth.service';

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
}
