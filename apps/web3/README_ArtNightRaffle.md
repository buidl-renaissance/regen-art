# ArtNightRaffle Smart Contract

A decentralized raffle contract that uses Chainlink VRF v2.5 to randomly select winners from an array of ticket numbers.

## Features

- ✅ Uses Chainlink VRF v2.5 for provably fair randomness
- ✅ Supports custom ticket numbers (e.g., 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
- ✅ Owner-controlled raffle creation and winner selection
- ✅ Event emissions for transparency
- ✅ Comprehensive getter functions for state inspection
- ✅ Reset functionality for new raffles

## Contract Details

### VRF Configuration (Ethereum Sepolia)
- **VRF Coordinator**: `0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B`
- **Subscription ID**: `77899604690368234140542231011632468025290834504310678429410906800047067486655`
- **Gas Lane**: `0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c`

## Deployment Instructions

### 1. Environment Setup

Make sure you have the following environment variables set in your `.env` file:

```bash
INFURA_PROJECT_ID=your_infura_project_id
PRIVATE_KEY=your_wallet_private_key
```

### 2. Deploy the Contract

```bash
cd apps/web3
npx hardhat run scripts/deployArtNightRaffle.js --network sepolia
```

This will deploy the contract and output the contract address. **Save this address for the next steps.**

### 3. Add Contract as Consumer

After deployment, you need to add the contract as a consumer to your VRF subscription:

1. Update the `CONTRACT_ADDRESS` in `scripts/addConsumerToSubscription.js`
2. Run the script:

```bash
npx hardhat run scripts/addConsumerToSubscription.js --network sepolia
```

### 4. Fund Your Subscription

Make sure your VRF subscription has enough LINK tokens to pay for VRF requests. You can fund it through the [Chainlink VRF Subscription Manager](https://vrf.chain.link/sepolia).

## Usage Instructions

### 1. Test the Contract

Update the `CONTRACT_ADDRESS` in `scripts/testRaffle.js` and run:

```bash
npx hardhat run scripts/testRaffle.js --network sepolia
```

This will create a raffle with tickets 1-10.

### 2. Select a Winner

Update the `CONTRACT_ADDRESS` in `scripts/selectWinner.js` and run:

```bash
npx hardhat run scripts/selectWinner.js --network sepolia
```

This will request a random number from VRF to select a winner.

### 3. Check the Winner

Update the `CONTRACT_ADDRESS` in `scripts/checkWinner.js` and run:

```bash
npx hardhat run scripts/checkWinner.js --network sepolia
```

This will show you the selected winner.

## Contract Functions

### Owner Functions

- `createRaffle(uint256[] memory tickets)` - Creates a new raffle with the provided ticket numbers
- `selectWinner()` - Requests a random number from VRF to select a winner
- `resetRaffle()` - Resets the raffle state for a new raffle

### View Functions

- `getRaffleTickets()` - Returns the current raffle tickets
- `getWinner()` - Returns the selected winner
- `isWinnerSelected()` - Returns whether a winner has been selected
- `isRaffleActive()` - Returns whether the raffle is active
- `getTicketCount()` - Returns the number of tickets in the raffle
- `getVRFConfig()` - Returns the VRF configuration

## Events

- `RaffleCreated(uint256[] tickets)` - Emitted when a new raffle is created
- `WinnerSelected(uint256 winner)` - Emitted when a winner is selected
- `RaffleReset()` - Emitted when the raffle is reset

## Example Usage

1. **Create a raffle with tickets 1-10:**
   ```javascript
   const tickets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   await raffleContract.createRaffle(tickets);
   ```

2. **Select a winner:**
   ```javascript
   await raffleContract.selectWinner();
   ```

3. **Check the winner:**
   ```javascript
   const winner = await raffleContract.getWinner();
   console.log("Winner:", winner.toString());
   ```

## Important Notes

- ⚠️ **Only the contract owner can create raffles and select winners**
- ⚠️ **Make sure your VRF subscription has enough LINK tokens**
- ⚠️ **VRF callbacks may take a few minutes to complete**
- ⚠️ **Each raffle can only have one winner selected**

## Troubleshooting

### Common Issues

1. **"MustBeSubscriptionOwner" error**: Make sure you are the owner of the VRF subscription
2. **"InsufficientFunds" error**: Fund your VRF subscription with LINK tokens
3. **"RaffleNotActive" error**: Create a raffle before selecting a winner
4. **"WinnerAlreadySelected" error**: Reset the raffle to select a new winner

### Gas Configuration

The contract uses the following gas configuration:
- **Callback Gas Limit**: 500,000 (adjust if needed)
- **Request Confirmations**: 3
- **Number of Words**: 1

## Security Considerations

- The contract uses Chainlink VRF v2.5 for provably fair randomness
- Only the contract owner can create raffles and select winners
- The contract is not upgradeable (immutable configuration)
- All state changes are protected by appropriate access controls

## Network Support

Currently configured for:
- ✅ Ethereum Sepolia (testnet)
- 🔄 Can be easily adapted for other networks by updating VRF configuration 