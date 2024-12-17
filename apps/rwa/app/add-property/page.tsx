'use client'

import React from 'react';
import { useWallet } from '@gods.work/ui';
import { mintProperty } from '@gods.work/web3';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/sidebar';
import { Header } from '../../components/header';

import { TextField, Button, Grid, Box, Typography } from '@mui/material';

export default function AddProperty() {
  const { isConnected, connectWallet, userAddress } = useWallet();
  const [isMinting, setIsMinting] = React.useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit the form and mint property
  const onSubmit = async (data: any) => {
    if (!isConnected) {
      alert('Please connect your wallet first.');
      return;
    }

    // console.log('data: ', data);
    const { location, description } = data;
    const ipfsHash = '';

    try {
      setIsMinting(true);

      const { receipt, tokenId } = await mintProperty({
        location,
        description,
        ipfsHash,
      });
      // forward to the property details page
      if (tokenId) {
        router.push(`/properties/${tokenId}`);
      }
      console.log('Transaction confirmed:', receipt);
      setIsMinting(false);
    } catch (error) {
      console.error('Error minting property:', error);
      alert('Failed to mint property. Check the console for details.');
      setIsMinting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, border: '1px solid #e0e0e0', p: 4, backgroundColor: 'white' }}>
            <Typography variant="h4" gutterBottom>
              Mint New Property
            </Typography>
            {!isConnected && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  Get started by connecting your wallet.
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              onClick={connectWallet}
              sx={{ mb: 2 }}
              disabled={isConnected}
            >
              {isConnected ? `Connected: ${userAddress}` : 'Connect Wallet'}
            </Button>
            {isConnected && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Location"
                      disabled={isMinting}
                      {...register('location', {
                        required: 'Location is required.',
                      })}
                      error={!!errors.location}
                      helperText={errors.location?.message as string}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                      disabled={isMinting}
                      {...register('description', {
                        required: 'Description is required.',
                      })}
                      error={!!errors.description}
                      helperText={errors.description?.message as string}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      disabled={isMinting}
                    >
                      {isMinting ? 'Minting...' : 'Mint Property'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Box>
        </main>
      </div>
    </div>
  );
}
