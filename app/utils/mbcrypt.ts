import * as bcrypt from 'bcrypt';

export async function genSale(saltRounds: number = 10) {
  return bcrypt.genSalt(saltRounds);
}

export async function hashPassword(plainPassword: string = '') {
  const salt = await genSale(10);
  return bcrypt.hash(plainPassword, salt);
}

export async function comparePassword(plainPassword: string = '', hashedPassword: string = '') {
  return bcrypt.compare(plainPassword, hashedPassword);
}