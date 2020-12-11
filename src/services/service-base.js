import logger from '@src/logger';
import { errorResponse, successResponse } from '@src/utils/response';

export class ServiceBase {
  constructor({ serviceManager, model, schema }) {
    this.serviceManager = serviceManager;
    this.Model = model;
    this.schema = schema || undefined;
  }

  async _applySchema(fnOperation, data) {
    try {
      if (this.schema) await this.schema.validate(data);
      return fnOperation();
    } catch (error) {
      logger.error(`Validation Error: ${error.message}`);
      return errorResponse({ error: error.message }, 422);
    }
  }

  async doCreate({ data }) {
    const entity = new this.Model(data);
    await entity.save();

    return successResponse(entity, 201);
  }

  async doFindOne({ query = {}, populate = {} }) {
    const entity = await this.Model.findOne(query).populate(populate).lean();
    return successResponse(entity, 200);
  }

  async doFindAll({ query = {}, populate = {} }) {
    const entity = await this.Model.find(query).populate(populate).lean();
    return successResponse(entity, 200);
  }

  async doUpdate({ query = {}, data = {} }) {
    const entity = await this.Model.findOne(query);
    entity.set(data);
    await entity.save();

    return successResponse(entity, 200);
  }

  async doDelete({ query }) {
    await this.Model.deleteOne(query);
    return successResponse({}, 204);
  }

  async create({ data }) {
    return this._applySchema(() => this.doCreate({ data }), data);
  }

  async findOne({ query = {}, populate = {} }) {
    return this._applySchema(() => this.doFindOne({ query, populate }));
  }

  async findAll({ query = {}, populate = {} }) {
    return this._applySchema(() => this.doFindAll({ query, populate }));
  }

  async update({ query = {}, data = {} }) {
    return this._applySchema(() => this.doUpdate({ query, data }), data);
  }

  async delete({ query }) {
    return this._applySchema(() => this.doDelete({ query }));
  }
}
