import { addHours } from 'date-fns';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { prismaClient } from '../prismaClient';
import { trpc } from '../trpc';
import { hashPassword } from '../utils';

export const tokenRouter = trpc.router({
  createToken: trpc.procedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prismaClient.user.findUniqueOrThrow({
        where: { username: input.username },
      });
      const hashedPassword = hashPassword(input.password);
      if (hashedPassword !== user.password) {
        throw new Error();
      }
      return prismaClient.token.create({
        data: {
          id: randomUUID(),
          access_token: randomUUID(),
          access_token_valid_until: addHours(new Date(), 1),
          refresh_token: randomUUID(),
          refresh_token_valid_until: addHours(new Date(), 24),
          user_id: user.id,
        },
      });
    }),
});
