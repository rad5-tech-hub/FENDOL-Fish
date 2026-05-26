import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Search, Menu, Sun, Moon, ChevronDown, X, ArrowRight, Truck, Gift, LogOut, LayoutDashboard } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll position for stylistic changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when search or menu is open
  useEffect(() => {
    if (isSearchOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/market?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'The Market', path: '/market' },
    { name: 'About Us', path: '/about' },
    { name: 'Distributors', path: '/distributors' },
    { name: 'Careers', path: '/careers' },
    { name: 'Track Order', path: '/track' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { name: 'All Products', path: '/market' },
    { name: 'Stockfish (Okporoko)', path: '/market?search=Stockfish' },
    { name: 'Smoked Catfish', path: '/market?search=Catfish' },
    { name: 'Bonga Fish', path: '/market?search=Bonga' },
    { name: 'Crayfish & Extras', path: '/market?search=Crayfish' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-surface/95 backdrop-blur-md py-3 border-primary/10 shadow-sm' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 w-full max-w-[1440px] mx-auto">
          
          {/* Left Brand */}
          <Link to="/" className="flex items-center active:scale-95 transition-transform shrink-0">
            <div className={`flex items-center overflow-hidden h-10 md:h-12 px-2 bg-white rounded-md ${!isScrolled && location.pathname === '/' ? 'bg-white shadow-lg' : 'mix-blend-multiply dark:mix-blend-normal dark:bg-transparent'}`}>
              <img 
                src={darkMode || (!isScrolled && location.pathname === '/') ? "/assets/logo.png" : "/assets/logo.png"} 
                alt="Fendol Fish" 
                className="h-full w-auto object-contain block"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://ui-avatars.com/api/?name=FF&background=F4C430&color=000';
                }}
              />
            </div>
          </Link>

          {/* Right-aligned Navigation */}
          <nav className="hidden lg:flex gap-7 items-center ml-auto mr-6">
            {[
              {
                label: 'Shop',
                items: [
                  { name: 'The Market', path: '/market' },
                  { name: 'Recipes', path: '/recipes' },
                  { name: 'Gallery', path: '/gallery' },
                ]
              },
              {
                label: 'Company',
                items: [
                  { name: 'About Us', path: '/about' },
                  { name: 'Careers', path: '/careers' },
                ]
              },
              {
                label: 'Customer',
                items: [
                  { name: 'Track Order', path: '/track' },
                  { name: 'Distributors', path: '/distributors' },
                  { name: 'Contact', path: '/contact' },
                ]
              },
            ].map(group => (
              <div key={group.label} className="group relative py-2">
                <button className={`text-sm font-medium tracking-tight transition-colors flex items-center gap-1.5 ${
                  !isScrolled && location.pathname === '/' ? 'text-white/80 hover:text-white' : 'text-on-surface-variant hover:text-primary'
                }`}>
                  {group.label} <ChevronDown size={14} className="opacity-40 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 min-w-48 bg-surface shadow-2xl border border-primary/5 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] translate-y-2 group-hover:translate-y-0 rounded-lg">
                  {group.items.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.path} 
                      className="flex justify-between items-center px-6 py-3 text-xs font-semibold tracking-tight text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors whitespace-nowrap"
                    >
                      {item.name}
                      <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          
          {/* Right Utilities */}
          <div className="flex items-center justify-end gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button onClick={toggleSearch} className="p-2 hover:bg-surface-container rounded-full transition-colors group" aria-label="Search">
                <Search size={18} className={`transition-colors ${
                  !isScrolled && location.pathname === '/' ? 'text-white group-hover:text-primary' : 'text-on-surface-variant group-hover:text-primary'
                }`} />
              </button>
              <button onClick={toggleDarkMode} className="p-2 hover:bg-surface-container rounded-full transition-colors group" aria-label="Toggle theme">
                {darkMode 
                  ? <Sun size={18} className="text-primary" /> 
                  : <Moon size={18} className={`transition-colors ${
                      !isScrolled && location.pathname === '/' ? 'text-white group-hover:text-primary' : 'text-on-surface-variant group-hover:text-primary'
                    }`} />
                }
              </button>
            </div>
            <Link to="/market" className="hidden md:inline-flex items-center px-5 py-2.5 bg-secondary text-on-secondary text-[11px] font-black uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity shadow-md">
              Order Now
            </Link>

            <button onClick={toggleMenu} className="lg:hidden p-2 hover:bg-surface-container rounded-full transition-colors ml-1">
              {isMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className={!isScrolled && location.pathname === '/' ? 'text-white' : 'text-primary'} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-6"
              style={{ backgroundColor: 'var(--color-background)' }}
            >
              <button 
                onClick={toggleSearch}
                className="absolute top-8 right-8 p-3 hover:bg-surface-container rounded-full transition-colors"
              >
                <X size={32} className="text-primary" />
              </button>
              
              <div className="w-full max-w-3xl">
                <form onSubmit={handleSearch} className="relative mb-12">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search by fish variety, region, or cut..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b-4 border-primary/20 focus:border-secondary py-8 text-3xl md:text-6xl font-display font-black text-primary placeholder:text-primary/10 outline-none transition-all pr-20 uppercase tracking-tighter"
                  />
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-primary hover:scale-110 transition-transform">
                    <Search size={36} strokeWidth={1.5} />
                  </button>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/40 block mb-6">Popular Categories</span>
                    <div className="flex flex-col gap-4">
                      {['Artisanal Smoked', 'Sun-Dried Supply', 'Fresh Harvest'].map((cat) => (
                        <button 
                          key={cat}
                          onClick={() => {
                            navigate(`/market?search=${encodeURIComponent(cat)}`);
                            setIsSearchOpen(false);
                          }}
                          className="text-left py-2 text-xl font-display text-primary hover:text-secondary transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/40 block mb-6">Quick Filters</span>
                    <div className="flex flex-wrap gap-3">
                      {['Stockfish', 'Catfish', 'Crayfish', 'Bonga'].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            navigate(`/market?search=${encodeURIComponent(term)}`);
                            setIsSearchOpen(false);
                          }}
                          className="px-6 py-3 border border-primary/10 bg-surface-container/50 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:border-secondary hover:text-secondary transition-all rounded-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-0 z-[100] bg-background p-0 flex flex-col h-screen"
            >
              <div className="flex justify-between items-center p-6 border-b border-primary/5 bg-surface">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-black text-primary/40">Fendol Fish Menu</span>
                <button 
                  onClick={toggleMenu} 
                  className="p-2 hover:bg-primary/5 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-on-surface-variant" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-sans font-bold text-primary hover:text-secondary transition-colors block py-2 mb-6 border-b border-primary/5 pb-4"
                >
                  Home
                </Link>

                {[
                  { label: 'Shop', items: [
                    { name: 'The Market', path: '/market' },
                    { name: 'Recipes', path: '/recipes' },
                    { name: 'Gallery', path: '/gallery' },
                  ]},
                  { label: 'Company', items: [
                    { name: 'About Us', path: '/about' },
                    { name: 'Careers', path: '/careers' },
                  ]},
                  { label: 'Referral', items: [
                    { name: 'Refer & Earn', path: '/referral' },
                    ...(isAuthenticated ? [{ name: 'My Dashboard', path: '/dashboard' as string }] : []),
                  ]},
                  { label: 'Customer', items: [
                    { name: 'Track Order', path: '/track' },
                    { name: 'Distributors', path: '/distributors' },
                    { name: 'Contact', path: '/contact' },
                  ]},
                ].map((group, gIdx) => (
                  <div key={group.label} className="mb-8">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary block mb-3 font-black">{group.label}</span>
                    <div className="flex flex-col">
                      {group.items.map((link, idx) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (gIdx * 0.05) + (idx * 0.03) }}
                        >
                          <Link
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg font-sans font-bold text-primary hover:text-secondary transition-colors block py-1.5"
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-auto pt-8 border-t border-primary/5 pb-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/60 block mb-6">Browse by Supply</span>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 4).map((cat) => (
                      <Link 
                        key={cat.name} 
                        to={cat.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-3 bg-surface-container/50 border border-primary/5 rounded font-sans text-[11px] font-bold uppercase tracking-wider text-on-surface-variant hover:border-secondary hover:text-secondary transition-all text-center"
                      >
                        {cat.name.split(' (')[0]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-tertiary text-on-tertiary flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <button onClick={toggleDarkMode} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
                  </button>
                  {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                      <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
                      <User size={18} /> Sign In
                    </Link>
                  )}
                </div>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    toggleSearch();
                  }} 
                  className="w-full bg-secondary text-on-secondary py-4 rounded font-sans text-xs font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all"
                >
                  <Search size={18} /> Search Products
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Spacer to prevent content jump - but only if header is sticky and not transparent */}
      <div className={`h-24 md:h-32 transition-all ${location.pathname === '/' || location.pathname === '/referral' ? 'hidden' : 'block'}`}></div>
    </>
  );
}
