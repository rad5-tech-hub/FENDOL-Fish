"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Package, Truck, CheckCircle, Clock, MessageCircle } from 'lucide-react';

type Step = { key: string; label: string; date?: string; icon: any };

const MOCK_TIMELINE: Record<string, Step[]> = {
  default: [
    { key: 'placed', label: 'Order Placed', date: 'Mar 15, 2026 · 09:42 AM', icon: CheckCircle },
    { key: 'processed', label: 'Processed & Packed', date: 'Mar 15, 2026 · 02:18 PM', icon: Package },
    { key: 'shipped', label: 'In Transit', date: 'Mar 16, 2026 · 07:05 AM', icon: Truck },
    { key: 'delivery', label: 'Out for Delivery', date: 'Estimated Mar 17, 2026', icon: Clock },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle },
  ],
};

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);
  const [activeStep] = useState(2);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setSearched(true);
  };

  const timeline = MOCK_TIMELINE.default;

  return (
    <main className="px-6 md:px-16 max-w-[1440px] mx-auto overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
        <span className="font-mono text-xs text-secondary mb-4 block uppercase tracking-widest font-bold">DELIVERY STATUS</span>
        <h1 className="text-4xl md:text-6xl text-primary font-display font-black uppercase tracking-tighter mb-6 leading-[0.9]">Track Your <br/>Order.</h1>
        <p className="text-lg text-on-surface-variant font-medium mb-12 max-w-2xl">Enter your order ID to see real-time delivery status, estimated arrival, and full shipment timeline.</p>
      </motion.div>

      {/* Search */}
      <form onSubmit={handleTrack} className="max-w-2xl mb-16">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. FND-2026-00432"
              className="w-full pl-14 pr-6 py-5 bg-surface-container/40 border border-primary/10 rounded-sm text-base font-mono uppercase tracking-wider focus:border-secondary outline-none transition-colors"
            />
          </div>
          <button type="submit" className="px-10 py-5 bg-primary text-on-primary text-xs font-black uppercase tracking-widest hover:bg-secondary transition-all rounded-sm shadow-lg">
            Track Order
          </button>
        </div>
      </form>

      {searched ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 p-8 bg-surface-container/40 border border-primary/5 rounded-2xl h-fit">
            <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-black">Order ID</span>
            <h2 className="text-2xl font-black text-primary mt-1 mb-6 font-mono tracking-tight">{orderId.toUpperCase()}</h2>
            <div className="space-y-4 text-sm">
              <Row label="Status" value="In Transit" highlight />
              <Row label="Estimated Arrival" value="Mar 17, 2026" />
              <Row label="Destination" value="Lagos, NG" />
              <Row label="Carrier" value="FENDOL Dispatch" />
              <Row label="Items" value="3 cartons" />
            </div>
            <a
              href="https://wa.me/2348052641000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all rounded-sm"
            >
              <MessageCircle size={16} /> Contact Support
            </a>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2 p-8 md:p-10 bg-surface border border-primary/5 rounded-2xl">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-8">Shipment Timeline</h3>
            <div className="relative">
              <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-primary/10"></div>
              <div className="space-y-8">
                {timeline.map((step, idx) => {
                  const done = idx <= activeStep;
                  const current = idx === activeStep;
                  return (
                    <div key={step.key} className="relative pl-16">
                      <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                        done ? (current ? 'bg-secondary border-secondary/30 text-white' : 'bg-primary border-primary/20 text-on-primary') : 'bg-surface border-primary/10 text-on-surface-variant/40'
                      }`}>
                        <step.icon size={16} />
                      </div>
                      <div className="pt-2">
                        <h4 className={`text-base font-black uppercase tracking-tight ${done ? 'text-primary' : 'text-on-surface-variant/40'}`}>{step.label}</h4>
                        {step.date && <p className="text-xs font-mono text-on-surface-variant/60 mt-1 uppercase tracking-widest">{step.date}</p>}
                        {current && <span className="inline-block mt-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-sm">Current</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Search, title: 'Enter ID', desc: 'Find your order ID in your confirmation email or SMS.' },
            { icon: Package, title: 'View Status', desc: 'See where your package is in real-time.' },
            { icon: MessageCircle, title: 'Need Help?', desc: 'Reach our team directly on WhatsApp.' },
          ].map((c) => (
            <div key={c.title} className="p-8 bg-surface-container/30 border border-primary/5 rounded-xl">
              <c.icon size={24} className="text-secondary mb-4" />
              <h3 className="text-lg font-black text-primary uppercase tracking-tight mb-2">{c.title}</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center pb-3 border-b border-primary/5 last:border-0">
      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">{label}</span>
      <span className={`text-sm font-black ${highlight ? 'text-secondary' : 'text-primary'}`}>{value}</span>
    </div>
  );
}
