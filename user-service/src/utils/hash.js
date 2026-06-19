import bcrypt from 'bcrypt';
import { env } from '../config/env.js';

export async function hashValue(plainText) {
  return bcrypt.hash(plainText, env.BCRYPT_SALT_ROUNDS);
}

export async function compareValue(plainText, hashed) {
  return bcrypt.compare(plainText, hashed);
}
