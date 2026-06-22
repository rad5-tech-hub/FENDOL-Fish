"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Megaphone, Truck, Check } from 'lucide-react';

export default function Distributors() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    businessType: 'Bulk Reseller',
    capacity: '',
    region: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reasons = [
    { icon: TrendingUp, title: 'High Demand', desc: 'Fish is a daily-consumption staple. Reliable, recurring sales cycle.' },
    { icon: ShieldCheck, title: 'Trusted Brand', desc: 'Hygienically processed, consistent quality customers return for.' },
    { icon: Megaphone, title: 'Marketing Support', desc: 'Branded materials, social assets, and lead support for active distributors.' },
    { icon: Truck, title: 'Consistent Supply', desc: 'Year-round inventory from our farm and processing facility.' },
  ];

  const models = [
    { name: 'Bulk Reseller', desc: 'Buy in bulk quantities, resell at retail margin in your local market.' },
    { name: 'State Distributor', desc: 'Exclusive territory rights. Manage downstream resellers within your state.' },
    { name: 'Market Agent', desc: 'Operate from a market stall. Daily supply, weekly settlements.' },
    { name: 'Restaurant Supplier', desc: 'Specialize in supplying restaurants, hotels, and catering services.' },
  ];

  const steps = [
    { n: '01', title: 'Apply', desc: 'Submit the application form below with your details and capacity.' },
    { n: '02', title: 'Review', desc: 'Our team reviews and contacts you within 48 hours.' },
    { n: '03', title: 'Onboarding', desc: 'Sign agreement, receive training and marketing kit.' },
    { n: '04', title: 'Start Selling', desc: 'Place your first order and begin earning.' },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/process/Parcel%20handoff%20with%20Fendol%20Fish%20box%203.png"
            alt="Partner with Fendol"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="font-mono text-xs text-secondary mb-4 block uppercase tracking-widest font-bold">DISTRIBUTOR PROGRAM</span>
            <h1 className="text-4xl md:text-6xl text-white font-display font-black uppercase tracking-tighter leading-[0.9] mb-6">Partner With <br/>FENDOL.</h1>
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-xl">Start earning with Nigeria's trusted fish processing brand. Bulk buying, reselling, and full distribution partnerships.</p>
          </motion.div>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">THE OPPORTUNITY</span>
          <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">Why Become a Distributor</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="p-8 bg-surface-container/30 border border-primary/5 rounded-xl hover:border-secondary/40 transition-all">
              <r.icon size={28} className="text-secondary mb-6" />
              <h3 className="text-lg font-black text-primary uppercase tracking-tight mb-3">{r.title}</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Models */}
      <section className="py-24 px-6 md:px-16 bg-surface-container/20">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">CHOOSE YOUR PATH</span>
            <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">Distributor Models</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((m, idx) => (
              <div key={m.name} className="p-10 bg-surface border border-primary/5 rounded-2xl flex gap-6 hover:shadow-xl transition-all">
                <div className="shrink-0 w-12 h-12 bg-primary text-on-primary flex items-center justify-center rounded-sm font-black text-lg">{String(idx + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">{m.name}</h3>
                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">SIMPLE ONBOARDING</span>
          <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="p-8 border-l-4 border-secondary bg-surface-container/30 rounded-r-xl">
              <span className="font-mono text-xs text-secondary font-black tracking-widest">STEP {s.n}</span>
              <h3 className="text-2xl font-black text-primary uppercase tracking-tight mt-2 mb-3">{s.title}</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Earnings */}
      <section className="py-24 px-6 md:px-16 bg-primary text-on-primary">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">EARNINGS POTENTIAL</span>
            <h2 className="text-4xl md:text-5xl uppercase font-black tracking-tighter leading-none mb-6">Real Numbers,<br/>Real Margins.</h2>
            <p className="text-on-primary/70 font-medium leading-relaxed mb-8">Sample monthly projections based on active distributors in similar territories.</p>
          </div>
          <div className="space-y-4">
            {[
              { tier: 'Market Agent', volume: '50 cartons/mo', earnings: '₦150,000 – ₦250,000' },
              { tier: 'Bulk Reseller', volume: '200 cartons/mo', earnings: '₦600,000 – ₦900,000' },
              { tier: 'State Distributor', volume: '1,000+ cartons/mo', earnings: '₦2.5M – ₦4M+' },
            ].map((t) => (
              <div key={t.tier} className="flex justify-between items-center p-6 bg-on-primary/5 border border-on-primary/10 rounded-xl">
                <div>
                  <h4 className="font-black uppercase tracking-tight">{t.tier}</h4>
                  <p className="text-sm text-on-primary/60 font-medium">{t.volume}</p>
                </div>
                <span className="text-lg font-black text-secondary">{t.earnings}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">APPLICATION FORM</span>
          <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">Apply Now</h2>
        </div>

        {submitted ? (
          <div className="p-12 bg-secondary/10 border-2 border-secondary rounded-2xl text-center">
            <Check size={48} className="text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-black text-primary uppercase tracking-tight mb-3">Application Received</h3>
            <p className="text-on-surface-variant font-medium">Our partnerships team will reach you within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-10 bg-surface-container/30 border border-primary/5 rounded-2xl">
            <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Field label="Location (City, State)" name="location" value={form.location} onChange={handleChange} required />
            <div className="md:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Business Type</label>
              <select name="businessType" value={form.businessType} onChange={handleChange} className="w-full p-4 bg-surface border border-primary/10 rounded-sm text-sm font-medium focus:border-secondary outline-none">
                {models.map((m) => <option key={m.name}>{m.name}</option>)}
              </select>
            </div>
            <Field label="Monthly Capacity (cartons)" name="capacity" value={form.capacity} onChange={handleChange} />
            <div className="md:col-span-2">
              <Field label="Preferred Region" name="region" value={form.region} onChange={handleChange} />
            </div>
            <button type="submit" className="md:col-span-2 mt-4 w-full py-5 bg-primary text-on-primary text-xs font-black uppercase tracking-widest hover:bg-secondary transition-all rounded-sm shadow-lg">
              Submit Application
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

function Field({ label, name, value, onChange, type = 'text', required = false }: any) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">{label}{required && <span className="text-secondary"> *</span>}</label>
      <input type={type} name={name} value={value} onChange={onChange} required={required} className="w-full p-4 bg-surface border border-primary/10 rounded-sm text-sm font-medium focus:border-secondary outline-none transition-colors" />
    </div>
  );
}
