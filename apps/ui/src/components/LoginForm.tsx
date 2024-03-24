import { useForm } from 'react-hook-form';
import { trpc } from '../trpc';
import { Button } from './core/Button';

export const LoginForm = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const createToken = trpc.tokens.createToken.useMutation({
    onMutate: (variables) => {
      console.info('variables', variables);
    },
    onSuccess: (token) => {
      window.localStorage.setItem('TOKEN', token.id);
    },
  });

  return (
    <form className="max-w-64" onSubmit={handleSubmit(createToken.mutate)}>
      <label>
        <span>Username:</span>
        <input type="text" {...register('username')} />
      </label>
      <label>
        <span>Password:</span>
        <input type="text" {...register('password')} />
      </label>
      <Button type="submit" color="gray" size="md">
        Submit
      </Button>
    </form>
  );
};
