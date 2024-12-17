import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Select, Button, Grid } from '@mui/material';
import { transferShares } from '@gods.work/web3';

interface TransferSharesProps {
  propertyId: number;
  shareholders: string[];
  shares: string[];
  onTransfer?: (toId: string, amount: number) => void;
}

export const TransferShares = ({
  propertyId,
  shareholders,
  shares,
}: TransferSharesProps) => {
  const [isTransferring, setIsTransferring] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log('data: ', data);
    if (data.transferTo && Number(data.numShares) > 0) {
      setIsTransferring(true);
      await transferShares({
        contractAddress: '0xc36d046616Ae801F1caaEBBb87f1Ca370A2485aa',
        propertyId: propertyId,
        to: data.transferTo,
        amount: data.numShares,
      });
    //   console.log('toId: ', toId);
    //   console.log('amount: ', amount);
      //   onTransfer(data.transferTo, data.numShares);
      // Reset form
      //   setToShareholder('');
      //   setNumShares(0);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Select
        label="Transfer To"
        value={toShareholder}
        onChange={(e) => setToShareholder(e.target.value)}
      >
        <option value="">Select shareholder</option>
        {shareholders.map((sh, index) => (
          <option key={sh} value={sh}>
            {sh} ({shares[index]} shares)
          </option>
        ))}
      </Select> */}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Transfer To"
            disabled={isTransferring}
            {...register('transferTo', {
              required: 'Transfer to address is required.',
            })}
            error={!!errors.transferTo}
            helperText={errors.transferTo?.message as string}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Number of Shares"
            disabled={isTransferring}
            {...register('numShares', {
              required: 'Number of shares is required.',
            })}
            error={!!errors.numShares}
            helperText={errors.numShares?.message as string}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button type="submit">Transfer Shares</Button>
    </form>
  );
};

{
  /* <div>
  <h2 className="text-xl font-semibold mb-2">Transfer Shares</h2>
  <div className="space-y-4">
    <div>
      <label
        htmlFor="recipient"
        className="block text-sm font-medium text-gray-700"
      >
        Recipient Address
      </label>
      <input
        type="text"
        id="recipient"
        value={recipient}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="0x..."
      />
    </div>
    <div>
      <label
        htmlFor="shares"
        className="block text-sm font-medium text-gray-700"
      >
        Number of Shares
      </label>
      <input
        type="number"
        id="shares"
        value={numberOfShares}
        min="1"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter number of shares"
      />
    </div>
    <button
      type="button"
      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Transfer Shares
    </button>
  </div>
</div>; */
}
