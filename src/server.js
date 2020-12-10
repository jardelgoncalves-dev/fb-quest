import './utils/moduleAlias';
import './utils/locale-yup';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import logger from './logger';
import * as database from './database';
import routes from './routes';

export class Server {
  constructor(expressApp = express, port = process.env.PORT || 3333) {
    this.express = expressApp;
    this.port = port;
    this.app = express();
  }

  async init() {
    this._setupMiddlewares();
    this._setupRouters();
    await this._setupDatabase();
  }

  _setupMiddlewares() {
    this.app.use(this.express.json());
    this.app.use(
      expressPinoLogger({
        logger,
      })
    );
  }

  _setupRouters() {
    this.app.use('/', routes);
  }

  async _setupDatabase() {
    await database.connect();
  }

  async close() {
    await database.close();
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Server listening of port: ${this.port}`);
    });
  }

  getApp() {
    return this.app;
  }
}
