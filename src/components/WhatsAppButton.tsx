import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const PHONE = '2348052641000';
const DEFAULT_MSG = "Hello FENDOL, I'd like to place an order.";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(DEFAULT_MSG)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-surface border border-primary/10 rounded-2xl shadow-2xl p-5 w-72 animate-fade-in">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="font-mono text-[10px] text-[#25D366] uppercase tracking-widest font-black">Online Now</span>
              <h4 className="text-base font-black text-primary uppercase tracking-tight mt-1">Chat With Us</h4>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-surface-container rounded-full" aria-label="Close">
              <X size={16} className="text-on-surface-variant" />
            </button>
          </div>
          <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-4">Get quick answers on orders, bulk pricing, or delivery. We typically reply in minutes.</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all rounded-sm"
          >
            <MessageCircle size={16} /> Start Chat
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open WhatsApp chat"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle size={26} />
      </button>
    </div>
  );
}
