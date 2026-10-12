import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Palette, Clock, CheckCircle, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { categories, products, reviews } from '../data';
import { useStore } from '../store';
import { GlassCard, GradientText, Badge, Button } from '../components/ui';
import { 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem, 
  Parallax, 
  AnimatedCounter, 
  Magnetic,
  ImageReveal,
  ScrollProgress,
  FloatingElement,
  GlassReveal,
  HoverLift,
  ScrollIndicator
} from '../components/motion';

export function HomePage() {
  const { toggleFavorite, favorites } = useStore();
  const featuredProducts = products.filter(p => p.featured);
  const bestsellers = products.filter(p => p.bestseller);
  
  // Parallax for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div>
      <ScrollProgress />
      
      {/* ===== MAXIMALIST HERO WITH PARALLAX ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Parallax Background Layers */}
        <motion.div 
          className="absolute inset-0 gradient-hero"
          style={{ y: heroY }}
        />
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: useTransform(scrollY, [0, 500], [0, 100])
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/70 to-transparent"></div>
        
        {/* Floating orbs with parallax */}
        <motion.div 
          className="absolute top-20 right-20 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl"
          style={{ y: useTransform(scrollY, [0, 500], [0, -80]) }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
          style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent-500/10 rounded-full blur-2xl"
          style={{ y: useTransform(scrollY, [0, 500], [0, -120]) }}
        />

        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full"
          style={{ opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 text-sm mb-8"
              >
                <Sparkles className="w-4 h-4 text-accent-400" />
                <span className="text-white/80">Premium Printing, Perfected</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
              >
                Your Brand,<br />
                <span className="gradient-text-gold">Printed</span><br />
                <span className="text-white/90">Perfectly.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed"
              >
                Professional custom printing for businesses and individuals. Design online or upload your artwork — we handle the rest with premium quality and fast delivery.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Magnetic>
                  <Link to="/catalog" className="group inline-flex items-center gap-2.5 bg-white text-brand-700 px-7 py-4 rounded-xl font-bold hover:bg-brand-50 transition-smooth shadow-2xl shadow-white/10">
                    Shop Products
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/editor" className="inline-flex items-center gap-2.5 glass-dark text-white px-7 py-4 rounded-xl font-bold hover:bg-white/10 transition-smooth border border-white/20">
                    <Palette className="w-4 h-4" /> Start Designing
                  </Link>
                </Magnetic>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center gap-8 mt-10"
              >
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
              </motion.div>
            </div>

            {/* Hero Visual - Animated Glass Cards */}
            <motion.div 
              className="hidden lg:block relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <FloatingElement delay={0}>
                  <div className="absolute inset-8 glass-dark rounded-3xl p-6 shadow-2xl">
                    <div className="grid grid-cols-2 gap-3 h-full">
                      {featuredProducts.slice(0, 4).map((p, i) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                        >
                          <Link to={`/product/${p.slug}`} className={`group relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2' : ''} block h-full`}>
                            <ImageReveal src={p.image} alt={p.name} className="w-full h-full min-h-[100px]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                              <span className="text-white text-xs font-medium">{p.name}</span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FloatingElement>
                
                <FloatingElement delay={1}>
                  <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-xl">
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
                </FloatingElement>
                
                <FloatingElement delay={2}>
                  <div className="absolute -bottom-2 -left-4 glass rounded-2xl p-4 shadow-xl">
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
                </FloatingElement>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <ScrollIndicator />
        </motion.div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#fafafa"/></svg>
        </div>
      </section>

      {/* ===== TRUST BAR - Glass Reveal ===== */}
      <section className="relative -mt-1 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <GlassReveal>
            <div className="glass rounded-2xl p-6 shadow-premium">
              <StaggerContainer>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Truck, label: 'Free Shipping', desc: 'Orders over $75', color: 'text-brand-600 bg-brand-50' },
                    { icon: Shield, label: 'Quality Guarantee', desc: '100% satisfaction', color: 'text-green-600 bg-green-50' },
                    { icon: Clock, label: 'Fast Turnaround', desc: '3-5 business days', color: 'text-purple-600 bg-purple-50' },
                    { icon: Palette, label: 'Free Design Tools', desc: 'Professional editor', color: 'text-amber-600 bg-amber-50' },
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </div>
          </GlassReveal>
        </div>
      </section>

      {/* ===== CATEGORIES - Staggered Reveal ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fadeInUp">
            <div className="text-center mb-12">
              <Badge variant="default" className="mb-3">Browse Collection</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Shop by Category</h2>
              <p className="text-gray-500 max-w-xl mx-auto">From business essentials to promotional products, find everything you need to make your brand stand out.</p>
            </div>
          </ScrollReveal>
          
          <StaggerContainer>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <StaggerItem key={cat.id}>
                  <HoverLift>
                    <Link to={`/catalog/${cat.slug}`} className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-smooth block ${i < 2 ? 'aspect-[2/1] sm:aspect-auto sm:row-span-2' : 'aspect-[4/3]'}`}>
                      <ImageReveal src={cat.image} alt={cat.name} className="w-full h-full" />
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
                  </HoverLift>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ===== BESTSELLERS - Staggered Grid ===== */}
      <section className="py-20 bg-gradient-to-b from-transparent via-brand-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fadeInUp">
            <div className="flex items-end justify-between mb-12">
              <div>
                <Badge variant="premium" className="mb-3">⭐ Most Popular</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Bestselling Products</h2>
              </div>
              <Link to="/catalog" className="hidden sm:flex items-center gap-1 text-brand-600 font-semibold hover:text-brand-700 transition-smooth">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
          
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.slice(0, 8).map((product) => (
                <StaggerItem key={product.id}>
                  <HoverLift>
                    <div className="group glass-card rounded-2xl overflow-hidden">
                      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                        <ImageReveal src={product.image} alt={product.name} className="w-full h-full" />
                        <Badge variant="premium" className="absolute top-3 left-3">Bestseller</Badge>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                          className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                        >
                          <svg className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </motion.button>
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
                  </HoverLift>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ===== BUSINESS NEEDS - Slide In ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fadeInUp">
            <div className="text-center mb-12">
              <Badge className="mb-3">For Every Industry</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Shop by Business Need</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Curated collections for every industry and occasion</p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Startup Launch', desc: 'Business cards, flyers, and stickers to kickstart your brand', icon: '🚀', gradient: 'from-indigo-500 to-purple-600' },
              { title: 'E-commerce', desc: 'Custom packaging, mailer boxes, and product labels', icon: '🛒', gradient: 'from-emerald-500 to-teal-600' },
              { title: 'Events & Trade Shows', desc: 'Banners, displays, brochures, and promotional items', icon: '🎪', gradient: 'from-orange-500 to-red-600' },
              { title: 'Restaurant & Food', desc: 'Menus, business cards, packaging, and promotional materials', icon: '🍽️', gradient: 'from-amber-500 to-orange-600' },
              { title: 'Real Estate', desc: 'Flyers, postcards, yard signs, and open house materials', icon: '🏠', gradient: 'from-purple-500 to-pink-600' },
              { title: 'Weddings & Events', desc: 'Invitations, save-the-dates, programs, and thank you cards', icon: '💍', gradient: 'from-rose-500 to-pink-600' },
            ].map((item, i) => (
              <ScrollReveal key={i} variant={i % 2 === 0 ? 'slideInLeft' : 'slideInRight'} delay={i * 0.1}>
                <HoverLift>
                  <Link to="/catalog" className="group relative p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-premium transition-smooth overflow-hidden bg-white block">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-smooth`}></div>
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-brand-700 transition-smooth">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                    <div className="flex items-center gap-1.5 text-brand-600 text-sm font-semibold">
                      Explore products <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </HoverLift>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESIGN SERVICES - Parallax ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95"></div>
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
            y: useTransform(scrollY, [500, 1500], [0, -50])
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="slideInLeft">
              <div className="text-white">
                <Badge variant="premium" className="mb-4 bg-white/10 border-white/20 text-white">Professional Design</Badge>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                  Need a<br /><span className="gradient-text-gold">Professional</span> Design?
                </h2>
                <p className="text-white/60 text-lg mb-8 leading-relaxed">Our team of professional designers can create stunning artwork for your business. From logos to complete brand identities.</p>
                <ul className="space-y-3 mb-10">
                  {['Logo Design & Brand Identity', 'Business Card Design', 'Packaging Design', 'Marketing Material Design', 'Artwork File Preparation'].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-400" />
                      </div>
                      <span className="text-white/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Magnetic>
                  <Link to="/support" className="inline-flex items-center gap-2 bg-white text-brand-700 px-7 py-3.5 rounded-xl font-bold hover:bg-brand-50 transition-smooth shadow-2xl shadow-black/20">
                    Request a Design <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="slideInRight">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="rounded-2xl overflow-hidden shadow-2xl glass-dark p-1"
                  >
                    <ImageReveal src={`https://picsum.photos/seed/design${i}/400/400`} alt="Design example" className="w-full aspect-square" />
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS - Staggered Cards ===== */}
      <section className="py-20 gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fadeInUp">
            <div className="text-center mb-12">
              <Badge variant="success" className="mb-3">Verified Reviews</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">What Our Customers Say</h2>
              <p className="text-gray-500">Trusted by over 50,000 businesses worldwide</p>
            </div>
          </ScrollReveal>
          
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <StaggerItem key={review.id}>
                  <HoverLift liftAmount={-6}>
                    <GlassCard className="p-6" hover={false}>
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
                  </HoverLift>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ===== NEWSLETTER - Scale In ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-950"></div>
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)'
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal variant="scaleIn">
            <div className="glass-dark rounded-3xl p-10 sm:p-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Stay in the Loop</h2>
              <p className="text-white/50 mb-8 max-w-md mx-auto">Subscribe for design tips, new product announcements, and inspiration delivered to your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }}>
                <input type="email" placeholder="Enter your email" required className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-400 transition-smooth" />
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-bold hover:from-brand-600 hover:to-brand-700 transition-smooth shadow-lg shadow-brand-600/30"
                >
                  Subscribe
                </motion.button>
              </form>
              <p className="text-xs text-white/30 mt-4">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
