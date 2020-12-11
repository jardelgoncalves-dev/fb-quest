import { Hash } from '@src/utils/hash';

export const auth = async function ({ email, password }) {
  const user = await this.findOne({ email: email.toLowerCase() }).lean();

  if (!user) return null;

  if (!user.password) return null;

  const isPasswordMatch = await Hash.compareHash(password, user.password);

  if (!isPasswordMatch) return null;

  const token = Hash.generateToken({ id: user.id });
  user.password = undefined;

  return { token, user };
};
