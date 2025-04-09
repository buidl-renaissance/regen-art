import React from 'react';
import { AuthView } from '@gods.work/auth';
import { Container } from '@gods.work/ui';
import { useRouter } from 'next/router';

const VerifyPage: React.FC = () => {
  const [handle, setHandle] = React.useState<string>('');
  const router = useRouter();

  React.useEffect(() => {
    // Load handle from localStorage if it exists
    const storedHandle = localStorage.getItem('handle');
    if (storedHandle) {
      setHandle(storedHandle);
    } else {
      router.push('/profile/create');
    }
  }, [router]);

  const handleAuth = (handle: string) => {
    localStorage.setItem('handle', handle);
    router.push('/profile/details');
  };

  return (
    <Container>
      <AuthView handle={handle} onAuth={handleAuth} />
    </Container>
  );
};

export default VerifyPage;
