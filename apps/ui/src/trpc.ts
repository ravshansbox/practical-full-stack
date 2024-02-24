import type { AppRouter } from '@cloudretail/api';
import { QueryClient } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { VITE_API_BASE_URL } from './constants';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: VITE_API_BASE_URL })],
});

export const queryClient = new QueryClient();
