import React from 'react';
import { useWallet } from '@gods.work/ui';
import { getTokenIdFromReceipt, mintProperty } from '@gods.work/web3';

import { TextField, Button, Grid, Box, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import router from 'next/router';

export default function CreateProperty() {
  const { isConnected, connectWallet, userAddress } = useWallet();
  const [isMinting, setIsMinting] = React.useState<boolean>(false);

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
        contractAddress: '0x06a3D2Fe63BB7197E96B9C5173E8a740AAC16F58',
        location,
        description,
        ipfsHash,
      });
      // forward to the property details page
      if (tokenId) {
        router.push(`/property/${tokenId}`);
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
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
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
              {...register('location', { required: 'Location is required.' })}
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
            <Button variant="contained" color="primary" fullWidth type="submit" disabled={isMinting}>
              {isMinting ? 'Minting...' : 'Mint Property'}
            </Button>
          </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
}
