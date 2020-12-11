import { User } from '@src/models/users.model';
import { Hash } from '@src/utils/hash';
import { userFactory } from '@test/factories/user.factory';

describe('/users Test', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('when creating a new user', () => {
    it('should successfuly create a new user with encrypted password', async () => {
      const userDefault = await userFactory.data();

      const response = await global.testRequest
        .post('/users')
        .send(userDefault);

      expect(response.status).toEqual(201);

      const { body } = response;

      await expect(
        Hash.compareHash(userDefault.password, body.password)
      ).resolves.toBeTruthy();
      expect(body).toEqual(
        expect.objectContaining({
          ...body,
          ...{ password: expect.any(String) },
        })
      );
    });

    it('should return 422 when there is a validation error', async () => {
      const userDefault = await userFactory.data({ password: undefined });

      const response = await global.testRequest
        .post('/users')
        .send(userDefault);

      expect(response.status).toEqual(422);

      const { body } = response;

      expect(body).toHaveProperty('error');
      expect(body.error).toEqual('password é obrigatório');
    });

    it('should return 422 when email is invalid', async () => {
      const userDefault = await userFactory.data({ email: 'invalid_email' });

      const response = await global.testRequest
        .post('/users')
        .send(userDefault);

      expect(response.status).toEqual(422);

      const { body } = response;

      expect(body).toHaveProperty('error');
      expect(body.error).toEqual('email inválido');
    });

    it('should return 409 when email is duplicated', async () => {
      const userDefault = await userFactory.data();
      await userFactory.create(User, userDefault);

      const response = await global.testRequest
        .post('/users')
        .send(userDefault);

      expect(response.status).toEqual(409);

      const { body } = response;

      expect(body).toHaveProperty('error');
      expect(body.error).toEqual('email já existente');
    });
  });
});
