import { useState, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Star, SlidersHorizontal, Grid3X3, LayoutList, ChevronRight, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, products } from '../data';
import { useStore } from '../store';
import { Badge, GlassCard } from '../components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem, HoverLift, ImageReveal, ScrollProgress } from '../components/motion';

export function CatalogPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { toggleFavorite, favorites } = useStore();
  
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const currentCategory = categories.find(c => c.slug === category);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (category) result = result.filter(p => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.description.toLowerCase().includes(q));
    }
    if (selectedFilters.length > 0) result = result.filter(p => selectedFilters.some(f => p.tags.includes(f) || p.subcategory === f));
    result = result.filter(p => p.basePrice >= priceRange[0] && p.basePrice <= priceRange[1]);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.basePrice - b.basePrice); break;
      case 'price-high': result.sort((a, b) => b.basePrice - a.basePrice); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [category, query, sortBy, selectedFilters, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);
  const allTags = useMemo(() => { const tags = new Set<string>(); products.forEach(p => p.tags.forEach(t => tags.add(t))); return Array.from(tags); }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ScrollProgress />
      
      {/* Breadcrumbs */}
      <motion.nav 
        className="flex items-center gap-2 text-sm text-gray-400 mb-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="hover:text-brand-600 transition-smooth">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/catalog" className="hover:text-brand-600 transition-smooth">Products</Link>
        {currentCategory && (<><ChevronRight className="w-3 h-3" /><span className="text-gray-900 font-medium">{currentCategory.name}</span></>)}
      </motion.nav>

      {/* Category Header */}
      {currentCategory && (
        <ScrollReveal variant="fadeInUp">
          <div className="mb-10">
            <motion.div 
              className="flex items-center gap-3 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                className="text-3xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                {currentCategory.icon}
              </motion.span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{currentCategory.name}</h1>
            </motion.div>
            <p className="text-gray-500 max-w-2xl">{currentCategory.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {currentCategory.subcategories.map((sub, i) => (
                <motion.span
                  key={sub.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-3 py-1.5 glass rounded-full text-sm text-gray-600 hover:text-brand-600 cursor-pointer transition-smooth"
                >
                  {sub.name} ({sub.count})
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
      {query && (
        <ScrollReveal variant="fadeInUp">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Results for "<span className="gradient-text">{query}</span>"</h1>
            <p className="text-gray-500 mt-1">{filteredProducts.length} products found</p>
          </div>
        </ScrollReveal>
      )}

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed inset-0 z-50 bg-white p-6 overflow-auto lg:hidden"
            >
              <button onClick={() => setShowFilters(false)} className="mb-4 flex items-center gap-2 text-gray-600"><X className="w-5 h-5" /> Close</button>
              <FiltersContent 
                categories={categories} 
                category={category} 
                allTags={allTags}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </motion.aside>
          )}
        </AnimatePresence>
        
        <aside className="hidden lg:block lg:relative lg:w-60 shrink-0">
          <ScrollReveal variant="slideInLeft" delay={0.2}>
            <div className="sticky top-24 space-y-6">
              <FiltersContent 
                categories={categories} 
                category={category} 
                allTags={allTags}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </ScrollReveal>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <motion.div 
            className="flex items-center justify-between mb-6 glass rounded-xl p-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700"><SlidersHorizontal className="w-4 h-4" /> Filters</button>
            <motion.div className="text-sm text-gray-400" layout>
              {filteredProducts.length} products
            </motion.div>
            <div className="flex items-center gap-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border-0 glass-input rounded-lg px-3 py-1.5 focus:outline-none">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="hidden sm:flex border border-gray-100 rounded-lg overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 ${viewMode === 'grid' ? 'bg-brand-50 text-brand-600' : 'text-gray-300'}`}><Grid3X3 className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 ${viewMode === 'list' ? 'bg-brand-50 text-brand-600' : 'text-gray-300'}`}><LayoutList className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {paginatedProducts.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <Link to="/catalog" className="text-brand-600 font-semibold">View all products →</Link>
              </motion.div>
            ) : (
              <motion.div 
                key={viewMode + sortBy + currentPage}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
                }}
                className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}
              >
                {paginatedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } }
                    }}
                  >
                    {viewMode === 'grid' ? (
                      <HoverLift>
                        <div className="group glass-card rounded-2xl overflow-hidden">
                          <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                            <ImageReveal src={product.image} alt={product.name} className="w-full h-full" />
                            {product.bestseller && <Badge variant="premium" className="absolute top-3 left-3">Bestseller</Badge>}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                              className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                            >
                              <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                            </motion.button>
                          </Link>
                          <div className="p-4">
                            <Link to={`/product/${product.slug}`}><h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-smooth">{product.name}</h3></Link>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.shortDescription}</p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}</div>
                              <span className="text-xs text-gray-300">({product.reviewCount.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                              <span className="text-lg font-bold text-gray-900">${product.basePrice.toFixed(2)}</span>
                              <span className="text-[11px] text-gray-400">{product.deliveryDays}d delivery</span>
                            </div>
                          </div>
                        </div>
                      </HoverLift>
                    ) : (
                      <HoverLift liftAmount={-4}>
                        <Link to={`/product/${product.slug}`} className="flex gap-4 glass-card rounded-2xl p-4">
                          <ImageReveal src={product.image} alt={product.name} className="w-24 h-24 rounded-xl shrink-0" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{product.shortDescription}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="font-bold text-gray-900">${product.basePrice.toFixed(2)}</span>
                              <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}<span className="text-xs text-gray-300 ml-1">({product.reviewCount})</span></div>
                            </div>
                          </div>
                        </Link>
                      </HoverLift>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <ScrollReveal variant="fadeInUp">
              <div className="flex items-center justify-center gap-2 mt-10">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                  disabled={currentPage === 1} 
                  className="px-4 py-2 text-sm glass rounded-lg disabled:opacity-50 hover:shadow-sm transition-smooth"
                >
                  Previous
                </motion.button>
                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 text-sm rounded-lg font-medium transition-smooth ${currentPage === i + 1 ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'glass hover:shadow-sm'}`}
                  >
                    {i + 1}
                  </motion.button>
                ))}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                  disabled={currentPage === totalPages} 
                  className="px-4 py-2 text-sm glass rounded-lg disabled:opacity-50 hover:shadow-sm transition-smooth"
                >
                  Next
                </motion.button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}

// Filters Content Component
function FiltersContent({ categories, category, allTags, selectedFilters, setSelectedFilters, priceRange, setPriceRange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Price Range</h3>
        <input type="range" min="0" max="500" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-brand-600" />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$0</span><span>${priceRange[1]}</span></div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Categories</h3>
        <div className="space-y-1.5">
          {categories.map((cat: any) => (
            <Link key={cat.id} to={`/catalog/${cat.slug}`} className={`block text-sm py-1.5 px-2 rounded-lg transition-smooth ${category === cat.slug ? 'text-brand-600 font-semibold bg-brand-50' : 'text-gray-500 hover:text-brand-600 hover:bg-gray-50'}`}>
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Tags</h3>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag: string) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilters((prev: string[]) => prev.includes(tag) ? prev.filter((f: string) => f !== tag) : [...prev, tag])}
              className={`px-2.5 py-1 text-xs rounded-full border transition-smooth ${selectedFilters.includes(tag) ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-100 text-gray-500 hover:border-brand-200'}`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
