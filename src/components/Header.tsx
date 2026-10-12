import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { categories, products } from '../data';

export function Header() {
  const { cart, isAuthenticated, user, mobileMenuOpen, setMobileMenuOpen, favorites, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const searchResults = searchQuery.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.includes(searchQuery.toLowerCase()))).slice(0, 5)
    : [];

  // Scroll detection
  const { scrollY } = useScroll();
  
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 20);
    });
  }, [scrollY]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMenuEnter = (slug: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(slug);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  return (
    <motion.header 
      className="sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Announcement Bar */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-brand-950 via-brand-800 to-brand-950 text-white"
        animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-400 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-accent-400" />
          <span className="font-medium">Free shipping on orders over $75 — Use code</span>
          <span className="font-bold bg-white/10 px-2 py-0.5 rounded-md border border-white/20">WELCOME10</span>
          <span className="font-medium">for 10% off!</span>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.div 
        className={`transition-all duration-300 ${scrolled ? 'glass border-b border-white/20 shadow-lg' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'}`}
        layout
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                <motion.div 
                  className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-lg shadow-brand-600/20"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9V2h12v7"/>
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                </motion.div>
                <div className="hidden sm:block">
                  <span className="text-lg font-bold text-gray-900 tracking-tight">Print</span>
                  <span className="text-lg font-bold gradient-text tracking-tight">Craft</span>
                  <span className="text-[10px] font-medium text-gray-400 block -mt-1 tracking-wider">PRO</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="relative" onMouseLeave={handleMenuLeave}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-xl hover:bg-brand-50/50 transition-smooth"
                  onMouseEnter={() => handleMenuEnter('products')}
                >
                  Products <motion.span animate={{ rotate: activeMenu === 'products' ? 180 : 0 }}><ChevronDown className="w-3.5 h-3.5" /></motion.span>
                </motion.button>
                <AnimatePresence>
                  {activeMenu === 'products' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px]"
                      onMouseEnter={() => handleMenuEnter('products')}
                    >
                      <div className="glass-dark rounded-2xl p-5 shadow-2xl">
                        <div className="grid grid-cols-2 gap-1">
                          {categories.slice(0, 8).map((cat, i) => (
                            <motion.div
                              key={cat.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.03 }}
                            >
                              <Link to={`/catalog/${cat.slug}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-smooth group" onClick={() => setActiveMenu(null)}>
                                <motion.span className="text-2xl" whileHover={{ scale: 1.2, rotate: 10 }}>{cat.icon}</motion.span>
                                <div>
                                  <div className="font-medium text-white text-sm">{cat.name}</div>
                                  <div className="text-xs text-white/50">{cat.subcategories.length} categories</div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <Link to="/catalog" className="flex items-center gap-2 text-sm text-brand-300 hover:text-brand-200 font-medium px-3 py-1.5">
                            View all products →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/templates" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-xl hover:bg-brand-50/50 transition-smooth">Templates</Link>
              <Link to="/editor" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-xl hover:bg-brand-50/50 transition-smooth">Design Studio</Link>
              <Link to="/support" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-xl hover:bg-brand-50/50 transition-smooth">Support</Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-sm mx-6" ref={searchRef}>
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, templates..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm glass-input rounded-xl focus:outline-none transition-smooth"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                  onFocus={() => setSearchOpen(true)}
                />
                <AnimatePresence>
                  {searchOpen && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 w-full glass-dark rounded-2xl shadow-2xl py-2 z-50 overflow-hidden"
                    >
                      {searchResults.map((p, i) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link to={`/product/${p.slug}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-smooth" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10" />
                            <div>
                              <div className="text-sm font-medium text-white">{p.name}</div>
                              <div className="text-xs text-white/50">From ${p.basePrice.toFixed(2)}</div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                      <Link to={`/catalog?q=${searchQuery}`} className="block px-4 py-2.5 text-sm text-brand-300 font-medium hover:bg-white/5 border-t border-white/10 mt-1">
                        View all results →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="md:hidden p-2.5 text-gray-600 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-smooth" onClick={() => setSearchOpen(!searchOpen)}>
                <Search className="w-5 h-5" />
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/account" className="p-2.5 text-gray-600 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-smooth block" title="Account">
                  <User className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Link to="/account?tab=favorites" className="p-2.5 text-gray-600 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-smooth relative block" title="Favorites">
                  <Heart className="w-5 h-5" />
                  {favorites.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold shadow-lg"
                    >
                      {favorites.length}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/cart" className="relative p-2.5 text-gray-600 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-smooth block" title="Cart">
                  <ShoppingCart className="w-5 h-5" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        key={cartCount}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-gradient-to-r from-brand-600 to-brand-700 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-brand-600/30 px-1"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2.5 text-gray-600 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-smooth" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="w-5 h-5" /></motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu className="w-5 h-5" /></motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="lg:hidden glass-dark overflow-hidden"
          >
            <div className="px-4 py-5 space-y-1 max-h-[70vh] overflow-auto">
              <div className="md:hidden pb-3 mb-3 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={`/catalog/${cat.slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                    <span className="text-xl">{cat.icon}</span>
                    <span className="font-medium text-white/90">{cat.name}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 mt-3 border-t border-white/10 space-y-1">
                <Link to="/templates" className="block px-3 py-2.5 font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-smooth">Templates</Link>
                <Link to="/editor" className="block px-3 py-2.5 font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-smooth">Design Studio</Link>
                <Link to="/support" className="block px-3 py-2.5 font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-smooth">Support</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
