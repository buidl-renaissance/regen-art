import { useState, useEffect } from 'react';

/**
 * Hook to get and manage the user's handle from localStorage
 * @returns Object containing handle, setHandle function, and validation utilities
 */
export const useHandle = () => {
  const [handle, setHandle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [hasExistingProfile, setHasExistingProfile] = useState<boolean>(false);

  useEffect(() => {
    // Load handle from localStorage if it exists
    const storedHandle = localStorage.getItem('handle');
    if (storedHandle) {
      setHandle(storedHandle);
      setError(validateHandle(storedHandle));
      setHasExistingProfile(true);
    }
  }, []);

  const validateHandle = (value: string): string => {
    if (!value) {
      return 'Handle is required';
    }

    if (value.length < 3) {
      return 'Handle must be at least 3 characters';
    }

    if (value.length > 30) {
      return 'Handle must be less than 30 characters';
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Handle can only contain letters, numbers, and underscores';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHandle(value);
    setError(validateHandle(value));
  };

  const saveHandle = () => {
    localStorage.setItem('handle', handle);
  };

  const getUser = () => {
    const storedHandle = localStorage.getItem('handle');
    return storedHandle ? { handle: storedHandle } : null;
  };

  return {
    handle,
    setHandle,
    error,
    setError,
    hasExistingProfile,
    validateHandle,
    handleChange,
    saveHandle,
    getUser
  };
};

export const getUser = () => {
  const storedHandle = localStorage.getItem('handle');
  return storedHandle ? { handle: storedHandle } : null;
};
