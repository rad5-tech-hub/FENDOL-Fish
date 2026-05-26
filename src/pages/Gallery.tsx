import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['All', 'Our Fish', 'Packaging & Delivery', 'Nigerian Dishes'];

const GALLERY_IMAGES = [
  { id: 1, category: 'Our Fish', url: 'https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?q=80&w=800', title: 'Whole Dried Stockfish' },
  { id: 2, category: 'Our Fish', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800', title: 'Smoked Catfish Ring' },
  { id: 3, category: 'Nigerian Dishes', url: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=800', title: 'Egusi Soup with Fish' },
  { id: 4, category: 'Packaging & Delivery', url: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800', title: 'Fendol Packaging' },
  { id: 5, category: 'Our Fish', url: 'https://images.unsplash.com/photo-1559737558-2f5a35f4520b?q=80&w=800', title: 'Bonga Fish Bundles' },
  { id: 6, category: 'Nigerian Dishes', url: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=800', title: 'Ofe Onugbu' },
  { id: 7, category: 'Packaging & Delivery', url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800', title: 'Warehouse Stock' },
  { id: 8, category: 'Our Fish', url: 'https://images.unsplash.com/photo-1559737558-2f5a35f4520b?q=80&w=800', title: 'Premium stockfish heads' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <main className="px-6 md:px-16 max-w-[1440px] mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="font-mono text-xs text-secondary mb-4 block uppercase tracking-widest font-bold">VISUAL REPERTORY</span>
        <h1 className="text-4xl md:text-6xl text-primary font-display font-black uppercase tracking-tighter mb-8 leading-[0.9]">From Smokehouse <br/>To Your Table.</h1>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-4 font-sans text-xs uppercase tracking-tight font-black transition-all rounded-sm ${
              activeCategory === cat 
                ? 'bg-primary text-on-primary shadow-xl shadow-primary/20' 
                : 'bg-surface-container/30 border-2 border-primary/5 text-on-surface-variant hover:border-secondary hover:text-secondary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img) => (
            <motion.div
              layout
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="aspect-square bg-surface-container relative group overflow-hidden rounded-xl border-2 border-primary/5 shadow-sm hover:shadow-2xl transition-all"
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center">
                <span className="font-mono text-[10px] text-secondary uppercase font-black tracking-widest block mb-3">{img.category}</span>
                <h3 className="text-on-primary text-xl font-display font-black uppercase tracking-tight leading-tight">{img.title}</h3>
                <div className="mt-4 w-10 h-1 bg-secondary rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
