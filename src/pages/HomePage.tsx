import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Palette, Clock, CheckCircle, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { categories, products, reviews } from '../data';
import { useStore } from '../store';
import { GlassCard, GradientText, Badge, Button } from '../components/ui';

export function HomePage() {
  const { toggleFavorite, favorites } = useStore();
  const featuredProducts = products.filter(p => p.featured);
  const bestsellers = products.filter(p => p.bestseller);

  return (
    <div>
      {/* ===== MAXIMALIST HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 gradient-hero animate-gradient"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/70 to-transparent"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 text-sm mb-8 animate-fade-in-up">
                <Sparkles className="w-4 h-4 text-accent-400" />
                <span className="text-white/80">Premium Printing, Perfected</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 animate-fade-in-up stagger-1">
                Your Brand,<br />
                <span className="gradient-text-gold">Printed</span><br />
                <span className="text-white/90">Perfectly.</span>
              </h1>
              <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed animate-fade-in-up stagger-2">
                Professional custom printing for businesses and individuals. Design online or upload your artwork — we handle the rest with premium quality and fast delivery.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-3">
                <Link to="/catalog" className="group inline-flex items-center gap-2.5 bg-white text-brand-700 px-7 py-4 rounded-xl font-bold hover:bg-brand-50 transition-smooth shadow-2xl shadow-white/10">
                  Shop Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/editor" className="inline-flex items-center gap-2.5 glass-dark text-white px-7 py-4 rounded-xl font-bold hover:bg-white/10 transition-smooth border border-white/20">
                  <Palette className="w-4 h-4" /> Start Designing
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-10 animate-fade-in-up stagger-4">
                {[
                  { label: '50K+', sub: 'Happy Customers' },
                  { label: '4.9★', sub: 'Average Rating' },
                  { label: '3-5', sub: 'Day Delivery' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual - Glassmorphism Cards */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main card */}
                <div className="absolute inset-8 glass-dark rounded-3xl p-6 shadow-2xl animate-float">
                  <div className="grid grid-cols-2 gap-3 h-full">
                    {featuredProducts.slice(0, 4).map((p, i) => (
                      <Link key={p.id} to={`/product/${p.slug}`} className={`group relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2' : ''}`}>
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[100px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                          <span className="text-white text-xs font-medium">{p.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Floating accent card */}
                <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">Quality Guaranteed</div>
                      <div className="text-[10px] text-gray-500">100% satisfaction</div>
                    </div>
                  </div>
                </div>
                {/* Floating price card */}
                <div className="absolute -bottom-2 -left-4 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '3s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-brand-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">From $0.12/ea</div>
                      <div className="text-[10px] text-gray-500">Volume discounts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#fafafa"/></svg>
        </div>
      </section>

      {/* ===== TRUST BAR - Glassmorphism ===== */}
      <section className="relative -mt-1 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="glass rounded-2xl p-6 shadow-premium">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, label: 'Free Shipping', desc: 'Orders over $75', color: 'text-brand-600 bg-brand-50' },
                { icon: Shield, label: 'Quality Guarantee', desc: '100% satisfaction', color: 'text-green-600 bg-green-50' },
                { icon: Clock, label: 'Fast Turnaround', desc: '3-5 business days', color: 'text-purple-600 bg-purple-50' },
                { icon: Palette, label: 'Free Design Tools', desc: 'Professional editor', color: 'text-amber-600 bg-amber-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES - Minimalist Grid ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-3">Browse Collection</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Shop by Category</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From business essentials to promotional products, find everything you need to make your brand stand out.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link key={cat.id} to={`/catalog/${cat.slug}`} className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-smooth ${i < 2 ? 'aspect-[2/1] sm:aspect-auto sm:row-span-2' : 'aspect-[4/3]'}`}>
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl sm:text-2xl">{cat.icon}</span>
                    <h3 className="text-white font-bold text-sm sm:text-base">{cat.name}</h3>
                  </div>
                  <p className="text-white/60 text-xs">{cat.subcategories.length} products</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-smooth"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BESTSELLERS - Glass Cards ===== */}
      <section className="py-20 bg-gradient-to-b from-transparent via-brand-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="premium" className="mb-3">⭐ Most Popular</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Bestselling Products</h2>
            </div>
            <Link to="/catalog" className="hidden sm:flex items-center gap-1 text-brand-600 font-semibold hover:text-brand-700 transition-smooth">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 8).map((product, i) => (
              <div key={product.id} className="group glass-card rounded-2xl overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
                <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <Badge variant="premium" className="absolute top-3 left-3">Bestseller</Badge>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:scale-110"
                  >
                    <svg className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-smooth line-clamp-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">${product.basePrice.toFixed(2)}</span>
                    <span className="text-[11px] text-gray-400 font-medium">From {product.minQuantity} pcs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUSINESS NEEDS - Maximalist Section ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-3">For Every Industry</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Shop by Business Need</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Curated collections for every industry and occasion</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Startup Launch', desc: 'Business cards, flyers, and stickers to kickstart your brand', icon: '🚀', gradient: 'from-indigo-500 to-purple-600' },
              { title: 'E-commerce', desc: 'Custom packaging, mailer boxes, and product labels', icon: '🛒', gradient: 'from-emerald-500 to-teal-600' },
              { title: 'Events & Trade Shows', desc: 'Banners, displays, brochures, and promotional items', icon: '🎪', gradient: 'from-orange-500 to-red-600' },
              { title: 'Restaurant & Food', desc: 'Menus, business cards, packaging, and promotional materials', icon: '🍽️', gradient: 'from-amber-500 to-orange-600' },
              { title: 'Real Estate', desc: 'Flyers, postcards, yard signs, and open house materials', icon: '🏠', gradient: 'from-purple-500 to-pink-600' },
              { title: 'Weddings & Events', desc: 'Invitations, save-the-dates, programs, and thank you cards', icon: '💍', gradient: 'from-rose-500 to-pink-600' },
            ].map((item, i) => (
              <Link key={i} to="/catalog" className="group relative p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-premium transition-smooth overflow-hidden bg-white">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-smooth`}></div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-smooth`}>{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-brand-700 transition-smooth">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                <div className="flex items-center gap-1.5 text-brand-600 text-sm font-semibold">
                  Explore products <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESIGN SERVICES - Maximalist ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <Badge variant="premium" className="mb-4 bg-white/10 border-white/20 text-white">Professional Design</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Need a<br /><span className="gradient-text-gold">Professional</span> Design?
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">Our team of professional designers can create stunning artwork for your business. From logos to complete brand identities.</p>
              <ul className="space-y-3 mb-10">
                {['Logo Design & Brand Identity', 'Business Card Design', 'Packaging Design', 'Marketing Material Design', 'Artwork File Preparation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-accent-400" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/support" className="inline-flex items-center gap-2 bg-white text-brand-700 px-7 py-3.5 rounded-xl font-bold hover:bg-brand-50 transition-smooth shadow-2xl shadow-black/20">
                Request a Design <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`rounded-2xl overflow-hidden ${i === 1 ? 'aspect-square' : 'aspect-square'} shadow-2xl glass-dark p-1`}>
                  <img src={`https://picsum.photos/seed/design${i}/400/400`} alt="Design example" className="w-full h-full object-cover rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS - Glassmorphism ===== */}
      <section className="py-20 gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="success" className="mb-3">Verified Reviews</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">What Our Customers Say</h2>
            <p className="text-gray-500">Trusted by over 50,000 businesses worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <GlassCard key={review.id} className="p-6 opacity-0 animate-fade-in-up" hover={false} >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{review.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-500/20">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{review.name}</div>
                      <div className="text-xs text-gray-400">{review.product}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-300">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER - Maximalist CTA ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-950"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-600 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-500 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-dark rounded-3xl p-10 sm:p-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Get 10% Off Your First Order</h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">Subscribe for exclusive deals, design tips, and new product announcements.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing! Check your email for your discount code.'); }}>
              <input type="email" placeholder="Enter your email" required className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-400 transition-smooth" />
              <button type="submit" className="px-7 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-bold hover:from-brand-600 hover:to-brand-700 transition-smooth shadow-lg shadow-brand-600/30">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-white/30 mt-4">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
