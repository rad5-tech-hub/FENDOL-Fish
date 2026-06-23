"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import usePublicProducts from '@/src/hooks/usePublicProducts';

function MarketContent() {
  const searchParams = useSearchParams();
  const searchBarQuery = searchParams.get('search');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const { products, categories, loading, error } = usePublicProducts();

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory('All Products');
    }
  }, [categories, activeCategory]);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All Products' || p.category === activeCategory;
    const matchesSearch = !searchBarQuery || 
      p.name.toLowerCase().includes(searchBarQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchBarQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchBarQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-16 transition-colors">
      <section className="mb-16">
        <h1 className="text-3xl md:text-5xl mb-6 uppercase font-extrabold tracking-tighter">
          {searchBarQuery ? `Search: ${searchBarQuery}` : 'The Fresh Inventory'}
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed font-sans">
          Premium supplies of stockfish, smoked catfish, and dried fish. Sourced fresh, processed hygienically, and delivered nationwide to your doorstep or restaurant.
        </p>
      </section>

      <div className="flex flex-col md:grid md:grid-cols-[260px_1fr] gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full flex-shrink-0">
          <div className="sticky top-28 bg-surface-container/30 p-8 rounded-xl border border-primary/5">
            <h2 className="font-sans text-xs mb-8 tracking-widest text-primary font-black uppercase">Filter by Category</h2>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`font-sans text-sm w-full text-left py-3 px-4 rounded-lg flex justify-between items-center transition-all ${
                      activeCategory === cat ? 'bg-primary text-on-primary font-bold shadow-md' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                    }`}
                  >
                    {cat} 
                    <span className={`text-[10px] font-bold ${activeCategory === cat ? 'opacity-70' : 'opacity-40'}`}>
                      {cat === 'All Products' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <div className="col-span-full text-on-surface-variant font-medium">
                Loading products...
              </div>
            )}
            {!loading && error && (
              <div className="col-span-full text-on-surface-variant font-medium">
                {error}
              </div>
            )}
            {!loading && !error && filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col bg-surface border border-primary/5 hover:border-primary/20 hover:shadow-xl transition-all rounded-xl overflow-hidden"
              >
                <Link href={`/product/${product.id}`} className="flex flex-col h-full">
                  <div className="relative aspect-square overflow-hidden bg-surface-container">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={product.image} 
                      alt={product.name}
                    />
                    {idx === 0 && (
                      <span className="absolute top-4 left-4 bg-secondary text-on-secondary px-3 py-1 font-bold text-[9px] uppercase tracking-widest rounded-sm">Bestseller</span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] text-secondary mb-2 uppercase font-black tracking-widest">{product.category}</span>
                    <h3 className="text-xl font-extrabold mb-2 leading-tight group-hover:text-secondary transition-colors">{product.name}</h3>
                    <p className="text-sm text-on-surface-variant mb-6 flex-grow line-clamp-2 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto gap-2 flex-wrap">
                      <span className="text-xl text-primary font-black">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <button className="bg-primary text-on-primary font-bold text-[10px] px-4 py-3 hover:bg-secondary transition-colors active:scale-95 uppercase tracking-widest rounded-md shadow-sm flex-shrink-0">
                        View Product
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-on-surface-variant italic">No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Market() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading market...</div>}>
      <MarketContent />
    </Suspense>
  );
}
