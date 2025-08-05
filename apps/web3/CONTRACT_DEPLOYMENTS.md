# ArtNightRaffle Contract Deployments

## Deployed Contracts

### Contract 1: Initial Deployment (Gas Limit: 100,000)
- **Address**: `0xA8de7E20fAe9C3378BFd4adFcd5d4eA66FE1f524`
- **Gas Limit**: 100,000
- **Status**: ✅ Working (Winner selected: Ticket #5)
- **Notes**: First successful deployment with high gas limit

### Contract 2: Low Gas Test (Gas Limit: 10,000)
- **Address**: `0xB0a7701e0e887c1FE7AEB9f0B42c5FF297B7e291`
- **Gas Limit**: 10,000
- **Status**: ❌ VRF callback not completing
- **Notes**: Gas limit too low

### Contract 3: Balanced Gas (Gas Limit: 50,000)
- **Address**: `0x15eACC51afD8b24aeCC85835A3F3921B345e8634`
- **Gas Limit**: 50,000
- **Status**: ✅ Working (Winner selected: Ticket #5)
- **Notes**: Successfully completed VRF callback

### Contract 4: Higher Gas Test (Gas Limit: 75,000)
- **Address**: `0xf28295f3291DAA77Eb60B64b30a70ee25ea8C5dB`
- **Gas Limit**: 75,000
- **Status**: ⏳ Testing
- **Notes**: Currently being tested

### Contract 5: Latest with Logging (Gas Limit: 75,000)
- **Address**: `0x6A63BDB63c6Aa63e43B0744D2709a7101f83E855`
- **Gas Limit**: 75,000
- **Status**: ⏳ Testing
- **Notes**: Added RandomValueReceived event logging

## Recommended Contract for Testing

**Use Contract 3**: `0x15eACC51afD8b24aeCC85835A3F3921B345e8634`
- ✅ Proven to work
- ✅ Gas limit: 50,000 (cost-effective)
- ✅ Successfully completed VRF callbacks

## Usage Commands

To test with Contract 3:
```bash
# Update scripts to use Contract 3
# Then run:
npx hardhat run scripts/testRaffle.js --network sepolia
RAFFLE_ID=0 npx hardhat run scripts/selectWinner.js --network sepolia
RAFFLE_ID=0 npx hardhat run scripts/checkWinner.js --network sepolia
``` 