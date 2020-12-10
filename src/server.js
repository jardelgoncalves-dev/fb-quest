import './utils/moduleAlias';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import logger from './logger';

export class Server {
  constructor(expressApp = express, port = process.env.PORT || 3333) {
    this.express = expressApp;
    this.port = port;
    this.app = express();
  }

  async init() {
    this._setupMiddlewares();
    this._setupControllers();
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

  _setupControllers() {}

  _setupDatabase() {}

  close() {}

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Server listening of port: ${this.port}`);
    });
  }

  getApp() {
    return this.app;
  }
}
