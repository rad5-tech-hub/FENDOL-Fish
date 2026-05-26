import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, Gift, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [referralCode, setReferralCode] = useState(searchParams.get('ref') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{7,15}$/.test(form.phone)) errs.phone = 'Invalid phone number';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    const result = signup({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
      referralCode: referralCode.trim() || undefined,
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } else {
      setServerError(result.error || 'Signup failed. Please try again.');
    }
  };

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  if (success) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center bg-surface-container-low transition-colors">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md px-6">
          <CheckCircle size={64} className="text-secondary mx-auto mb-6" />
          <h1 className="text-3xl font-display font-black uppercase tracking-tight mb-4">Account Created!</h1>
          <p className="text-on-surface-variant mb-8">Redirecting you to your dashboard...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-24 min-h-screen bg-surface-container-low transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary font-black">Get Started</span>
              <h1 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight mt-3 mb-3">Create Account</h1>
              <p className="text-on-surface-variant text-sm">Join the FENDOL Agent Program and start earning.</p>
            </div>

            <div className="bg-surface border border-primary/5 p-8 md:p-10">
              {referralCode && (
                <div className="flex items-center gap-3 bg-secondary/5 border border-secondary/20 px-4 py-3 mb-8 rounded-sm">
                  <Gift size={16} className="text-secondary shrink-0" />
                  <p className="text-xs font-medium text-on-surface-variant">
                    Referral code <span className="font-black text-secondary">{referralCode}</span> applied
                  </p>
                </div>
              )}

              {serverError && (
                <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 px-4 py-3 mb-6 rounded-sm">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-600 dark:text-red-400">{serverError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => updateField('name', e.target.value)}
                      placeholder="Chidera Okonkwo"
                      className={`w-full bg-surface-container-low border ${errors.name ? 'border-red-400' : 'border-primary/10'} py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full bg-surface-container-low border ${errors.email ? 'border-red-400' : 'border-primary/10'} py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => updateField('phone', e.target.value)}
                      placeholder="+234 800 000 0000"
                      className={`w-full bg-surface-container-low border ${errors.phone ? 'border-red-400' : 'border-primary/10'} py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => updateField('password', e.target.value)}
                      placeholder="Min. 6 characters"
                      className={`w-full bg-surface-container-low border ${errors.password ? 'border-red-400' : 'border-primary/10'} py-3.5 pl-11 pr-11 text-sm outline-none focus:border-secondary transition-colors`}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface-variant">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={e => updateField('confirmPassword', e.target.value)}
                      placeholder="Repeat your password"
                      className={`w-full bg-surface-container-low border ${errors.confirmPassword ? 'border-red-400' : 'border-primary/10'} py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">
                    Referral Code <span className="opacity-40">(optional)</span>
                  </label>
                  <div className="relative">
                    <Gift size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type="text"
                      value={referralCode}
                      onChange={e => setReferralCode(e.target.value)}
                      placeholder="e.g. FEN-X2K9"
                      className="w-full bg-surface-container-low border border-primary/10 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary text-on-secondary py-4 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg mt-2 flex items-center justify-center gap-2"
                >
                  Create Account <ChevronRight size={16} />
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-on-surface-variant">
                  Already have an account?{' '}
                  <Link to="/login" className="text-secondary font-bold hover:underline">Sign In</Link>
                </p>
              </div>
            </div>

            <p className="text-center text-[10px] text-on-surface-variant/40 mt-6 max-w-xs mx-auto">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
