import bcrypt from 'bcrypt';

export class Hash {
  static generateHash(text = '', salt = 10) {
    return bcrypt.hash(text, salt);
  }

  static compareHash(text, hash) {
    return bcrypt.compare(text, hash);
  }
}
