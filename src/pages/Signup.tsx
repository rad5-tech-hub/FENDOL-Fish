import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, Gift, ChevronRight, CheckCircle, AlertCircle, MapPin, ArrowLeft, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function Signup() {
  const { signup, verifyOtp, isAuthenticated, isLoading, isOtpSent, otpEmail, resetOtpState } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', address: '' });
  const [referralCode, setReferralCode] = useState(searchParams.get('ref') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(t => t - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{7,15}$/.test(form.phone)) errs.phone = 'Invalid phone number';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    const result = await signup({
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
      address: form.address.trim(),
    });

    if (!result.success) {
      const msg = result.error || 'Signup failed. Please try again.';
      setServerError(msg);
      notify(msg, 'error');
    } else {
      notify('Verification code sent to your email', 'success');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError('');

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const digits = pastedText.replace(/\D/g, '').slice(0, 6);
    if (digits.length === 0) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = digits[i] || '';
    }
    setOtp(newOtp);
    setOtpError('');

    const nextIndex = Math.min(digits.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    const code = otp.join('');
    if (code.length !== 6) {
      setOtpError('Please enter the complete 6-digit code.');
      return;
    }

    const result = await verifyOtp(otpEmail!, code);
    if (result.success) {
      notify('Account verified successfully', 'success');
      navigate('/dashboard', { replace: true });
    } else {
      const msg = result.error || 'Verification failed.';
      setOtpError(msg);
      notify(msg, 'error');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setServerError('');
    const result = await signup({
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
      address: form.address.trim(),
    });
    if (result.success) {
      notify('Verification code resent', 'success');
      setResendTimer(60);
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } else {
      const msg = result.error || 'Failed to resend code.';
      setServerError(msg);
      notify(msg, 'error');
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

  if (isOtpSent && otpEmail) {
    return (
      <main className="pt-24 min-h-screen bg-surface-container-low transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button
                onClick={() => { resetOtpState(); setOtp(['', '', '', '', '', '']); }}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary mb-8 transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <KeyRound size={28} className="text-secondary" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary font-black">Verify Your Email</span>
                <h1 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight mt-3 mb-3">Check Your Inbox</h1>
                <p className="text-on-surface-variant text-sm">
                  We sent a 6-digit code to <strong className="text-primary">{otpEmail}</strong>
                </p>
              </div>

              <div className="bg-surface border border-primary/5 p-8 md:p-10">
                {serverError && (
                  <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 px-4 py-3 mb-6 rounded-sm">
                    <AlertCircle size={16} className="text-red-500 shrink-0" />
                    <p className="text-xs text-red-600 dark:text-red-400">{serverError}</p>
                  </div>
                )}

                <form onSubmit={handleOtpSubmit}>
                  <div className="mb-8">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-4 block text-center">
                      Enter Verification Code
                    </label>
                    <div className="flex gap-3 justify-center">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={el => { otpRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(i, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(i, e)}
                          onPaste={i === 0 ? handleOtpPaste : undefined}
                          className={`w-12 h-14 text-center text-xl font-bold bg-surface-container-low border ${otpError ? 'border-red-400' : 'border-primary/10'} outline-none focus:border-secondary transition-colors`}
                        />
                      ))}
                    </div>
                    {otpError && <p className="text-red-500 text-xs mt-3 text-center">{otpError}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-secondary text-on-secondary py-4 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Email'} {!isLoading && <ChevronRight size={16} />}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-on-surface-variant">
                    Didn't receive the code?{' '}
                    <button
                      onClick={handleResend}
                      disabled={resendTimer > 0 || isLoading}
                      className="text-secondary font-bold hover:underline disabled:opacity-40 disabled:no-underline"
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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
              <p className="text-on-surface-variant text-sm">Join FENDOL and start shopping premium fish.</p>
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

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="on">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={e => updateField('fullName', e.target.value)}
                      placeholder="Chidera Okonkwo"
                      className={`w-full bg-surface-container-low border ${errors.fullName ? 'border-red-400' : 'border-primary/10'} py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
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
                      name="tel"
                      id="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={e => updateField('phone', e.target.value)}
                      placeholder="+234 800 000 0000"
                      className={`w-full bg-surface-container-low border ${errors.phone ? 'border-red-400' : 'border-primary/10'} py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  <p className="text-[10px] text-on-surface-variant/50 mt-1">Include country code, e.g. +2348012345678</p>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Delivery Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type="text"
                      name="street-address"
                      id="address"
                      autoComplete="street-address"
                      value={form.address}
                      onChange={e => updateField('address', e.target.value)}
                      placeholder="12 Marina, Lagos"
                      className={`w-full bg-surface-container-low border ${errors.address ? 'border-red-400' : 'border-primary/10'} py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      autoComplete="new-password"
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
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-password"
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
                  disabled={isLoading}
                  className="w-full bg-secondary text-on-secondary py-4 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'Sending Code...' : 'Create Account'} {!isLoading && <ChevronRight size={16} />}
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
