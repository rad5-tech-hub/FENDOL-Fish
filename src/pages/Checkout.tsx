import React, { useState } from 'react';
import { ShieldCheck, Landmark, ArrowLeft, Info } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: 'CHUKWUDI',
    lastName: 'OKAFOR',
    address: '12A ADMIRALTY WAY, LEKKI PHASE 1',
    area: 'ETI-OSA',
    phone: '+234 800 000 0000',
    email: 'amaechinaikechukwu6@gmail.com'
  });

  const cartItems = [
    { ...PRODUCTS.find(p => p.id === '7'), qty: 2 },
    { ...PRODUCTS.find(p => p.id === '8'), qty: 1 }
  ];

  const subtotal = 42700;
  const delivery = 3500;
  const fee = 850;
  const total = subtotal + delivery + fee;

  return (
    <main className="pt-28 bg-surface-container/50 min-h-screen transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <Link to="/market" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-tight">Return to Market</span>
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          {/* Main Checkout Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface p-8 md:p-10 border-2 border-primary/5 rounded-sm">
              <h1 className="text-4xl font-extrabold mb-10 text-primary tracking-tighter uppercase">Customer Details</h1>
              
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                {/* Contact Information */}
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

                {/* Shipping Section */}
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
                      <label className="text-[10px] font-black text-primary uppercase tracking-widest">Area / LGA (Lagos Region)</label>
                      <div className="relative">
                        <select className="w-full bg-surface-container/50 border-2 border-outline/10 p-4 font-sans text-sm focus:border-secondary outline-none transition-all appearance-none cursor-pointer rounded-sm font-semibold">
                          <option>ETI-OSA</option>
                          <option>VICTORIA ISLAND</option>
                          <option>IKEJA</option>
                          <option>LAGOS ISLAND</option>
                          <option>SURULERE</option>
                          <option>LEKKI</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <Info size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <hr className="border-primary/10" />

                {/* Payment Section */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-8 h-8 font-black bg-secondary text-on-secondary text-sm flex items-center justify-center rounded-sm">03</span>
                    <h2 className="text-xl font-extrabold uppercase tracking-tight">Payment Selection</h2>
                  </div>
                  <div className="grid gap-4">
                    <label className="flex items-center justify-between p-6 border-2 border-secondary bg-secondary/5 rounded-sm cursor-pointer group transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-2 border-secondary flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                        </div>
                        <span className="text-sm font-black uppercase tracking-tight">Secure Online Checkout (Paystack)</span>
                      </div>
                      <ShieldCheck className="text-secondary" />
                    </label>
                    <label className="flex items-center justify-between p-6 border-2 border-outline/10 bg-surface-container/30 rounded-sm opacity-50 cursor-not-allowed">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-2 border-outline/20"></div>
                        <span className="text-sm font-bold uppercase tracking-tight opacity-40">Direct Bank Transfer (Manual)</span>
                      </div>
                      <Landmark size={20} className="opacity-20" />
                    </label>
                  </div>
                </section>

                <button className="w-full bg-primary text-on-primary py-6 rounded-sm font-black text-lg shadow-xl shadow-primary/10 hover:bg-secondary hover:text-on-secondary transition-all flex items-center justify-center gap-3 uppercase tracking-widest active:scale-[0.98]">
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

          {/* Order Summary Section */}
          <div className="lg:col-span-5">
            <div className="bg-primary text-on-primary p-8 md:p-10 rounded-sm sticky top-28 shadow-2xl">
              <h2 className="text-2xl font-black mb-8 border-b border-on-primary/10 pb-6 uppercase tracking-tighter">Inventory Summary</h2>
              
              <div className="space-y-8 mb-10">
                {cartItems.map((item, idx) => (
                  <div key={item?.id || idx} className="flex gap-6 items-start">
                    <div className="w-20 h-20 bg-white/10 rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-black uppercase tracking-tight leading-tight mb-1">{item?.name}</h3>
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{item?.category}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/10 rounded-sm">Qty: {item?.qty}</span>
                        <span className="text-lg font-black">₦{((item?.price || 0) * (item?.qty || 1)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-4 pt-8 border-t border-on-primary/20">
                <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase tracking-tight opacity-60">Subtotal</span>
                  <span className="font-black">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase tracking-tight opacity-60">Logistics/Delivery</span>
                  <span className="font-black">₦{delivery.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase tracking-tight opacity-60">Processing Fee</span>
                  <span className="font-black">₦{fee.toLocaleString()}</span>
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
                      Your order will be vacuum sealed and dispatched fresh. Estimated arrival: <span className="text-secondary font-black">4-6 hours</span> for Central Lagos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
