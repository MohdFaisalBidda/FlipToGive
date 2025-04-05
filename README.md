# FlipToGive

![FlipToGive Logo](public/logo.png) <!-- Replace with actual logo path if available -->

## Description

FlipToGive is a decentralized application (dApp) built on the Solana blockchain that turns a simple coin flip into a charitable opportunity. Users can flip a virtual coin, and if they get heads, a predefined amount (0.1 SOL) is automatically donated to a selected charity. This project combines blockchain technology with philanthropy to create a fun and meaningful way to contribute to charitable causes.

## Features

- **Decentralized Coin Flip**: Secure and transparent coin flipping mechanism powered by Solana blockchain
- **Charitable Donations**: Automatic donation of 0.1 SOL to charity for winning flips
- **Wallet Integration**: Seamless connection with popular Solana wallets
- **Transaction History**: View your flip history and charitable contributions
- **Charity Selection**: Choose from multiple charitable organizations
- **Responsive Design**: Works on desktop and mobile devices

## Screenshots

<!-- Add screenshots here. Example format: -->
<!-- ![Game Interface](screenshots/game-interface.png) -->
<!-- ![Wallet Connection](screenshots/wallet-connection.png) -->
<!-- ![Successful Donation](screenshots/donation.png) -->

## Technical Stack

- **Frontend**: Next.js with React
- **Styling**: Tailwind CSS
- **Blockchain**: Solana
- **Smart Contracts**: Rust
- **Wallet Integration**: Solana Wallet Adapter
- **Development Environment**: Node.js, TypeScript

## Prerequisites

- Node.js (v14 or later)
- Yarn or npm
- Solana CLI tools (for development)
- A Solana wallet (Phantom, Solflare, etc.)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flip-to-give.git
cd flip-to-give
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Solana RPC URL and other configurations.

4. Build the application:
```bash
yarn build
# or
npm run build
```

## Usage

1. Start the development server:
```bash
yarn dev
# or
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`

3. Connect your Solana wallet using the "Connect Wallet" button

4. Select a charity from the available options

5. Click "Flip Coin" and confirm the transaction in your wallet

6. If you get heads, 0.1 SOL will be donated to the selected charity!

## Configuration

The application can be configured through the following environment variables:

- `NEXT_PUBLIC_SOLANA_NETWORK`: The Solana network to connect to (mainnet, testnet, devnet)
- `NEXT_PUBLIC_SOLANA_RPC_URL`: Custom RPC URL for Solana connection
- `NEXT_PUBLIC_CHARITY_PROGRAM_ID`: The Solana program ID for the FlipToGive contract

Charity addresses and details can be configured in `lib/constants.ts`.

## Development

### Running Tests

```bash
yarn test
# or
npm run test
```

### Deploying the Smart Contract

```bash
yarn deploy:program
# or
npm run deploy:program
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Solana Foundation
- Our charitable partners
- All the contributors who have helped make this project possible

