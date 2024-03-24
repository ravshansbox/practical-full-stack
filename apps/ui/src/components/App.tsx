import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginForm } from './LoginForm';

const router = createBrowserRouter([{ path: '', Component: LoginForm }]);

export const App = () => {
  return <RouterProvider router={router} />;
};
