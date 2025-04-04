import { PublicKey } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey('8JJy6sL3gYvUSxRxFv5t8xDTxGJc2YrVohmw9GrapDBq');

export const CHARITIES = [
  {
    name: 'Global Education Fund',
    address: new PublicKey('8JJy6sL3gYvUSxRxFv5t8xDTxGJc2YrVohmw9GrapDBq'),
    description: 'Providing education opportunities worldwide',
    website: 'https://example.org/gef',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
  },
  {
    name: 'Ocean Conservation Initiative',
    address: new PublicKey('8JJy6sL3gYvUSxRxFv5t8xDTxGJc2YrVohmw9GrapDBq'),
    description: 'Protecting marine ecosystems',
    website: 'https://example.org/oci',
    image: 'https://images.unsplash.com/photo-1583212292454-39d2a86a7921',
  },
  {
    name: 'Hunger Relief Network',
    address: new PublicKey('8JJy6sL3gYvUSxRxFv5t8xDTxGJc2YrVohmw9GrapDBq'),
    description: 'Fighting food insecurity globally',
    website: 'https://example.org/hrn',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
  },
];

export const FLIP_AMOUNT = 0.1; // SOL