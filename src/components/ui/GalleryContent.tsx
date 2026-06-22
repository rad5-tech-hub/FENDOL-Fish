"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['All', 'Our Fish', 'Packaging & Delivery'];

const GALLERY_IMAGES = [
  { id: 1, category: 'Our Fish', url: '/assets/process/Live pond.JPG', title: 'Live Catfish Pond' },
  { id: 2, category: 'Our Fish', url: '/assets/process/butcher preparing fresh catfish segments.png', title: 'Fresh Catfish Segments' },
  { id: 3, category: 'Our Fish', url: '/assets/process/Smoked fishes in the oven 1.png', title: 'Traditional Smokehouse' },
  { id: 4, category: 'Our Fish', url: '/assets/landingimages/Smoked fishes in the oven 2.png', title: 'Batch Oven Drying' },
  { id: 5, category: 'Our Fish', url: '/assets/Smoked fish in aesthetic detailing 1.png', title: 'Aesthetic Detailing' },
  { id: 6, category: 'Our Fish', url: '/assets/Smoked fish presentation in smoky setting 1 (1).png', title: 'Smoked Fish Presentation' },
  { id: 7, category: 'Packaging & Delivery', url: '/assets/process/Smiling man with Fendol Fish packaging.png', title: 'Fendol Carton Packaging' },
  { id: 8, category: 'Packaging & Delivery', url: '/assets/process/Parcel handoff with Fendol Fish box 3.png', title: 'Logistics & Handoff' },
  { id: 9, category: 'Our Fish', url: '/assets/landingimages/Smoked fish presentation in smoky setting.png', title: 'Hearth Fire Smoking' },
  { id: 10, category: 'Our Fish', url: '/assets/landingimages/Smoked fish presentation in smoky setting 1.png', title: 'Woodfire Aroma Details' }
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
