import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    const result = await login(form.email.trim().toLowerCase(), form.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <main className="pt-24 min-h-screen bg-surface-container-low transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary font-black">Welcome Back</span>
              <h1 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight mt-3 mb-3">Sign In</h1>
            </div>

            <div className="bg-surface border border-primary/5 p-8 md:p-10">
              {error && (
                <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 px-4 py-3 mb-6 rounded-sm">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="on">
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
                      onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full bg-surface-container-low border border-primary/10 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 block">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      value={form.password}
                      onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                      className="w-full bg-surface-container-low border border-primary/10 py-3.5 pl-11 pr-11 text-sm outline-none focus:border-secondary transition-colors"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface-variant">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-secondary text-on-secondary py-4 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'} {!isLoading && <ChevronRight size={16} />}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-on-surface-variant">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-secondary font-bold hover:underline">Create One</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
