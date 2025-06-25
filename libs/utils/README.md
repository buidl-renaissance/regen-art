# gods-work-utils

A comprehensive utility library for the BUIDL ecosystem, providing common utilities for DPoP (Decentralized Proof of Presence), image processing, date/time formatting, wallet management, and profile handling.

## Installation

```bash
npm install gods-work-utils
# or
yarn add gods-work-utils
```

## Features

### DPoP (Decentralized Proof of Presence)
- User authentication and management
- Event management (create, update, RSVP, check-in)
- Artist and artwork management
- Community and venue management
- Contact management with phone verification
- Connection and bookmark functionality

### Image Utilities
- Image URL conversion utilities
- Support for different image formats (resized, tiles, default)
- Pattern-based URL transformation

### Date/Time Utilities
- Human-readable date formatting
- Time range formatting
- Ordinal suffix handling

### Wallet Management
- Ethereum wallet creation and management
- Message signing capabilities
- Secure storage with localStorage

### Profile Management
- React hook for profile data management
- Local storage integration
- Profile data validation and persistence

## Usage

### DPoP Authentication
```typescript
import { login, getUser, logout } from 'gods-work-utils';

// Login user
const result = await login(email, password);

// Get current user
const user = getUser();

// Logout
logout();
```

### Event Management
```typescript
import { getEvents, createEvent, submitEventRsvp } from 'gods-work-utils';

// Get events
const events = await getEvents({ limit: 10, featured: true });

// Create event
const newEvent = await createEvent(eventData);

// RSVP to event
const rsvp = await submitEventRsvp(eventId, contactData);
```

### Image Utilities
```typescript
import { convertResizedToTiles, convertDefaultToResized } from 'gods-work-utils';

// Convert image URL formats
const tilesUrl = convertResizedToTiles(resizedUrl);
const resizedUrl = convertDefaultToResized(defaultUrl);
```

### Date/Time Formatting
```typescript
import { formatDate, formatTime } from 'gods-work-utils';

// Format date
const formattedDate = formatDate('2024-01-15', true); // "Monday, January 15th"

// Format time range
const timeRange = formatTime('2024-01-15T10:00:00Z', '2024-01-15T12:00:00Z'); // "10:00 am - 12:00 pm"
```

### Wallet Management
```typescript
import { getOrCreateHotWallet, signMessage } from 'gods-work-utils';

// Get or create wallet
const { wallet, address, phrase } = getOrCreateHotWallet();

// Sign message
const signature = await signMessage('Hello World');
```

### Profile Management
```typescript
import { useProfile } from 'gods-work-utils';

function ProfileComponent() {
  const { profileData, loading, error, saveProfile } = useProfile();
  
  // Use profile data and save functions
  return (
    <div>
      {loading ? 'Loading...' : profileData?.handle}
    </div>
  );
}
```

## Development

This library was generated with [Nx](https://nx.dev).

### Running unit tests

Run `nx test utils` to execute the unit tests via [Jest](https://jestjs.io).

### Building

Run `nx build utils` to build the library.

### Linting

Run `nx lint utils` to lint the code.
