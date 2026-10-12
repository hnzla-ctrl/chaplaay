import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Palette, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { categories, products, reviews } from '../data';
import { useStore } from '../store';

export function HomePage() {
  const { toggleFavorite, favorites } = useStore();
  const featuredProducts = products.filter(p => p.featured);
  const bestsellers = products.filter(p => p.bestseller);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Free shipping on orders over $75
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Brand,<br />
                <span className="text-brand-200">Printed Perfectly</span>
              </h1>
              <p className="text-lg text-brand-100 mb-8 max-w-lg">
                Professional custom printing for businesses and individuals. Design online or upload your artwork — we handle the rest with premium quality and fast delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog" className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors shadow-lg">
                  Shop Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/editor" className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-500 transition-colors border border-brand-500">
                  <Palette className="w-4 h-4" /> Start Designing
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-brand-200">
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> 100% Satisfaction</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Free Design Tools</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Fast Turnaround</div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {featuredProducts.slice(0, 4).map((p, i) => (
                    <Link key={p.id} to={`/product/${p.slug}`} className={`group relative rounded-xl overflow-hidden shadow-lg ${i === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <span className="text-white text-sm font-medium">{p.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'Orders over $75' },
              { icon: Shield, label: 'Quality Guarantee', desc: '100% satisfaction' },
              { icon: Clock, label: 'Fast Turnaround', desc: '3-5 business days' },
              { icon: Palette, label: 'Free Design Tools', desc: 'Professional editor' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From business essentials to promotional products, find everything you need to make your brand stand out.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} to={`/catalog/${cat.slug}`} className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.icon}</span>
                    <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                  </div>
                  <p className="text-white/70 text-xs mt-1">{cat.subcategories.length} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Bestselling Products</h2>
              <p className="text-gray-600">Our most popular items loved by thousands of customers</p>
            </div>
            <Link to="/catalog" className="hidden sm:flex items-center gap-1 text-brand-600 font-medium hover:text-brand-700">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 8).map(product => (
              <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.bestseller && (
                    <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">Bestseller</span>
                  )}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-gray-900">From ${product.basePrice.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">Min {product.minQuantity} pcs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Business Need */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Shop by Business Need</h2>
          <p className="text-gray-600 text-center mb-10">Find the right products for your industry</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Startup Launch', desc: 'Business cards, flyers, and stickers to kickstart your brand', icon: '🚀', color: 'from-blue-500 to-indigo-600' },
              { title: 'E-commerce', desc: 'Custom packaging, mailer boxes, and product labels', icon: '🛒', color: 'from-emerald-500 to-teal-600' },
              { title: 'Events & Trade Shows', desc: 'Banners, displays, brochures, and promotional items', icon: '🎪', color: 'from-orange-500 to-red-600' },
              { title: 'Restaurant & Food', desc: 'Menus, business cards, packaging, and promotional materials', icon: '🍽️', color: 'from-amber-500 to-orange-600' },
              { title: 'Real Estate', desc: 'Flyers, postcards, yard signs, and open house materials', icon: '🏠', color: 'from-purple-500 to-pink-600' },
              { title: 'Weddings & Events', desc: 'Invitations, save-the-dates, programs, and thank you cards', icon: '💍', color: 'from-rose-500 to-pink-600' },
            ].map((item, i) => (
              <Link key={i} to="/catalog" className="group p-6 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4`}>{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-brand-600 text-sm font-medium">
                  Explore products <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Design Services */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Need a Professional Design?</h2>
              <p className="text-gray-300 mb-6">Our team of professional designers can create stunning artwork for your business. From logos to complete brand identities, we've got you covered.</p>
              <ul className="space-y-3 mb-8">
                {['Logo Design & Brand Identity', 'Business Card Design', 'Packaging Design', 'Marketing Material Design', 'Artwork File Preparation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/support" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request a Design <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-xl overflow-hidden aspect-square bg-gray-700">
                  <img src={`https://picsum.photos/seed/design${i}/300/300`} alt="Design example" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Customers Say</h2>
            <p className="text-gray-600">Trusted by over 50,000 businesses worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-semibold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.product}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Get 10% Off Your First Order</h2>
          <p className="text-brand-100 mb-6">Subscribe to our newsletter for exclusive deals, design tips, and new product announcements.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing! Check your email for your discount code.'); }}>
            <input type="email" placeholder="Enter your email" required className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white" />
            <button type="submit" className="px-6 py-3 bg-white text-brand-700 rounded-lg font-semibold hover:bg-brand-50 transition-colors">Subscribe</button>
          </form>
          <p className="text-xs text-brand-200 mt-3">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
