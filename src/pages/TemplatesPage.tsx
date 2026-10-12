import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Filter, Palette } from 'lucide-react';
import { templates, categories } from '../data';

export function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const allCategories = ['All', ...new Set(templates.map(t => t.category))];
  const allStyles = ['All', ...new Set(templates.map(t => t.style))];
  const allIndustries = ['All', ...new Set(templates.map(t => t.industry))];

  const filtered = templates.filter(t => {
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    if (selectedStyle !== 'All' && t.style !== selectedStyle) return false;
    if (selectedIndustry !== 'All' && t.industry !== selectedIndustry) return false;
    return true;
  });

  const toggleFav = (id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Template Library</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Start with a professional template and customize it for your brand. Choose from hundreds of designs for every product type.</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search templates..." className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div className="flex gap-3 flex-wrap">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
              {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
            <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
              {allStyles.map(s => <option key={s} value={s}>{s === 'All' ? 'All Styles' : s}</option>)}
            </select>
            <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
              {allIndustries.map(i => <option key={i} value={i}>{i === 'All' ? 'All Industries' : i}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <p className="text-sm text-gray-600 mb-4">{filtered.length} templates found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(template => (
          <div key={template.id} className="group bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img src={template.preview} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {template.premium && (
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Premium</span>
              )}
              <button onClick={() => toggleFav(template.id)} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className={`w-4 h-4 ${favorites.includes(template.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
              </button>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Link to={`/editor?template=${template.id}`} className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Customize
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm">{template.name}</h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{template.category}</span>
                <span className="text-xs text-gray-500">{template.style}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {template.colors.map((color, i) => (
                  <span key={i} className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
                ))}
                <span className="text-xs text-gray-400 ml-1">{template.industry}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">♥ {template.favoriteCount}</span>
                <Link to={`/editor?template=${template.id}`} className="text-xs text-brand-600 font-medium hover:text-brand-700">Use template →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedStyle('All'); setSelectedIndustry('All'); }} className="text-brand-600 font-medium">Clear filters</button>
        </div>
      )}
    </div>
  );
}
