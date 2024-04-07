import type { AppRouter } from '@cloudretail/api';
import { QueryClient } from '@tanstack/react-query';
import {
  createTRPCClient,
  createTRPCReact,
  httpBatchLink,
} from '@trpc/react-query';
import { VITE_API_BASE_URL } from './constants';

export const trpc = createTRPCReact<AppRouter>();

const link = httpBatchLink({ url: VITE_API_BASE_URL });

export const trpcVanillaClient = createTRPCClient<AppRouter>({ links: [link] });

export const trpcClient = trpc.createClient({ links: [link] });

export const queryClient = new QueryClient();
