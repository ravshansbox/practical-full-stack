import { createHash } from 'node:crypto';

export const hashPassword = (password: string) => {
  return createHash('sha256').update(password).digest('hex');
};
