import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { trpc } from '../trpc';

export const LoginForm = () => {
  const form = useForm({
    initialValues: {
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
    <form
      className="max-w-64"
      onSubmit={form.onSubmit((values) => {
        createToken.mutate(values);
      })}
    >
      <label>
        <span>Username:</span>
        <TextInput type="text" {...form.getInputProps('username')} />
      </label>
      <label>
        <span>Password:</span>
        <PasswordInput type="text" {...form.getInputProps('password')} />
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
};
