import { PrismaClient } from '@prisma/client';
import { createHash, randomUUID } from 'crypto';
import { addHours } from 'date-fns';

const hashPassword = (password: string) => {
  return createHash('sha256').update(password).digest('hex');
};

const prisma = new PrismaClient();

async function main() {
  const createdUser = await prisma.user.create({
    data: {
      id: randomUUID(),
      username: 'user1',
      password: hashPassword('pass1'),
    },
  });
  console.log(createdUser);
  const createdToken = await prisma.token.create({
    data: {
      id: randomUUID(),
      access_token: randomUUID(),
      access_token_valid_until: addHours(new Date(), 1),
      refresh_token: randomUUID(),
      refresh_token_valid_until: addHours(new Date(), 7 * 24),
      user_id: createdUser.id,
    },
  });
  console.log(createdToken);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
