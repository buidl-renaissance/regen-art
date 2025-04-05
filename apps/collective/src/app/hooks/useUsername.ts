import { useState, useEffect } from 'react';

/**
 * Hook to manage a username stored in localStorage
 * @returns An object containing the username and a function to update it
 */
export const useUsername = () => {
  const [username, setUsernameState] = useState<string>('');
  
  useEffect(() => {
    // Load username from localStorage on component mount
    const storedUsername = localStorage.getItem('dpop_username');
    if (storedUsername) {
      setUsernameState(storedUsername);
    }
  }, []);
  
  /**
   * Updates the username in both state and localStorage
   * @param newUsername - The new username to set
   */
  const setUsername = (newUsername: string) => {
    if (newUsername && newUsername.trim()) {
      // Store in localStorage
      localStorage.setItem('dpop_username', newUsername);
      // Update state
      setUsernameState(newUsername);
    }
  };
  
  return {
    username,
    setUsername
  };
};
