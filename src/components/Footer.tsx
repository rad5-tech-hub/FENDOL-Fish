import React from 'react';
import { Mail, Instagram, Facebook } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className="w-full py-20 bg-surface-container-high border-t border-primary/5 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 w-full max-w-[1440px] mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center text-primary font-display uppercase tracking-tighter text-3xl font-black mb-4">
            FENDOL FISH
          </div>
          <p className="font-sans text-sm text-on-surface-variant mb-8 font-semibold leading-relaxed">Artisanal Nigerian Fish Supply. <br/> "The Fish That Flavours Everything."</p>
          <div className="flex gap-4">
            <div className="p-2 bg-surface rounded-full border border-primary/5 hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
              <Instagram size={18} />
            </div>
            <div className="p-2 bg-surface rounded-full border border-primary/5 hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
              <Facebook size={18} />
            </div>
            <div className="p-2 bg-surface rounded-full border border-primary/5 hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
              <Mail size={18} />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-black text-primary mb-6 uppercase tracking-widest">Navigation</h4>
          <ul className="flex flex-col gap-3">
            <li><Link className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors" to="/">Home</Link></li>
            <li><Link className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors" to="/market">Products</Link></li>
            <li><Link className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors" to="/about">Our Story</Link></li>
            <li><Link className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors" to="/recipes">Recipes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-black text-primary mb-6 uppercase tracking-widest">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            <li><Link className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors" to="/distributors">Become A Distributor</Link></li>
            <li><Link className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors" to="/careers">Careers</Link></li>
            <li><Link className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors" to="/track">Track Your Order</Link></li>
            <li><Link className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors" to="/contact">Contact Us Today</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-black text-primary mb-6 uppercase tracking-widest">Contact Us</h4>
          <p className="text-sm font-medium text-on-surface-variant leading-relaxed mb-4">
            <span className="text-[10px] font-black uppercase text-primary block mb-1">Address</span>
            Kilometer 5 Osisioma Industrial layout <br/> Aba, Abia State
          </p>
          <p className="text-sm font-medium text-on-surface-variant leading-relaxed mb-4">
            <span className="text-[10px] font-black uppercase text-primary block mb-1">Phone</span>
            08052641000, 08170002853
          </p>
          <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
            <span className="text-[10px] font-black uppercase text-primary block mb-1">Email</span>
            <span className="text-primary font-bold">admin@fendolgroup.com</span>
          </p>
        </div>
      </div>
      <div className="px-6 md:px-16 max-w-[1440px] mx-auto mt-20 pt-8 border-t border-primary/10">
        <p className="text-[10px] text-on-surface-variant font-bold text-center tracking-widest uppercase transition-colors">© 2025 FENDOL FISH. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
