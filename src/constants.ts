import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'stockfish-medium',
    name: 'Whole Stockfish (Medium)',
    description: 'Premium Norwegian cod, air-dried, defining ingredient for Igbo soups.',
    price: 3500,
    category: 'Stockfish (Okporoko)',
    tag: 'Okporoko • Medium',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800',
    details: 'Our medium whole stockfish is imported from Norway and Iceland. It is the defining ingredient in many Eastern Nigerian soups like bitterleaf and egusi. Rich in protein, zero fat added.',
    origin: 'Norway / Iceland',
    shelfLife: '24 Months',
    weightOptions: ['400g-600g']
  },
  {
    id: 'stockfish-large',
    name: 'Whole Stockfish (Large)',
    description: 'Extra large premium cod, ideal for large pots and catering.',
    price: 5500,
    category: 'Stockfish (Okporoko)',
    tag: 'Okporoko • Large',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=1200',
    origin: 'Norway / Iceland',
    shelfLife: '24 Months',
    weightOptions: ['700g-1kg']
  },
  {
    id: 'stockfish-heads',
    name: 'Stockfish Heads (Okporoko Isi)',
    description: 'Intensely flavoured, high gelatin content for rich soup body.',
    price: 2000,
    category: 'Stockfish (Okporoko)',
    tag: 'Flavor Bomb • Heads',
    image: 'https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?auto=format&fit=crop&q=80&w=800',
    details: 'The most prized cut. High demand and limited stock. Gives soup a thick, rich body that seasoning cubes can never replace.',
    origin: 'Norway / Iceland',
    shelfLife: '24 Months'
  },
  {
    id: 'smoked-catfish-large',
    name: 'Whole Smoked Catfish (Large Ring)',
    description: 'Oven-smoked, full rings, meaty and rich texture.',
    price: 3500,
    category: 'Smoked Catfish',
    tag: 'Fendol Smoked • Large',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    details: 'Our catfish is farmed and processed in-house in Lagos. Properly smoked, not half-dried. The flavor is deep and holds perfectly in soup.',
    origin: 'Fendol Farm, Lagos',
    shelfLife: '6 Months',
    weightOptions: ['800g-1.2kg']
  },
  {
    id: 'smoked-catfish-medium',
    name: 'Whole Smoked Catfish (Medium Ring)',
    description: 'Signature Fendol smoked catfish in medium size.',
    price: 2500,
    category: 'Smoked Catfish',
    tag: 'Fendol Smoked • Medium',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    origin: 'Fendol Farm, Lagos',
    shelfLife: '6 Months',
    weightOptions: ['400g-600g']
  },
  {
    id: 'bonga-fish-wrap',
    name: 'Dried Bonga Fish (Full Wrap)',
    description: 'Traditional smoked and dried shawa, the everyday soup fish.',
    price: 800,
    category: 'Bonga Fish / Shawa',
    tag: 'Everyday Essential • Wrap',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
    details: 'The everyday soup fish of West Africa. Deeply smoky and essential for building a flavor base that STOCK cubes cannot fake.',
    origin: 'West African Coast',
    shelfLife: '12 Months'
  },
  {
    id: 'thailand-fish',
    name: 'Thailand Fish (Asa)',
    description: 'Imported dried fish popular in Lagos and Yoruba soups.',
    price: 1500,
    category: 'Other Dried Fish',
    tag: 'Imported • Dried',
    image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800',
    origin: 'Imported',
    shelfLife: '12 Months'
  },
  {
    id: 'crayfish-ground',
    name: 'Ground Crayfish (Pure)',
    description: '100% pure sun-dried crayfish, no fillers added.',
    price: 1500,
    category: 'Crayfish & Extras',
    tag: 'Pantry • Pure',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4520b?auto=format&fit=crop&q=80&w=800',
    origin: 'Southern Nigeria Coast',
    shelfLife: '12 Months',
    weightOptions: ['200g pack']
  },
  {
    id: 'dry-prawns',
    name: 'Dry Prawns (Ede Nkpor)',
    description: 'Small dried whole prawns with intense umami flavor.',
    price: 2000,
    category: 'Crayfish & Extras',
    tag: 'Umami • Prawns',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4520b?auto=format&fit=crop&q=80&w=600',
    origin: 'Nigerian Coastal Markets',
    shelfLife: '12 Months',
    weightOptions: ['200g pack']
  }
];
