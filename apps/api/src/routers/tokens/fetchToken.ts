import { omit } from 'lodash';
import { z } from 'zod';
import { prismaClient } from '../../prismaClient';
import { trpc } from '../../trpc';

export const fetchToken = trpc.procedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    const { user, ...token } = await prismaClient.token.findUniqueOrThrow({
      where: { id: input.id },
      include: { user: true },
    });
    return { ...token, user: omit(user, ['password']) };
  });
