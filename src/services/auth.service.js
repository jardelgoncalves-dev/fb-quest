import { authSchema } from '@src/schema/auth.schema';
import { errorResponse, successResponse } from '@src/utils/response';
import { ServiceBase } from './service-base';

export class AuthService extends ServiceBase {
  constructor(serviceManager) {
    super({
      serviceManager,
      model: serviceManager.models.User,
      schema: authSchema,
    });
  }

  async doCreate({ data }) {
    const auth = await this.Model.auth(data);
    if (!auth) return errorResponse({ error: 'email ou senha inválida' }, 401);

    return successResponse(auth, 200);
  }
}
