import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';

export default function DpopPage() {
  const [handle, setHandle] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hostname, setHostname] = useState<string>('');

  useEffect(() => {
    // Load user handle from localStorage
    const fetchUserData = () => {
      try {
        setLoading(true);
        
        // Get user handle from localStorage
        const storedHandle = localStorage.getItem('handle');
        
        if (storedHandle) {
          setHandle(storedHandle);
          // For this example, we'll assume a user with a stored handle is verified
          // In a real implementation, you would verify this with your backend
          setIsVerified(true);
        } else {
          setHandle(null);
          setIsVerified(false);
          setError("No user handle found");
        }

        // Get the hostname
        setHostname(window.location.hostname);
      } catch (err) {
        setError("Failed to access local storage");
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    // Need to use this pattern because localStorage is not available during SSR
    if (typeof window !== 'undefined') {
      fetchUserData();
    }
  }, []);

  return (
    <Box 
      sx={{ 
        width: '320px', 
        height: '44px', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        px: 1
      }}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : error ? (
        <Typography variant="caption" color="error" noWrap>
          {error}
        </Typography>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="caption" noWrap sx={{ maxWidth: '150px' }}>
              {handle || "Not found"}
            </Typography>
            <Typography variant="caption" noWrap sx={{ display: 'block', fontSize: '0.65rem', opacity: 0.7 }}>
              {hostname}
            </Typography>
          </Box>
          
          <Chip 
            label={isVerified ? "Verified" : "Unverified"} 
            color={isVerified ? "success" : "error"}
            size="small"
            sx={{ fontSize: '0.7rem', height: '24px' }}
          />
        </Box>
      )}
    </Box>
  );
}
