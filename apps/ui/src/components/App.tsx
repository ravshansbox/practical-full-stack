import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../AuthContext';
import { queryClient, trpc, trpcClient } from '../trpc';
import { Dashboard } from './Dashboard';
import { LoginForm } from './LoginForm';

const router = createBrowserRouter([
  { path: '', Component: Dashboard },
  { path: 'login', Component: LoginForm },
]);

export const App = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
