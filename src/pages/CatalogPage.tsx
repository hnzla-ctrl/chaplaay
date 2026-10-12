import { useState, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Star, SlidersHorizontal, Grid3X3, LayoutList, ChevronRight, Heart, X } from 'lucide-react';
import { categories, products } from '../data';
import { useStore } from '../store';

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
    
    if (category) {
      result = result.filter(p => p.category === category);
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.description.toLowerCase().includes(q));
    }
    if (selectedFilters.length > 0) {
      result = result.filter(p => selectedFilters.some(f => p.tags.includes(f) || p.subcategory === f));
    }
    result = result.filter(p => p.basePrice >= priceRange[0] && p.basePrice <= priceRange[1]);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.basePrice - b.basePrice); break;
      case 'price-high': result.sort((a, b) => b.basePrice - a.basePrice); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [category, query, sortBy, selectedFilters, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/catalog" className="hover:text-brand-600">Products</Link>
        {currentCategory && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">{currentCategory.name}</span>
          </>
        )}
      </nav>

      {/* Category Header */}
      {currentCategory && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentCategory.name}</h1>
          <p className="text-gray-600">{currentCategory.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {currentCategory.subcategories.map(sub => (
              <span key={sub.slug} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 cursor-pointer transition-colors">
                {sub.name} ({sub.count})
              </span>
            ))}
          </div>
        </div>
      )}
      {query && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Search results for "{query}"</h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>
      )}

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-auto' : 'hidden'} lg:block lg:relative lg:w-64 shrink-0`}>
          {showFilters && (
            <button onClick={() => setShowFilters(false)} className="lg:hidden mb-4 flex items-center gap-2 text-gray-600">
              <X className="w-5 h-5" /> Close filters
            </button>
          )}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input type="range" min="0" max="500" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-brand-600" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <Link key={cat.id} to={`/catalog/${cat.slug}`} className={`block text-sm py-1 ${category === cat.slug ? 'text-brand-600 font-medium' : 'text-gray-600 hover:text-brand-600'}`}>
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedFilters(prev => prev.includes(tag) ? prev.filter(f => f !== tag) : [...prev, tag])}
                    className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${selectedFilters.includes(tag) ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-200 text-gray-600 hover:border-brand-300'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2].map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded accent-brand-600" />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < r ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">& up</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-3 border">
            <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="text-sm text-gray-600">{filteredProducts.length} products</div>
            <div className="flex items-center gap-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <div className="hidden sm:flex border rounded-lg overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 ${viewMode === 'grid' ? 'bg-brand-50 text-brand-600' : 'text-gray-400'}`}><Grid3X3 className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 ${viewMode === 'list' ? 'bg-brand-50 text-brand-600' : 'text-gray-400'}`}><LayoutList className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Products */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Link to="/catalog" className="text-brand-600 font-medium hover:text-brand-700">View all products →</Link>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {paginatedProducts.map(product => (
                viewMode === 'grid' ? (
                  <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {product.bestseller && <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">Bestseller</span>}
                      <button onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                      </button>
                    </Link>
                    <div className="p-4">
                      <Link to={`/product/${product.slug}`}><h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{product.name}</h3></Link>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.shortDescription}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}</div>
                        <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-gray-900">From ${product.basePrice.toFixed(2)}</span>
                        <span className="text-xs text-gray-500">{product.deliveryDays} day delivery</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link key={product.id} to={`/product/${product.slug}`} className="flex gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4">
                    <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{product.shortDescription}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="font-bold text-gray-900">From ${product.basePrice.toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}
                          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50">Previous</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 text-sm rounded-lg ${currentPage === i + 1 ? 'bg-brand-600 text-white' : 'border hover:bg-gray-50'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50">Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
