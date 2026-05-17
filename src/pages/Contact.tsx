import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pb-24 px-6 md:px-16 max-w-[1440px] mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <span className="font-mono text-xs text-secondary mb-4 block uppercase tracking-widest font-bold">CONNECT WITH OUR TEAM</span>
        <h1 className="text-4xl md:text-6xl text-primary font-display font-black uppercase tracking-tighter mb-16 leading-[0.9]">We're Ready <br/>To Deliver.</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start mb-32">
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4 p-8 bg-surface-container/30 border border-primary/5 rounded-xl">
              <div className="flex items-center gap-3 text-primary">
                <MapPin size={24} className="text-secondary" />
                <h3 className="font-display font-black uppercase tracking-tight text-lg">Central Hub</h3>
              </div>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed">Lagos State, Nigeria<br/><span className="text-[10px] font-bold opacity-40 uppercase">Inventory pick-up by appointment only</span></p>
            </div>
            
            <div className="space-y-4 p-8 bg-surface-container/30 border border-primary/5 rounded-xl">
              <div className="flex items-center gap-3 text-primary">
                <Phone size={24} className="text-secondary" />
                <h3 className="font-display font-black uppercase tracking-tight text-lg">Direct Line</h3>
              </div>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed">+234 810 555 0000<br/><span className="text-[10px] font-bold opacity-40 uppercase">Mon - Sat, 8am - 6pm</span></p>
            </div>

            <div className="space-y-4 p-8 bg-surface-container/30 border border-primary/5 rounded-xl">
              <div className="flex items-center gap-3 text-primary">
                <Mail size={24} className="text-secondary" />
                <h3 className="font-display font-black uppercase tracking-tight text-lg">Inquiries</h3>
              </div>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed">sales@fendolgroup.com<br/><span className="text-[10px] font-bold opacity-40 uppercase">Typical response: 2 hours</span></p>
            </div>

            <div className="space-y-4 p-8 bg-surface-container/30 border border-primary/5 rounded-xl">
              <div className="flex items-center gap-3 text-primary">
                <Clock size={24} className="text-secondary" />
                <h3 className="font-display font-black uppercase tracking-tight text-lg">Supply Hours</h3>
              </div>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed">Mon – Fri: 8am – 6pm<br/>Sat: 9am – 4pm</p>
            </div>
          </div>

          <div className="bg-primary text-on-primary p-10 md:p-12 rounded-xl shadow-2xl relative overflow-hidden">
            <h3 className="text-3xl font-display font-black uppercase mb-8 tracking-tighter relative z-10">Instant Ordering</h3>
            <div className="space-y-8 relative z-10">
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-white/10 rounded-lg">
                  <MessageSquare className="text-secondary shrink-0" size={24} />
                </div>
                <div>
                  <p className="font-black mb-1 uppercase text-sm tracking-tight text-secondary">Priority WhatsApp Channel</p>
                  <p className="text-sm opacity-70 mb-6 font-medium leading-relaxed">Direct connection to our logistics team. Best for real-time order tracking and quick checkout.</p>
                  <a href="#" className="bg-white text-primary px-10 py-4 rounded-sm text-xs font-black tracking-widest uppercase inline-block hover:bg-secondary hover:text-on-secondary transition-all shadow-lg active:scale-95">WhatsApp Dispatch</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border-2 border-primary/5 p-10 md:p-12 rounded-xl shadow-xl">
          <h2 className="text-4xl font-display font-black uppercase mb-2 tracking-tighter">Wholesale Intake</h2>
          <p className="text-on-surface-variant text-sm font-medium mb-10 opacity-70">Supply volume requirements for retail chains, hotels, and restaurants.</p>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Authorized Officer</label>
                <input type="text" className="w-full bg-surface-container/50 border-2 border-primary/5 p-4 text-sm font-bold focus:border-secondary outline-none rounded-sm transition-all" placeholder="Enter name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Entity / Business Name</label>
                <input type="text" className="w-full bg-surface-container/50 border-2 border-primary/5 p-4 text-sm font-bold focus:border-secondary outline-none rounded-sm transition-all" placeholder="Enter company" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Contact Number</label>
                <input type="tel" className="w-full bg-surface-container/50 border-2 border-primary/5 p-4 text-sm font-bold focus:border-secondary outline-none rounded-sm transition-all" placeholder="+234..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Supply Location</label>
                <input type="text" className="w-full bg-surface-container/50 border-2 border-primary/5 p-4 text-sm font-bold focus:border-secondary outline-none rounded-sm transition-all" placeholder="State/City" />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Projected Product Requirements</label>
              <div className="grid grid-cols-2 gap-4">
                {['Stockfish (Whole)', 'Stockfish (Pieces)', 'Smoked Catfish', 'Dried Crayfish'].map(item => (
                  <label key={item} className="flex items-center gap-4 cursor-pointer group p-3 bg-surface-container/30 rounded-sm border border-primary/5 hover:border-secondary transition-all">
                    <input type="checkbox" className="w-5 h-5 rounded-none border-2 border-primary/20 text-secondary focus:ring-0 cursor-pointer" />
                    <span className="text-[10px] text-primary font-black uppercase tracking-tight group-hover:text-secondary transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">Message / Volume Notes</label>
              <textarea rows={4} className="w-full bg-surface-container/50 border-2 border-primary/5 p-4 text-sm font-bold focus:border-secondary outline-none resize-none rounded-sm transition-all" placeholder="Describe your average monthly volume..."></textarea>
            </div>
            <button className="w-full bg-primary text-on-primary py-5 font-black text-xs uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-all shadow-lg active:scale-95">Dispatch Request</button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mb-32">
        <h2 className="text-4xl md:text-5xl text-primary font-display font-black uppercase tracking-tighter mb-16 text-center">Logistics FAQ</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-8 bg-surface-container/30 border-2 border-primary/5 rounded-xl hover:bg-surface transition-all">
            <h3 className="font-display font-black text-lg uppercase text-primary mb-3 tracking-tight">Do you deliver outside Lagos?</h3>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-80">Yes. We ship nationwide via GIG Logistics or trusted transit partners. Typical transit time is 2-4 business days nationwide.</p>
          </div>
          <div className="p-8 bg-surface-container/30 border-2 border-primary/5 rounded-xl hover:bg-surface transition-all">
            <h3 className="font-display font-black text-lg uppercase text-primary mb-3 tracking-tight">Minimum Retail Orders?</h3>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-80">We have no minimum for retail orders. We believe every kitchen deserves quality fish, whether for a family meal or a small pot.</p>
          </div>
          <div className="p-8 bg-surface-container/30 border-2 border-primary/5 rounded-xl hover:bg-surface transition-all">
            <h3 className="font-display font-black text-lg uppercase text-primary mb-3 tracking-tight">Bulk Supply Pricing?</h3>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-80">Wholesale pricing triggers at 10kg+ for single products or 25kg+ for mixed inventory. Contact our sales desk for the current price list.</p>
          </div>
          <div className="p-8 bg-surface-container/30 border-2 border-primary/5 rounded-xl hover:bg-surface transition-all">
            <h3 className="font-display font-black text-lg uppercase text-primary mb-3 tracking-tight">Storage Best Practices?</h3>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-80">Store in an airtight container in a cool, ventilated area. For long-term preservation beyond 60 days, vacuum seal and freeze at -18°C.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
