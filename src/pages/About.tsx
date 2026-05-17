import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <main className="pb-24 px-6 md:px-16 max-w-[1440px] mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <span className="font-mono text-xs text-secondary mb-4 block uppercase tracking-widest font-bold">OUR STORY</span>
        <h1 className="text-4xl md:text-6xl text-primary font-display font-black uppercase tracking-tighter mb-16 leading-[0.9]">We Know Fish. <br/>Since Day One.</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start mb-32">
        <div className="space-y-8 text-lg text-on-surface-variant leading-relaxed font-sans font-medium">
          <p>
            Fendol Fish started as a simple conviction: Nigerians deserve access to properly sourced, hygienically handled dried fish without having to dig through dusty market stalls wondering if what they're buying is fresh.
          </p>
          <p>
            We began in Lagos — growing, smoking, and packaging catfish in-house — and expanded to sourcing premium-grade stockfish directly from suppliers in Norway and Iceland. Today, we serve retail customers, food businesses, restaurants, and caterers across Nigeria.
          </p>
          <div className="py-10 border-y-4 border-secondary/10">
            <p className="font-display text-3xl font-black text-primary leading-tight uppercase tracking-tight">
              We grow the fish. We grill it. We smoke it. We dry it. We pack it. And we deliver it to you.
            </p>
          </div>
          <p>
            That's the whole chain. No middlemen inflating prices. No mystery about where your fish comes from. We are producers first, and suppliers second.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-xl border-4 border-primary/5 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" 
              alt="Artisanal Fish Processing" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-secondary p-10 hidden md:block shadow-xl rounded-sm">
            <span className="font-mono text-[10px] text-on-secondary uppercase tracking-widest block mb-1 font-black">QUALITY GUARANTEED</span>
            <span className="text-4xl text-on-secondary font-display font-black uppercase tracking-tighter">100% NATURAL</span>
          </div>
        </div>
      </div>

      <section className="mb-32">
        <h2 className="text-4xl text-primary font-display font-black uppercase tracking-tighter mb-12 border-b-4 border-primary/5 pb-6">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-surface-container/30 border-2 border-primary/5 rounded-xl hover:bg-surface-container transition-colors">
            <h3 className="text-xl text-primary font-display font-black uppercase mb-4 tracking-tight">Freshness is Final</h3>
            <p className="text-on-surface-variant font-medium text-sm leading-relaxed">If it doesn't smell right, it doesn't leave our warehouse. We maintain strict standards from harvest to delivery. Our reputation is built on every pack.</p>
          </div>
          <div className="p-10 bg-surface-container/30 border-2 border-primary/5 rounded-xl hover:bg-surface-container transition-colors">
            <h3 className="text-xl text-primary font-display font-black uppercase mb-4 tracking-tight">Radical Honesty</h3>
            <p className="text-on-surface-variant font-medium text-sm leading-relaxed">No preservatives, no dye, no oil-coating to fake freshness. What you see is exactly what was harvested. Our products are authentic, through and through.</p>
          </div>
          <div className="p-10 bg-surface-container/30 border-2 border-primary/5 rounded-xl hover:bg-surface-container transition-colors">
            <h3 className="text-xl text-primary font-display font-black uppercase mb-4 tracking-tight">Culinary Heritage</h3>
            <p className="text-on-surface-variant font-medium text-sm leading-relaxed">Stockfish isn't just an ingredient — it's history, identity, and the taste of home. We honor these traditions by sourcing with respect.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20 px-12 bg-primary text-on-primary rounded-2xl mb-32 shadow-2xl">
        <div className="text-center">
          <span className="text-5xl md:text-7xl font-display font-black block mb-2 tracking-tighter">5K+</span>
          <span className="font-mono text-[10px] uppercase font-black tracking-widest opacity-60">Orders Fulfilled</span>
        </div>
        <div className="text-center">
          <span className="text-5xl md:text-7xl font-display font-black block mb-2 tracking-tighter">20+</span>
          <span className="font-mono text-[10px] uppercase font-black tracking-widest opacity-60">States Served</span>
        </div>
        <div className="text-center">
          <span className="text-5xl md:text-7xl font-display font-black block mb-2 tracking-tighter">12+</span>
          <span className="font-mono text-[10px] uppercase font-black tracking-widest opacity-60">Inventory Lines</span>
        </div>
        <div className="text-center">
          <span className="text-5xl md:text-7xl font-display font-black block mb-2 tracking-tighter">4.9</span>
          <span className="font-mono text-[10px] uppercase font-black tracking-widest opacity-60">Merchant Rating</span>
        </div>
      </section>
    </main>
  );
}
