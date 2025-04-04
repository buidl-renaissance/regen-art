import { useState, useEffect, useCallback } from 'react';
import { getUser, User } from '@gods.work/utils';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to handle authentication state
 * 
 * @returns Object containing the user data, loading state, and any error
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const fetchUser = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Fetch the current user from the API
      const userData = await getUser();
      
      setAuthState({
        user: userData,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error('Authentication error:', err);
      setAuthState({
        user: null,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Authentication failed',
      });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      await fetchUser();
      return true;
    } catch (err) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Login failed',
      }));
      return false;
    }
  }, [fetchUser]);

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (err) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Logout failed',
      }));
      return false;
    }
  }, []);

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    refetch: fetchUser,
  };
}
