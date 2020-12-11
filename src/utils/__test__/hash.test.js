import faker from 'faker';
import { Hash } from '../hash';

describe('Hash unit test', () => {
  describe('generate and compare hash', () => {
    it('should generate a hash', async () => {
      const hash = await Hash.generateHash('test');
      expect(hash).toBeDefined();
      expect(hash).toEqual(expect.any(String));
    });

    it('should compare a hash', async () => {
      const text = faker.name.firstName();
      const hash = await Hash.generateHash(text);
      expect(await Hash.compareHash(text, hash)).toBeTruthy();
    });
  });
  describe('generate and decoded token', () => {
    it('should generate a token', () => {
      const token = Hash.generateToken(
        faker.random
          .number({
            min: 1,
          })
          .toString()
      );

      expect(token).toEqual(expect.any(String));
    });

    it('should decoded a token', () => {
      const text = faker.random
        .number({
          min: 1,
        })
        .toString();
      const token = Hash.generateToken(text);

      const decoded = Hash.decodeToken(token);

      expect(token).toEqual(expect.any(String));
      expect(decoded).toEqual(text);
    });
  });
});
