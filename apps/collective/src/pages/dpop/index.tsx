import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Container,
  Paper,
  List,
  ListItem,
  Divider,
} from '@mui/material';

export async function getServerSideProps() {
  return {
    props: {
      theme: 'dark',
      metadata: {
        title: 'DPoP Verification | Art Night Detroit',
        description: 'Verify your DPoP client status',
      },
    },
  };
}

const HOSTS = [
  'https://artnightdetroit.com',
  'https://renaissnace.gods.work',
  'https://art.gods.work',
  'https://profile.gods.work',
  'https://dpop.tech',
];

export default function DpopPage() {
  const [handle, setHandle] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hostname, setHostname] = useState<string>('');
  const [connectedHosts, setConnectedHosts] = useState<string[]>(HOSTS);
  const [iframeLoaded, setIframeLoaded] = useState(false);

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
          setError('No user handle found');
        }

        // Get the hostname
        setHostname(window.location.hostname);
      } catch (err) {
        setError('Failed to access local storage');
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

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate the origin of the message for security
      if (event.data && event.data.type === 'DPOP_HOSTS') {
        setConnectedHosts(event.data.hosts || []);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '450px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(18, 18, 18, 0.9)',
          p: 3,
          mb: 4,
          mx: 'auto',
          borderRadius: 2,
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CircularProgress size={40} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading profile...
            </Typography>
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" color="error" gutterBottom>
              Error
            </Typography>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {handle ? handle.charAt(0).toUpperCase() : '?'}
            </Box>
            
            <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 'bold' }}>
              @{handle || 'Not found'}
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              {hostname}
            </Typography>

            <Chip
              label={isVerified ? 'VERIFIED' : 'UNVERIFIED'}
              color={isVerified ? 'success' : 'error'}
              size="medium"
              sx={{ 
                fontSize: '1rem', 
                fontWeight: 'bold',
                py: 2.5,
                px: 1,
                borderRadius: '8px',
                width: '180px'
              }}
            />
          </Box>
        )}
      </Paper>

      <Typography variant="h6" gutterBottom>
        Connected Hosts
      </Typography>

      <Paper elevation={3} sx={{ mb: 3 }}>
        {!iframeLoaded && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Loading connected hosts...
            </Typography>
          </Box>
        )}

        <List sx={{ display: connectedHosts.length > 0 ? 'block' : 'none' }}>
          {connectedHosts.map((host, index) => (
            <Box key={index}>
              <ListItem>
                <iframe
                  src={`${host}/dpop/frame`}
                  style={{ display: 'none' }}
                  onLoad={() => setIframeLoaded(true)}
                  title="DPoP Hosts"
                />
              </ListItem>
              {index < connectedHosts.length - 1 && <Divider />}
            </Box>
          ))}
        </List>

        {iframeLoaded && connectedHosts.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2">No connected hosts found</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
