import { UsersService } from './users.service';

const SERVICE = Symbol('services');

export class ServiceManager {
  constructor({ models }) {
    this.models = models;
    this[SERVICE] = {};
  }

  get users() {
    return new UsersService(this);
  }
}
