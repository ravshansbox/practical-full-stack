import { prismaClient } from '../../prismaClient';
import { authProcedure } from '../../trpc';

export const fetchCompanies = authProcedure.query(({ ctx }) => {
  return prismaClient.company.findMany({
    where: { permissions: { some: { user_id: ctx.user.id } } },
  });
});
