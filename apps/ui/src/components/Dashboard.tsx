import { Button } from '@mantine/core';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { logout, restore, state } = useAuthContext();

  useEffect(() => {
    restore().catch(() => {
      navigate('/login');
    });
  }, []);

  if (!state.isRestoreTriggered || state.isRestoring) {
    return null;
  }

  return (
    <main>
      <h1>Welcome {state.username}</h1>
      <Button
        onClick={async () => {
          await logout();
          navigate('/login');
        }}
      >
        log out
      </Button>
    </main>
  );
};
