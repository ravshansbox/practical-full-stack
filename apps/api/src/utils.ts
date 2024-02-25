import { createHash, randomUUID } from 'node:crypto';
import { prismaClient } from './prismaClient';

export const id = () => {
  return randomUUID();
};

export const hashPassword = (password: string) => {
  return createHash('sha256').update(password).digest('hex');
};

export async function seedDatabase() {
  await prismaClient.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: id(),
      username: 'admin',
      password: hashPassword('admin'),
    },
  });
}
