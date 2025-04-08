import React from 'react';
import { AuthView } from './AuthView';

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
    <AuthView handle={handle} />
  );
};
