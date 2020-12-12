import { usersSchema } from '@src/schema/users.schema';
import { errorResponse } from '@src/utils/response';
import { ServiceBase } from './service-base';

export class UsersService extends ServiceBase {
  constructor(serviceManager) {
    super({
      serviceManager,
      model: serviceManager.models.User,
      schema: usersSchema,
      alias: 'usuário',
    });
  }

  async doCreate({ data }) {
    if (await this.Model.checkEmail(data)) {
      return errorResponse({ error: 'email já existente' }, 409);
    }

    return super.doCreate({ data });
  }
}
