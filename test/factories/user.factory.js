import faker from 'faker';

const user = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.lorem.word(),
};

export const userFactory = {
  async create(User, _data = {}) {
    const entity = new User({ ...user, ..._data });
    await entity.save();

    return entity;
  },
  async data(_data = {}) {
    return { ...user, ..._data };
  },
};
