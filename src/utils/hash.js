import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

export class Hash {
  static generateHash(text = '', salt = 10) {
    return bcrypt.hash(text, salt);
  }

  static compareHash(text, hash) {
    return bcrypt.compare(text, hash);
  }

  static generateToken(payload) {
    return jwt.sign(payload, config.get('App.auth.key'));
  }

  static decodeToken(token) {
    return jwt.verify(token, config.get('App.auth.key'));
  }
}
