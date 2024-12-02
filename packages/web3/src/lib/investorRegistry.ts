export const INVESTOR_REGISTRY_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
    ],
    name: 'InvestorRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
    ],
    name: 'InvestorRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'InvestorVerified',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'VerifierAuthorized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'VerifierRemoved',
    type: 'event',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'authorizeVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'removeVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'registerInvestor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'registerInvestorByOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
    ],
    name: 'removeInvestor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
    ],
    name: 'verifyInvestor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
    ],
    name: 'isRegisteredInvestor',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
    ],
    name: 'isVerifiedInvestor',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'investor',
        type: 'address',
      },
    ],
    name: 'getInvestorDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isRegistered',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isVerified',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'verifier',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'verificationTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'investor',
            type: 'address',
          },
        ],
        internalType: 'struct InvestorRegistry.InvestorDetails',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'verifier',
        type: 'address',
      },
    ],
    name: 'isAuthorizedVerifier',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllInvestors',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllInvestorsDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isRegistered',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isVerified',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'verifier',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'verificationTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'investor',
            type: 'address',
          },
        ],
        internalType: 'struct InvestorRegistry.InvestorDetails[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAuthorizedVerifiers',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
