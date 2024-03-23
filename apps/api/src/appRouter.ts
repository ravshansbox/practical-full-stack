import { tokenRouter } from './routers/tokenRouter';
import { trpc } from './trpc';

export const appRouter = trpc.router({
  tokens: tokenRouter,
});

export type AppRouter = typeof appRouter;
