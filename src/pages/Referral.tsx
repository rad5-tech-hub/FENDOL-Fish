import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gift, Users, TrendingUp, Copy, Share2, ChevronRight, Star, Award, Target, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

const benefits = [
  { icon: <TrendingUp size={24} />, title: 'Earn Per Referral', desc: 'Get ₦500 for every new customer you bring to FENDOL. No cap on earnings.' },
  { icon: <Users size={24} />, title: 'Build Your Network', desc: 'Grow a team of loyal customers who buy from your personalized referral link.' },
  { icon: <Gift size={24} />, title: 'Bonus Milestones', desc: 'Unlock special bonuses at 10, 25, and 50 successful referrals.' },
  { icon: <Star size={24} />, title: 'Priority Access', desc: 'Top referrers get early access to new products, wholesale pricing, and more.' },
];

const steps = [
  { icon: <Award size={20} />, step: '01', title: 'Sign Up', desc: 'Create your free agent account in under 2 minutes.' },
  { icon: <Share2 size={20} />, step: '02', title: 'Share Your Link', desc: 'Share your unique referral link via WhatsApp, social media, or email.' },
  { icon: <Zap size={20} />, step: '03', title: 'Earn Rewards', desc: 'Earn ₦500 per referral. Track your earnings in real-time from your dashboard.' },
  { icon: <Target size={20} />, step: '04', title: 'Withdraw Anytime', desc: 'Payouts processed monthly with no minimum threshold.' },
];

const tiers = [
  { name: 'Bronze', referrals: '1–9', bonus: '₦500/ref', icon: '🥉' },
  { name: 'Silver', referrals: '10–24', bonus: '₦700/ref + ₦2,000', icon: '🥈' },
  { name: 'Gold', referrals: '25+', bonus: '₦1,000/ref + ₦5,000', icon: '🥇' },
];

export default function Referral() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="pt-0 transition-colors">
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-container-low border-b border-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary font-black">
                FENDOL Agent Program
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight mt-6 mb-6">
                Refer &<br />
                <span className="text-secondary">Earn</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
                Turn your love for FENDOL fish into real income. Share with friends, family, and food lovers — earn ₦500 for every successful referral.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-on-secondary text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Start Earning'} <ChevronRight size={16} />
                </button>
                <Link
                  to="/market"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-primary/20 text-xs font-black uppercase tracking-widest hover:bg-surface-container transition-all"
                >
                  Explore Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-secondary via-secondary to-transparent" />
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">
            Why Join the <span className="text-secondary">Program</span>
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            More than just discounts — become a FENDOL partner and earn from every customer you bring in.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-primary/5 p-8 hover:border-secondary/30 transition-all group"
            >
              <div className="text-secondary mb-6 group-hover:scale-110 transition-transform">{b.icon}</div>
              <h3 className="text-lg font-display font-bold uppercase mb-3">{b.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface-container-low border-y border-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">
              How It <span className="text-secondary">Works</span>
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Four simple steps to start earning with FENDOL.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                  {s.icon}
                </div>
                <span className="font-mono text-[10px] tracking-widest text-secondary font-black">{s.step}</span>
                <h3 className="text-lg font-display font-bold uppercase mt-2 mb-3">{s.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[calc(80%)] h-px border-t border-dashed border-secondary/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Tiers */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">
            Earnings <span className="text-secondary">Tiers</span>
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            The more you refer, the more you earn. Climb the tiers and unlock bigger bonuses.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-surface border p-8 text-center transition-all ${i === 2 ? 'border-secondary ring-1 ring-secondary/20' : 'border-primary/5'}`}
            >
              <span className="text-4xl block mb-4">{t.icon}</span>
              <h3 className="text-xl font-display font-bold uppercase mb-2">{t.name}</h3>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">{t.referrals} referrals</p>
              <p className="text-2xl font-display font-black text-secondary">{t.bonus}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-on-primary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-6">
              Ready to Start <span className="text-secondary">Earning</span>?
            </h2>
            <p className="text-on-primary/70 max-w-xl mx-auto mb-10">
              Join hundreds of FENDOL agents already earning from their network. Sign up free — no startup costs, no inventory.
            </p>
            <button
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
              className="inline-flex items-center gap-2 px-10 py-5 bg-secondary text-on-secondary text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Start Earning'} <ChevronRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
