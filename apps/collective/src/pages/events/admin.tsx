import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Tabs, Tab, Box, Typography } from '@mui/material';
import RAEventsAdmin from '../../app/components/RAEventsAdmin';

const AdminPage: NextPage = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | Events</title>
        <meta name="description" content="Admin dashboard for managing events" />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
            <Tab label="RA Events" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Settings" id="tab-2" aria-controls="tabpanel-2" />
          </Tabs>
        </Box>
        
        <div
          role="tabpanel"
          hidden={tabValue !== 0}
          id="tabpanel-0"
          aria-labelledby="tab-0"
        >
          {tabValue === 0 && <RAEventsAdmin />}
        </div>
        
        <div
          role="tabpanel"
          hidden={tabValue !== 2}
          id="tabpanel-2"
          aria-labelledby="tab-2"
        >
          {tabValue === 2 && (
            <Typography variant="h6" component="h2">
              Settings (Coming Soon)
            </Typography>
          )}
        </div>
      </Container>
    </>
  );
};

export default AdminPage;

