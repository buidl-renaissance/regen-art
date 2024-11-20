import React from 'react';
import { useWallet } from '@gods.work/ui';
import { mintProperty } from '@gods.work/web3';

import { TextField, Button, Grid, Box, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';

export default function CreateProperty() {
  const { isConnected, connectWallet, userAddress } = useWallet();

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
    const { location, price, description } = data;

    try {
      const receipt = await mintProperty({
        contractAddress: '0xB15d7fba336BC916EE14864F04FafC9295926577',
        location,
        price,
        description,
      });
      console.log('Transaction confirmed:', receipt);
    } catch (error) {
      console.error('Error minting property:', error);
      alert('Failed to mint property. Check the console for details.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mint New Property
      </Typography>
      <Button
        variant="contained"
        onClick={connectWallet}
        sx={{ mb: 2 }}
        disabled={isConnected}
      >
        {isConnected ? `Connected: ${userAddress}` : 'Connect Wallet'}
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Property Location"
              {...register('location', { required: 'Location is required.' })}
              error={!!errors.location}
              helperText={errors.location?.message}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price in ETH"
              type="number"
              {...register('price', {
                required: 'Price is required.',
                min: { value: 0.01, message: 'Price must be greater than 0.' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              {...register('description', {
                required: 'Description is required.',
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Mint Property
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
