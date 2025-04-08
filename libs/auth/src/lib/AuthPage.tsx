import React from 'react';
import { AuthView } from './AuthView';
import { Container } from '@gods.work/ui';

export const AuthPage: React.FC = () => {
  const [handle, setHandle] = React.useState<string>('');

  React.useEffect(() => {
    // Load handle from localStorage if it exists
    const storedHandle = localStorage.getItem('handle');
    if (storedHandle) {
      setHandle(storedHandle);
    }
  }, []);
  return (
    <Container>
      <AuthView handle={handle} />
    </Container>
  );
};
