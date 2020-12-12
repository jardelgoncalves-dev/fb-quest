import { beforeEach, describe, expect, it } from '@jest/globals';
import { User } from '@src/models/users.model';
import { userFactory } from '@test/factories/user.factory';
import { Hash } from '@src/utils/hash';

describe('User functional test', () => {
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
  describe('when authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const user = await userFactory.data();
      await userFactory.create(User, user);

      const response = await global.testRequest
        .post('/auth')
        .send({ email: user.email, password: user.password });

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          user: expect.any(Object),
          token: expect.any(String),
        })
      );
    });

    it('should return 401 if the user with the given email is not found', async () => {
      const response = await global.testRequest
        .post('/auth')
        .send({ email: 'somel@email.com', password: 'pass' });

      expect(response).toBeDefined();
      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        error: 'email ou senha inválida',
      });
    });

    it('should return 401 if the user is found but the password does not match', async () => {
      const user = await userFactory.create(User);
      const response = await global.testRequest
        .post('/auth')
        .send({ email: user.email, password: 'different-password' });

      expect(response).toBeDefined();
      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        error: 'email ou senha inválida',
      });
    });
  });

  describe('When getting user profile info', () => {
    it(`Should return the token's owner profile information`, async () => {
      const user = await userFactory.create(User);
      const token = Hash.generateToken({ id: user.id });

      const { body, status } = await global.testRequest
        .get('/users/me')
        .set({ 'x-access-token': token });

      expect(status).toBe(200);
      expect(body).toMatchObject(JSON.parse(JSON.stringify(user)));
    });

    it('Should return 404, when the user is not found', async () => {
      const token = Hash.generateToken({ id: '5fd4396ddeab472469996533' });
      const { body, status } = await global.testRequest
        .get('/users/me')
        .set({ 'x-access-token': token });

      expect(status).toBe(404);
      expect(body.error).toBe('usuário não encontrado!');
    });

    it('Should return 401, when the token is invalid', async () => {
      const { body, status } = await global.testRequest
        .get('/users/me')
        .set({ 'x-access-token': '1234' });

      expect(status).toBe(401);
      expect(body.error).toBe('token inválido!');
    });
  });
});
