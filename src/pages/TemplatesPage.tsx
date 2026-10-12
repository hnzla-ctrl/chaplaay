import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Palette, Sparkles } from 'lucide-react';
import { templates } from '../data';
import { Badge, GlassCard } from '../components/ui';

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
      {/* Header - Maximalist */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -top-20 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-400 rounded-full blur-[80px]"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-[80px]"></div>
        </div>
        <div className="relative">
          <Badge variant="premium" className="mb-3"><Sparkles className="w-3 h-3" /> Creative Library</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Template <span className="gradient-text">Library</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Start with a professional template and customize it for your brand. Hundreds of designs for every product type.</p>
        </div>
      </div>

      {/* Search & Filters - Glassmorphism */}
      <div className="glass rounded-2xl p-5 mb-8 shadow-premium">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search templates..." className="w-full pl-11 pr-4 py-3 glass-input rounded-xl focus:outline-none transition-smooth" />
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-3 glass-input rounded-xl text-sm focus:outline-none transition-smooth">
              {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
            <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)} className="px-3 py-3 glass-input rounded-xl text-sm focus:outline-none transition-smooth">
              {allStyles.map(s => <option key={s} value={s}>{s === 'All' ? 'All Styles' : s}</option>)}
            </select>
            <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="px-3 py-3 glass-input rounded-xl text-sm focus:outline-none transition-smooth">
              {allIndustries.map(i => <option key={i} value={i}>{i === 'All' ? 'All Industries' : i}</option>)}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-6">{filtered.length} templates found</p>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((template, i) => (
          <div key={template.id} className="group glass-card rounded-2xl overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'forwards' }}>
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
              <img src={template.preview} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {template.premium && <Badge variant="premium" className="absolute top-3 left-3">✨ Premium</Badge>}
              <button onClick={() => toggleFav(template.id)} className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:scale-110">
                <Heart className={`w-4 h-4 ${favorites.includes(template.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end justify-center pb-4">
                <Link to={`/editor?template=${template.id}`} className="px-4 py-2 glass rounded-lg text-sm font-semibold text-white hover:bg-white/90 transition-smooth flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5" /> Customize
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm">{template.name}</h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] glass px-2 py-0.5 rounded-full text-gray-500">{template.category}</span>
                <span className="text-[11px] text-gray-400">{template.style}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2.5">
                {template.colors.map((color, i) => (
                  <span key={i} className="w-3.5 h-3.5 rounded-full border border-gray-100 shadow-sm" style={{ backgroundColor: color }} />
                ))}
                <span className="text-[11px] text-gray-400 ml-1">{template.industry}</span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">♥ {template.favoriteCount}</span>
                <Link to={`/editor?template=${template.id}`} className="text-xs text-brand-600 font-semibold hover:text-brand-700 transition-smooth">Use template →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🎨</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedStyle('All'); setSelectedIndustry('All'); }} className="text-brand-600 font-semibold">Clear filters</button>
        </div>
      )}
    </div>
  );
}
