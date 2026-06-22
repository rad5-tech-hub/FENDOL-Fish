import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types';
import packsData from '../data/packs.json';

const FALLBACK_IMAGE = '/assets/Smoked fish presentation in smoky setting 1 (1).png';

function getFallbackProducts(): Product[] {
  const mappedPacks: Product[] = packsData.packs.map((pack) => ({
    id: pack.name.toLowerCase().replace(/\s+/g, '-'),
    name: pack.name,
    description: `Standard pack configuration: ${pack.items.map(i => `${i.quantity} ${i.size}`).join(', ')}`,
    price: pack.price,
    category: 'PACK',
    tag: 'IN STOCK • PACK',
    image: FALLBACK_IMAGE,
    unit: 'Pack',
    quantityAvailable: 100,
  }));

  const mappedCombos: Product[] = packsData.combos.map((combo) => ({
    id: combo.name.toLowerCase().replace(/\s+/g, '-'),
    name: combo.name,
    description: combo.description,
    price: combo.packs && combo.packs.length > 0 ? combo.packs[0].price : 18000,
    category: 'COMBO',
    tag: 'IN STOCK • COMBO',
    image: FALLBACK_IMAGE,
    unit: 'Combo',
    quantityAvailable: 100,
  }));

  return [...mappedPacks, ...mappedCombos];
}

export default function usePublicProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProducts(getFallbackProducts());
    setLoading(false);
    setError(null);
  }, []);

  const categories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category));
    return ['All Products', ...Array.from(categorySet)];
  }, [products]);

  return {
    products,
    categories,
    loading,
    error,
  };
}



