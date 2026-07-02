"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Landmark, ArrowLeft, Info, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/contexts/CartContext';
import { useToast } from '@/src/contexts/ToastContext';
import { useAuth } from '@/src/contexts/AuthContext';

import { initializePayment } from '@/src/api/payment';

export default function Checkout() {
  const { isAuthenticated } = useAuth();
  const { items: cartItems, updateQuantity, removeFromCart, itemCount, clearCart } = useCart();
  const { notify } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    area: 'ABA',
    phone: '',
    email: ''
  });

  if (!isAuthenticated) {
    return (
      <main className="pt-28 bg-surface-container/50 min-h-screen transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 text-center">
          <ShieldCheck size={48} className="mx-auto text-on-surface-variant/30 mb-6" />
          <h1 className="text-2xl font-black text-primary uppercase mb-4">Authentication Required</h1>
          <p className="text-on-surface-variant mb-8">Please log in or create an account to proceed to checkout.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/login?redirect=/checkout" className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-4 text-xs font-black uppercase tracking-widest rounded-sm shadow-md hover:opacity-90">
              Sign In
            </Link>
            <Link href="/signup?redirect=/checkout" className="inline-flex items-center gap-2 bg-surface border-2 border-secondary text-secondary px-8 py-4 text-xs font-black uppercase tracking-widest rounded-sm shadow-md hover:bg-secondary/5">
              Create Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const [showPaystack, setShowPaystack] = useState(false);
  const [payState, setPayState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [processingText, setProcessingText] = useState('Verifying Card Details...');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaystack(true);
    setPayState('processing');
    setProcessingText('Initializing Secure Checkout...');

    try {
      const payload = {
        customerEmail: formData.email,
        customerPhone: formData.phone,
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          variant: item.selectedWeight || 'STANDARD'
        })),
        pricing: {
          subtotal,
          processingFee: 0,
          totalAmount: total
        }
      };

      const response = await initializePayment(payload);
      
      const accessCode = response?.data?.accessCode || response?.accessCode;
      const authUrl = response?.data?.authorization_url || response?.data?.authorizationUrl || response?.authorization_url;
      
      if (accessCode) {
        setProcessingText('Awaiting Payment...');
        // Dynamically import Paystack to avoid SSR window is not defined errors
        const PaystackPop = (await import('@paystack/inline-js')).default;
        const paystack = new PaystackPop();
        paystack.resumeTransaction(accessCode, {
          onSuccess: (transaction: any) => {
            setPayState('success');
            setTimeout(() => {
              setShowPaystack(false);
              clearCart();
              notify('Order placed and paid successfully via Paystack!', 'success');
              router.push('/market');
            }, 1500);
          },
          onCancel: () => {
            notify('Payment was cancelled', 'info');
            setShowPaystack(false);
            setPayState('idle');
          }
        });
      } else if (authUrl) {
        setProcessingText('Redirecting to Paystack...');
        window.location.href = authUrl;
      } else {
        notify('Payment initialization failed: No access code or redirect URL', 'error');
        setShowPaystack(false);
      }
    } catch (error: any) {
      notify(error.message || 'Payment initialization failed', 'error');
      setShowPaystack(false);
      setPayState('idle');
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="pt-28 bg-surface-container/50 min-h-screen transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 text-center">
          <ShoppingBag size={48} className="mx-auto text-on-surface-variant/30 mb-6" />
          <h1 className="text-2xl font-black text-primary uppercase mb-4">Your Cart is Empty</h1>
          <p className="text-on-surface-variant mb-8">Add some products to get started.</p>
          <Link href="/market" className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-4 text-xs font-black uppercase tracking-widest rounded-sm shadow-md hover:opacity-90">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 bg-surface-container/50 min-h-screen transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <Link href="/market" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-tight">Return to Market</span>
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
            <div className="bg-surface p-8 md:p-10 border-2 border-primary/5 rounded-sm">
              <h1 className="text-4xl font-extrabold mb-10 text-primary tracking-tighter uppercase">Customer Details</h1>
              
              <form className="space-y-10" onSubmit={handleConfirmOrder}>
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-8 h-8 font-black bg-secondary text-on-secondary text-sm flex items-center justify-center rounded-sm">01</span>
                    <h2 className="text-xl font-extrabold uppercase tracking-tight">Contact Information</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email"
                        className="bg-surface-container/50 border-2 border-outline/10 p-4 font-sans text-sm focus:border-secondary outline-none transition-all rounded-sm font-semibold" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-widest">Phone Number (WhatsApp Preferred)</label>
                      <input 
                        type="tel"
                        className="bg-surface-container/50 border-2 border-outline/10 p-4 font-sans text-sm focus:border-secondary outline-none transition-all rounded-sm font-semibold" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+234 ..."
                      />
                    </div>
                  </div>
                </section>

                <hr className="border-primary/10" />

                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-8 h-8 font-black bg-secondary text-on-secondary text-sm flex items-center justify-center rounded-sm">02</span>
                    <h2 className="text-xl font-extrabold uppercase tracking-tight">Delivery Logistics</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-widest">Recipient First Name</label>
                      <input 
                        className="bg-surface-container/50 border-2 border-outline/10 p-4 font-sans text-sm focus:border-secondary outline-none transition-all rounded-sm font-semibold" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-widest">Recipient Last Name</label>
                      <input 
                        className="bg-surface-container/50 border-2 border-outline/10 p-4 font-sans text-sm focus:border-secondary outline-none transition-all rounded-sm font-semibold" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                    <div className="sm:col-span-2 flex flex-col gap-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-widest">Full Delivery Address</label>
                      <input 
                        className="bg-surface-container/50 border-2 border-outline/10 p-4 font-sans text-sm focus:border-secondary outline-none transition-all rounded-sm font-semibold" 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Street, House Number, Landmark"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-widest">Area / LGA (Abia State)</label>
                      <div className="relative">
                        <select 
                          className="w-full bg-surface-container/50 border-2 border-outline/10 p-4 font-sans text-sm focus:border-secondary outline-none transition-all appearance-none cursor-pointer rounded-sm font-semibold"
                          value={formData.area}
                          onChange={(e) => setFormData({...formData, area: e.target.value})}
                        >
                          <option value="ABA">ABA</option>
                          <option value="UMUAHIA">UMUAHIA</option>
                          <option value="OSISIOMA">OSISIOMA</option>
                          <option value="OBINGWA">OBINGWA</option>
                          <option value="AROCHUKWU">AROCHUKWU</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <Info size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>



                <button type="submit" className="w-full bg-primary text-on-primary py-6 rounded-sm font-black text-lg shadow-xl shadow-primary/10 hover:bg-secondary hover:text-on-secondary transition-all flex items-center justify-center gap-3 uppercase tracking-widest active:scale-[0.98]">
                  Confirm Order • ₦{total.toLocaleString()}
                </button>
                
                <div className="flex items-center justify-center gap-3 p-4 bg-surface-container/30 rounded-sm border border-primary/5">
                  <ShieldCheck size={16} className="text-green-600" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Encrypted secure transaction protocol
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="bg-primary text-on-primary p-8 md:p-10 rounded-sm sticky top-28 shadow-2xl">
              <h2 className="text-2xl font-black mb-8 border-b border-on-primary/10 pb-6 uppercase tracking-tighter">Inventory Summary</h2>
              
              <div className="space-y-8 mb-10">
                {cartItems.map((item) => (
                  <div key={item.id + (item.selectedWeight || '')} className="flex gap-6 items-start">
                    <div className="w-20 h-20 bg-white/10 rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-black uppercase tracking-tight leading-tight mb-1">{item.name}</h3>
                      {item.selectedWeight && <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{item.selectedWeight}</p>}
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{item.category}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-sm hover:bg-white/20 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-black px-2">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-sm hover:bg-white/20 transition-colors">
                            <Plus size={12} />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-sm hover:bg-red-500/30 transition-colors ml-2">
                            <Trash2 size={12} className="text-red-300" />
                          </button>
                        </div>
                        <span className="text-lg font-black">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-on-primary/20">
                <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase tracking-tight opacity-60">Subtotal</span>
                  <span className="font-black">₦{subtotal.toLocaleString()}</span>
                </div>

                
                <div className="flex justify-between pt-8 mt-6 border-t-2 border-on-primary">
                  <span className="text-xl font-black uppercase tracking-tighter">Total Payable</span>
                  <span className="text-3xl font-black">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-10 p-5 bg-white/5 rounded-sm border border-white/10">
                <div className="flex gap-3">
                  <Info size={20} className="text-secondary flex-shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Logistics Note</h4>
                    <p className="text-[11px] font-semibold leading-relaxed opacity-80">
                      Your order will be vacuum sealed and dispatched fresh. Estimated arrival: <span className="text-secondary font-black">4-6 hours</span> for Aba & Environs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPaystack && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-slate-800 w-full max-w-md rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans"
            >
              <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#3bb75e] flex items-center justify-center text-white font-black text-xs">P</div>
                  <span className="font-extrabold text-sm tracking-tight text-slate-900">paystack</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowPaystack(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
                  disabled={payState === 'processing' || payState === 'success'}
                >
                  ✕
                </button>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-center">
                {payState === 'idle' && (
                  <div className="text-center py-10 flex flex-col items-center justify-center">
                    <p className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Starting Payment...</p>
                  </div>
                )}

                {payState === 'processing' && (
                  <div className="text-center py-10 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-[#3bb75e] rounded-full animate-spin mb-6"></div>
                    <p className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">{processingText}</p>
                    <p className="text-xs text-slate-500 mt-2">Please do not close this window or reload the page.</p>
                  </div>
                )}

                {payState === 'success' && (
                  <div className="text-center py-10 flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-16 h-16 bg-[#3bb75e]/10 text-[#3bb75e] rounded-full flex items-center justify-center mb-6"
                    >
                      <ShieldCheck size={36} />
                    </motion.div>
                    <p className="text-xl font-black text-slate-900 uppercase tracking-tight">Payment Successful!</p>
                    <p className="text-xs text-slate-500 mt-2">Your transaction has been authorized.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
