import { useEffect, useMemo, useState } from 'react';
import { fetchPublicProducts } from '../api/products';
import type { ApiProduct, Product } from '../types';

const FALLBACK_IMAGE = '/assets/landingimages/Smoked fishes in the oven 2.png';

function mapProduct(product: ApiProduct): Product {
  const unitLabel = product.unit ? product.unit.toUpperCase() : 'UNIT';
  const availability = product.quantityAvailable > 0 ? 'IN STOCK' : 'OUT OF STOCK';

  return {
    id: product.id,
    name: product.productName,
    description: `${product.productName} (${product.unit})`,
    price: product.basePrice,
    category: unitLabel,
    tag: `${availability} • ${unitLabel}`,
    image: product.imageUrl || FALLBACK_IMAGE,
    unit: product.unit,
    quantityAvailable: product.quantityAvailable,
  };
}

export default function usePublicProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const items = await fetchPublicProducts();
        if (!isMounted) return;
        setProducts(items.filter(p => p.quantityAvailable && p.quantityAvailable > 0).map(mapProduct));
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load products.');
        setProducts([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
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
