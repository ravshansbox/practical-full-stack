import { trpc } from './trpc';

export const App = () => {
  const createToken = trpc.createToken.useMutation({
    onMutate: (variables) => {
      console.info('variables', variables);
    },
  });
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        createToken.mutate({
          username: formData.get('username') as string,
          password: formData.get('password') as string,
        });
      }}
    >
      <label>
        <span>Username</span>
        <input type="text" name="username" />
      </label>
      <label>
        <span>Password</span>
        <input type="text" name="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
