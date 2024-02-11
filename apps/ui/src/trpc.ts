import type { AppRouter } from '@cloudretail/api';
import { QueryClient } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: '/api' })],
});

export const queryClient = new QueryClient();
