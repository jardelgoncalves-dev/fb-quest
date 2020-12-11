import { Hash } from '../hash';

describe('Hash unit test', () => {
  describe('generate and compare hash', () => {
    it('should generate a hash', async () => {
      const hash = await Hash.generateHash('test');
      expect(hash).toBeDefined();
      expect(hash).toEqual(expect.any(String));
    });

    it('should compare a hash', async () => {
      const text = 'test';
      const hash = await Hash.generateHash(text);
      expect(await Hash.compareHash(text, hash)).toBeTruthy();
    });
  });
});
