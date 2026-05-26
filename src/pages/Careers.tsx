import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Users, Heart, Zap, MapPin, Clock, Upload, Check } from 'lucide-react';

const POSITIONS = [
  { title: 'Production Supervisor', location: 'Aba, Abia', type: 'Full-time', dept: 'Operations' },
  { title: 'Logistics Coordinator', location: 'Lagos', type: 'Full-time', dept: 'Distribution' },
  { title: 'Sales & Distributor Manager', location: 'Remote / Nigeria', type: 'Full-time', dept: 'Commercial' },
  { title: 'Quality Control Officer', location: 'Aba, Abia', type: 'Full-time', dept: 'Operations' },
  { title: 'Digital Marketing Associate', location: 'Lagos', type: 'Full-time', dept: 'Marketing' },
  { title: 'Operations Intern', location: 'Aba, Abia', type: 'Internship', dept: 'Operations' },
];

const VALUES = [
  { icon: Heart, title: 'People First', desc: 'We invest in our team. Real training, fair pay, and room to grow.' },
  { icon: Zap, title: 'Bias for Action', desc: 'We move fast. Less talk, more shipping.' },
  { icon: Users, title: 'One Team', desc: 'From the farm to the dispatch desk — everybody owns the outcome.' },
];

export default function Careers() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
            alt="Join Fendol"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="font-mono text-xs text-secondary mb-4 block uppercase tracking-widest font-bold">CAREERS AT FENDOL</span>
            <h1 className="text-4xl md:text-6xl text-white font-display font-black uppercase tracking-tighter leading-[0.9] mb-6">Build the Future <br/>of Nigerian Fish.</h1>
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-xl">We're hiring builders, operators, and creatives who want to change how Africa eats.</p>
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="mb-16 max-w-3xl">
          <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">OUR CULTURE</span>
          <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none mb-6">Why Work With Us</h2>
          <p className="text-lg text-on-surface-variant font-medium leading-relaxed">FENDOL is a fast-growing fish processing and distribution company on a mission to feed Africa with quality, hygienically processed fish. We believe great teams build great companies.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="p-10 bg-surface-container/30 border border-primary/5 rounded-2xl">
              <v.icon size={28} className="text-secondary mb-6" />
              <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">{v.title}</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 px-6 md:px-16 bg-surface-container/20">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">WE'RE HIRING</span>
            <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">Open Positions</h2>
          </div>
          <div className="space-y-3">
            {POSITIONS.map((p) => (
              <div key={p.title} className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 bg-surface border border-primary/5 rounded-xl hover:border-secondary/40 hover:shadow-lg transition-all">
                <div className="flex-1">
                  <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-black">{p.dept}</span>
                  <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-1">{p.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><MapPin size={12} /> {p.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {p.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedRole(p.title);
                    document.getElementById('apply-cv')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-primary text-on-primary text-xs font-black uppercase tracking-widest hover:bg-secondary transition-all rounded-sm whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">EARLY CAREERS</span>
            <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none mb-6">Internships</h2>
            <p className="text-lg text-on-surface-variant font-medium leading-relaxed mb-6">Just finished NYSC or still in school? Our internship program rotates you through operations, logistics, and commercial — with a real mentor and a real paycheck.</p>
            <ul className="space-y-3">
              {['3-6 month rotations', 'Hands-on mentorship', 'Stipend + transport', 'Full-time conversion track'].map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
                  <Check size={16} className="text-secondary shrink-0" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" alt="Team at work" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Upload CV */}
      <section id="apply-cv" className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <Briefcase size={32} className="text-secondary mx-auto mb-4" />
          <span className="font-mono text-xs text-secondary block mb-2 uppercase tracking-widest font-black">APPLY</span>
          <h2 className="text-4xl md:text-5xl text-primary uppercase font-black tracking-tighter leading-none">Upload Your CV</h2>
          <p className="text-on-surface-variant font-medium mt-4">Don't see a role that fits? Send us your CV anyway — we keep a talent pool.</p>
        </div>

        {submitted ? (
          <div className="p-12 bg-secondary/10 border-2 border-secondary rounded-2xl text-center">
            <Check size={48} className="text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-black text-primary uppercase tracking-tight mb-3">Application Received</h3>
            <p className="text-on-surface-variant font-medium">Our talent team will be in touch if there's a fit.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-10 bg-surface-container/30 border border-primary/5 rounded-2xl">
            <CField label="Full Name" name="name" required />
            <CField label="Email" name="email" type="email" required />
            <CField label="Phone" name="phone" required />
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Role of Interest</label>
              <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full p-4 bg-surface border border-primary/10 rounded-sm text-sm font-medium focus:border-secondary outline-none">
                <option value="">General Application</option>
                {POSITIONS.map((p) => <option key={p.title}>{p.title}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Cover Note</label>
              <textarea rows={4} className="w-full p-4 bg-surface border border-primary/10 rounded-sm text-sm font-medium focus:border-secondary outline-none transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">CV / Resume</label>
              <label className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-primary/20 rounded-sm hover:border-secondary transition-colors cursor-pointer bg-surface">
                <Upload size={20} className="text-secondary" />
                <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Upload PDF or DOCX</span>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
              </label>
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

function CField({ label, name, type = 'text', required = false }: any) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">{label}{required && <span className="text-secondary"> *</span>}</label>
      <input type={type} name={name} required={required} className="w-full p-4 bg-surface border border-primary/10 rounded-sm text-sm font-medium focus:border-secondary outline-none transition-colors" />
    </div>
  );
}
