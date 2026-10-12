import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown, Package } from 'lucide-react';
import { useStore } from '../store';
import { categories, products } from '../data';

export function Header() {
  const { cart, isAuthenticated, user, mobileMenuOpen, setMobileMenuOpen, favorites, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const searchResults = searchQuery.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.includes(searchQuery.toLowerCase()))).slice(0, 5)
    : [];

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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-brand-700 text-white text-center py-2 px-4 text-sm font-medium">
        🎉 Free shipping on orders over $75 — Use code <span className="font-bold">WELCOME10</span> for 10% off your first order!
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">PrintCraft<span className="text-brand-600">Pro</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative" onMouseLeave={handleMenuLeave}>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-lg hover:bg-gray-50 transition-colors"
                onMouseEnter={() => handleMenuEnter('products')}
              >
                Products <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeMenu === 'products' && (
                <div className="absolute top-full left-0 mt-0 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 grid grid-cols-2 gap-4 animate-fade-in" onMouseEnter={() => handleMenuEnter('products')}>
                  {categories.slice(0, 8).map(cat => (
                    <Link key={cat.id} to={`/catalog/${cat.slug}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setActiveMenu(null)}>
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{cat.name}</div>
                        <div className="text-xs text-gray-500">{cat.subcategories.length} categories</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/templates" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-lg hover:bg-gray-50 transition-colors">Templates</Link>
            <Link to="/editor" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-lg hover:bg-gray-50 transition-colors">Design Editor</Link>
            <Link to="/support" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-lg hover:bg-gray-50 transition-colors">Support</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, templates..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
              />
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {searchResults.map(p => (
                    <Link key={p.id} to={`/product/${p.slug}`} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                        <div className="text-xs text-gray-500">From ${p.basePrice.toFixed(2)}</div>
                      </div>
                    </Link>
                  ))}
                  <Link to={`/catalog?q=${searchQuery}`} className="block px-4 py-2 text-sm text-brand-600 font-medium hover:bg-gray-50 border-t mt-1 pt-2">
                    View all results →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="md:hidden p-2 text-gray-600 hover:text-brand-600" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5" />
            </button>
            <Link to="/account" className="p-2 text-gray-600 hover:text-brand-600 relative" title="Account">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/account?tab=favorites" className="p-2 text-gray-600 hover:text-brand-600 relative hidden sm:block" title="Favorites">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{favorites.length}</span>}
            </Link>
            <Link to="/cart" className="p-2 text-gray-600 hover:text-brand-600 relative" title="Cart">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </Link>
            <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            <div className="md:hidden pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
            {categories.map(cat => (
              <Link key={cat.id} to={`/catalog/${cat.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-xl">{cat.icon}</span>
                <span className="font-medium text-gray-700">{cat.name}</span>
              </Link>
            ))}
            <hr className="my-2" />
            <Link to="/templates" className="block px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
            <Link to="/editor" className="block px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Design Editor</Link>
            <Link to="/support" className="block px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Support</Link>
          </div>
        </div>
      )}
    </header>
  );
}
