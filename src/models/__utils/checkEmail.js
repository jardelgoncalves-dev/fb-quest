export const checkEmail = async function ({ email }) {
  if (!email) return true;
  const user = await this.findOne({ email: email.toLowerCase() }).lean();

  return !!user;
};
