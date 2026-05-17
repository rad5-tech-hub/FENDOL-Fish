import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Fish, Zap, Factory, Truck, Wallet, Handshake, CheckCircle2, MapPin, Phone, MessageCircle, Sprout, Droplets, Scissors, Flame, Package, Send } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';

export default function Home() {
  const featuredSelection = PRODUCTS.slice(0, 3);

  const processSteps = [
    { icon: Sprout, title: 'Fish Farming', desc: 'Healthy fish are raised in controlled ponds.' },
    { icon: Droplets, title: 'Cleaning & Processing', desc: 'Hygienic preparation and treatment.' },
    { icon: Scissors, title: 'Harvesting', desc: 'Fish are selected and sorted carefully.' },
    { icon: Flame, title: 'Drying / Smoking', desc: 'Traditional and modern preservation methods.' },
    { icon: Package, title: 'Packaging', desc: 'Sealed and quality-checked.' },
    { icon: Send, title: 'Delivery', desc: 'Shipped to homes, restaurants, and distributors.' },
  ];

  const whyChoose = [
    { icon: Fish, title: 'Quality Assurance', desc: 'Every batch is inspected before it leaves our facility.' },
    { icon: Zap, title: 'Fresh Processing', desc: 'Same-day processing keeps flavor and nutrition intact.' },
    { icon: Factory, title: 'Large Scale Capacity', desc: 'Inventory built for bulk orders without compromise.' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Reliable nationwide dispatch in 24–72 hours.' },
    { icon: Wallet, title: 'Affordable Bulk Pricing', desc: 'Tiered pricing that scales with your volume.' },
    { icon: Handshake, title: 'Trusted by Businesses', desc: 'Restaurants, hotels, and distributors reorder weekly.' },
  ];

  const deliveryTimelines = [
    { region: 'Lagos', time: '24 – 48 hrs' },
    { region: 'South East', time: '24 hrs' },
    { region: 'Abuja', time: '2 – 3 days' },
    { region: 'Port Harcourt', time: '48 hrs' },
    { region: 'North West', time: '3 – 4 days' },
    { region: 'Nationwide', time: '2 – 5 days' },
  ];

  return (
    <main className="pt-0">
      {/* 1. HERO */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?q=80&w=2000&auto=format&fit=crop"
            alt="Fendol Fish Premium Supply"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 smoke-overlay opacity-30"></div>
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full pt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-3xl md:text-5xl text-white mb-6 leading-tight font-display font-extrabold uppercase">From Pond to Processing <br/>to Your Doorstep.</h1>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-white/80 text-sm font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> Same-day processing</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> Nationwide delivery</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> Bulk & retail</li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/market" className="bg-secondary text-on-secondary px-10 py-4 font-sans text-sm items-center justify-center flex tracking-tight hover:bg-primary hover:text-on-primary transition-colors uppercase font-bold rounded-sm shadow-xl">
                Shop Fish
              </Link>
              <Link to="/distributors" className="border border-white/40 text-white px-10 py-4 font-sans text-sm items-center justify-center flex tracking-tight hover:bg-white/10 transition-colors uppercase font-bold rounded-sm">
                Become a Distributor
              </Link>
            </div>

          </motion.div>

          {/* Right visual block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" alt="Smoked fish closeup" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop" alt="Processing" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop" alt="Packaged fish" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK TRUST BAR */}
      <section className="bg-surface-container border-y border-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-6 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            'Hygienically Processed',
            'Nationwide Delivery',
            'Bulk Orders Available',
            'Fresh Daily Supply',
            'Secure Payments',
          ].map((t) => (
            <div key={t} className="flex items-center gap-2 text-on-surface-variant">
              <CheckCircle2 size={16} className="text-secondary shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT FENDOL (SHORT) */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
              alt="The Fendol team"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-mono text-xs text-secondary mb-2 block uppercase tracking-widest font-black">ABOUT FENDOL</span>
            <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none mb-6">Built for Trust,<br/>Delivered with Care.</h2>
            <p className="text-on-surface-variant font-medium leading-relaxed mb-4">FENDOL was started to solve a simple problem: most Nigerian homes and businesses can't reliably get clean, hygienically processed fish at fair prices.</p>
            <p className="text-on-surface-variant font-medium leading-relaxed mb-8">We raise, process, and deliver fish ourselves — so quality is never a gamble. From our farm in Aba to kitchens across Nigeria, every order carries our commitment to freshness, safety, and consistency.</p>
            <Link to="/about" className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm hover:text-secondary transition-colors">
              Read Our Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto bg-surface-container/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">FEATURED PRODUCTS</span>
            <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">Bestselling Units</h2>
          </div>
          <Link to="/market" className="p-4 bg-primary text-on-primary font-sans text-xs font-black hover:bg-secondary hover:text-on-secondary transition-all uppercase tracking-widest rounded-sm shadow-lg">
            BROWSE FULL INVENTORY
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredSelection.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full bg-surface border border-primary/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
            >
              <Link to={`/product/${product.id}`} className="flex flex-col h-full">
                <div className="aspect-[4/5] bg-surface-container overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={product.image} alt={product.name} />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-xl font-black text-primary group-hover:text-secondary transition-colors leading-tight uppercase tracking-tight">{product.name}</h3>
                    <span className="text-xl font-black text-primary shrink-0">₦{product.price.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] text-secondary uppercase font-black tracking-widest mb-4 inline-block bg-secondary/10 px-2 py-1 rounded-sm w-fit">{product.tag}</span>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-8 leading-relaxed font-medium">{product.description}</p>
                  <button className="mt-auto w-full py-4 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all rounded-sm shadow-md">
                    VIEW SPECIFICATIONS
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. OUR PROCESS */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="mb-16 max-w-3xl">
          <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">HOW IT WORKS</span>
          <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none mb-4">Our Process</h2>
          <p className="text-on-surface-variant font-medium leading-relaxed">From pond to packaging, every step is designed to deliver fish you can trust.</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-primary/10"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="relative z-10 w-20 h-20 mx-auto mb-4 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg">
                  <step.icon size={28} />
                </div>
                <span className="font-mono text-[10px] text-secondary font-black tracking-widest block mb-1">STEP {String(idx + 1).padStart(2, '0')}</span>
                <h3 className="text-sm font-black text-primary uppercase tracking-tight mb-2">{step.title}</h3>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE FENDOL */}
      <section className="py-24 px-6 md:px-16 bg-surface-container/20">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">WHY CHOOSE FENDOL</span>
            <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">Six Reasons Buyers <br/>Keep Coming Back.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((w) => (
              <div key={w.title} className="p-8 bg-surface border border-primary/5 rounded-xl hover:border-secondary/40 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 text-secondary rounded-sm flex items-center justify-center mb-5">
                  <w.icon size={22} />
                </div>
                <h3 className="text-lg font-black text-primary uppercase tracking-tight mb-2">{w.title}</h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DELIVERY MODEL */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">DELIVERY MODEL</span>
            <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none mb-6">We Deliver to <br/>All of Nigeria.</h2>
            <p className="text-on-surface-variant font-medium leading-relaxed mb-8">From single retail orders to large bulk supply, we move fish where it's needed — on time, intact, and properly sealed.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {['Retail Delivery', 'Bulk Supply', 'Restaurant Supply', 'Distributor Supply', 'Interstate Delivery'].map((m) => (
                <div key={m} className="flex items-center gap-3 p-4 bg-surface-container/40 border border-primary/5 rounded-sm">
                  <Truck size={16} className="text-secondary shrink-0" />
                  <span className="text-sm font-bold text-primary">{m}</span>
                </div>
              ))}
            </div>

            <Link to="/track" className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm hover:text-secondary transition-colors">
              Track Your Order <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-primary text-on-primary p-8 md:p-10 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={24} className="text-secondary" />
              <h3 className="text-xl font-black uppercase tracking-tight">Delivery Timelines</h3>
            </div>
            <div className="space-y-3">
              {deliveryTimelines.map((d) => (
                <div key={d.region} className="flex justify-between items-center pb-3 border-b border-on-primary/10 last:border-0">
                  <span className="text-sm font-bold uppercase tracking-wider">{d.region}</span>
                  <span className="font-mono text-sm font-black text-secondary">{d.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-on-primary/10 text-xs font-mono uppercase tracking-widest text-on-primary/60">
              Times vary by location and order size. Same-day available for Lagos.
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 px-6 md:px-16 bg-surface-container/20">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">TRUSTED ACROSS NIGERIA</span>
            <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { quote: 'The stockfish is always clean, well-dried, and consistent. My ofe onugbu has never tasted better.', name: 'Ada O.', role: 'Home Customer · Enugu' },
              { quote: 'Fendol delivers on time and the catfish is always fresh-smoked. My restaurant customers can taste the difference.', name: 'Mama Kunle', role: 'Restaurant Owner · Lagos' },
              { quote: 'Reliable bulk supply at fair prices. They ship to Abuja properly sealed and on schedule. Will keep ordering.', name: 'Blessing A.', role: 'Distributor · Abuja' },
            ].map((t) => (
              <div key={t.name} className="p-8 bg-surface border border-primary/5 rounded-2xl flex flex-col">
                <p className="text-on-surface-variant font-display text-lg leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                <div className="pt-6 border-t border-primary/5">
                  <p className="font-black text-primary uppercase tracking-tight text-sm">{t.name}</p>
                  <p className="font-mono text-[10px] text-secondary uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DISTRIBUTOR CTA */}
      <section className="bg-primary text-on-primary py-24 overflow-hidden relative">
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs text-secondary mb-4 block uppercase tracking-widest font-black">PARTNERSHIP PROGRAM</span>
            <h2 className="text-5xl md:text-6xl mb-6 leading-[0.9] font-black uppercase tracking-tighter">Start Earning <br/>With FENDOL.</h2>
            <p className="text-lg text-on-primary/70 mb-8 max-w-lg leading-relaxed font-medium">
              Join our network of distributors, market agents, and resellers. Bulk buying, exclusive territories, marketing support — all backed by Nigeria's most trusted fish brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/distributors" className="inline-flex justify-center items-center bg-secondary text-on-secondary px-10 py-4 font-sans text-xs tracking-widest hover:bg-white hover:text-primary transition-all uppercase font-black shadow-2xl rounded-sm">
                Become a Distributor
              </Link>
              <Link to="/distributors#apply" className="inline-flex justify-center items-center border border-on-primary/30 text-on-primary px-10 py-4 font-sans text-xs tracking-widest hover:bg-on-primary/10 transition-all uppercase font-black rounded-sm">
                Apply Now
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Bulk Buying', desc: 'Wholesale tier pricing' },
              { label: 'Reselling', desc: 'Built-in retail margin' },
              { label: 'Distribution', desc: 'Exclusive territories' },
              { label: 'Marketing', desc: 'Branded asset kits' },
            ].map((b) => (
              <div key={b.label} className="p-6 bg-on-primary/5 border border-on-primary/10 rounded-xl">
                <h4 className="font-black uppercase tracking-tight text-secondary mb-1">{b.label}</h4>
                <p className="text-sm text-on-primary/70 font-medium">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto text-center">
        <div className="max-w-2xl mx-auto py-16">
          <span className="font-mono text-xs text-primary mb-6 block uppercase tracking-widest">THE LOGBOOK</span>
          <h2 className="text-3xl md:text-4xl text-primary mb-8 leading-tight">Recipe inspiration and the season's finest products, straight to your inbox.</h2>
          <form onSubmit={(e) => e.preventDefault()} className="flex mt-12 max-w-md mx-auto border-b border-primary pb-2">
            <input
              className="bg-transparent border-none focus:ring-0 w-full font-mono text-xs uppercase placeholder:text-on-surface-variant/50 outline-none"
              placeholder="YOUR EMAIL ADDRESS"
              type="email"
            />
            <button className="font-mono text-xs text-primary hover:text-secondary transition-colors uppercase tracking-widest font-bold">JOIN</button>
          </form>
        </div>
      </section>
    </main>
  );
}
