import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types';
import { fetchPublicProducts } from '../api/products';

export default function usePublicProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const fetchedProducts = await fetchPublicProducts();
        
        const mappedProducts = fetchedProducts.map(p => ({
          ...p,
          id: p.id,
          name: p.productName || 'Unnamed Product',
          description: (p as any).description || 'Premium quality fish',
          price: p.basePrice || 0,
          category: (p as any).categoryName || (p as any).category || 'Uncategorized',
          tag: p.quantityAvailable > 0 ? 'IN STOCK' : 'OUT OF STOCK',
          image: p.imageUrl || '/assets/landingimages/Smoked fish presentation in smoky setting.png',
          unit: p.unit || 'Item',
          quantityAvailable: p.quantityAvailable || 0,
        })) as Product[];
        
        setProducts(mappedProducts);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
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
