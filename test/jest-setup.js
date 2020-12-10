import supertest from 'supertest';
import { Server } from '@src/server';

const server = new Server();

beforeAll(async () => {
  await server.init();
  global.testRequest = supertest(server.getApp());
});

afterAll(async () => {
  server.close();
});
