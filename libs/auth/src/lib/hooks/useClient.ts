import { useState, useEffect } from 'react';
import { getOrCreateHotWallet } from '@gods.work/utils';

/**
 * Hook to generate and manage a client ID based on the wallet's public address
 * @returns An object containing the client ID and functions to manage it
 */
export const useClient = () => {
  const [clientId, setClientId] = useState<string>('');
  const [handle, setHandle] = useState<string>('');

  useEffect(() => {
    const storedHandle = localStorage.getItem('handle');
    setHandle(storedHandle || 'anonymous');
  }, []);

  useEffect(() => {
    // Check for existing client ID in localStorage
    const storedClientId = localStorage.getItem('dpop_client_id');

    // Get or create wallet to access the public address
    const { address } = getOrCreateHotWallet();
    
    // If there's a stored client ID, check if it's still valid for this wallet
    if (storedClientId) {
      const parts = storedClientId.split(':');
      if (parts.length >= 2 && parts[0] === address && parts[1] === handle) {
        setClientId(storedClientId);
        return;
      }
    }
    
    // Generate a new client ID using the wallet address and a timestamp for uniqueness
    const generatedClientId = `DPoP:${handle}:${address}`;
    
    // Store the new client ID
    localStorage.setItem('dpop_client_id', generatedClientId);
    setClientId(generatedClientId);
  }, [handle]);

  /**
   * Regenerate the client ID with the current wallet address
   */
  const regenerateClientId = () => {
    const { address } = getOrCreateHotWallet();
    const newClientId = `DPoP:${handle}:${address}`;
    localStorage.setItem('dpop_client_id', newClientId);
    setClientId(newClientId);
    return newClientId;
  };

  return {
    clientId,
    regenerateClientId
  };
};
