import { useState, useEffect } from 'react';
import { getUser, User } from '@gods.work/utils';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use the getUser function from dpop
        const userData = getUser();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching logged in user:', err);
        setError('Failed to load user profile');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedInUser();
  }, []);

  return { user, loading, error };
};


