import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Share2, LogOut, Gift, Users, TrendingUp, CheckCircle, ExternalLink, User, Calendar, BarChart3, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import AccountCard from '../components/AccountCard';

export default function Dashboard() {
  const { customer, user, isAuthenticated, logout, getReferralLink } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { replace: true });
  }, [isAuthenticated, navigate]);

  const profile = customer || user;

  if (!profile) return null;

  const displayName = customer?.fullName || user?.name || '';
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const referralLink = getReferralLink();
  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Hey! 🐟 Join me and earn rewards with FENDOL Fish — Nigeria's premium fish brand. Sign up using my referral link: ${referralLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.getElementById('referral-link-input') as HTMLInputElement;
      if (input) { input.select(); document.execCommand('copy'); }
    }
  };

  const stats = customer
    ? [
        { icon: <ShoppingBag size={20} />, label: 'Account', value: 'Verified' },
        { icon: <User size={20} />, label: 'Email', value: customer.email },
      ]
    : [
        { icon: <Users size={20} />, label: 'Total Referrals', value: user!.totalReferrals },
        { icon: <TrendingUp size={20} />, label: 'Total Earnings', value: `₦${(user!.earnings || 0).toLocaleString()}` },
      ];

  return (
    <main className="pt-24 min-h-screen bg-surface-container-low transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary font-black">
                  {customer ? 'My Account' : 'Agent Dashboard'}
                </span>
                <h1 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight mt-2">
                  Welcome, {displayName.split(' ')[0]}
                </h1>
                <p className="text-on-surface-variant text-sm mt-1">
                  {customer ? customer.email : `Member since ${memberSince}`}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 border border-primary/10 text-xs font-black uppercase tracking-widest hover:bg-surface-container transition-all self-start"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <AccountCard title={customer ? 'Account Details' : 'Your Agent Profile'} className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Full Name</p>
                    <p className="font-bold text-sm">{displayName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Email</p>
                    <p className="font-bold text-sm">{profile.email}</p>
                  </div>
                </div>
                {user && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                      <Gift size={20} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Referral Code</p>
                      <p className="font-bold text-sm font-mono text-secondary">{user.referralCode}</p>
                    </div>
                  </div>
                )}
                {user && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Member Since</p>
                      <p className="font-bold text-sm">{memberSince}</p>
                    </div>
                  </div>
                )}
              </div>
            </AccountCard>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                <AccountCard title={s.label} icon={s.icon}>
                  <p className="text-3xl font-display font-black">{s.value}</p>
                </AccountCard>
              </motion.div>
            ))}
          </div>

          {/* Referral Link Card — only for agents */}
          {user && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <AccountCard title="Your Referral Link">
                <p className="text-sm text-on-surface-variant mb-6">Share this link with your network. You earn ₦500 for every person who signs up and makes their first purchase.</p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="flex-1 relative">
                    <input
                      id="referral-link-input"
                      type="text"
                      readOnly
                      value={referralLink}
                      className="w-full bg-surface-container-low border border-primary/10 py-3.5 px-4 text-sm font-mono text-on-surface-variant outline-none pr-10"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-secondary transition-colors"
                      title="Copy link"
                    >
                      {copied ? <CheckCircle size={18} className="text-secondary" /> : <Copy size={18} />}
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={shareViaWhatsApp}
                      className="px-6 py-3.5 bg-[#25D366] text-white text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 shadow-md"
                    >
                      <Share2 size={14} /> Share
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="px-6 py-3.5 bg-secondary text-on-secondary text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 shadow-md"
                    >
                      {copied ? <CheckCircle size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {copied && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-secondary font-medium">
                    ✓ Referral link copied to clipboard!
                  </motion.p>
                )}

                <div className="mt-8 pt-6 border-t border-primary/5">
                  <button
                    onClick={() => navigate('/referral')}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary hover:opacity-80 transition-opacity"
                  >
                    Learn more about the program <ChevronRight size={14} />
                  </button>
                </div>
              </AccountCard>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
