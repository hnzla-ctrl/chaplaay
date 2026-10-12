import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ChevronRight, Truck, Shield, RotateCcw, Check, ZoomIn, Minus, Plus, Upload, Palette, Sparkles } from 'lucide-react';
import { products } from '../data';
import { useStore } from '../store';
import { GlassCard, Badge, Button, GradientText } from '../components/ui';
import { v4 as uuidv4 } from 'uuid';

export function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites } = useStore();
  const product = products.find(p => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(product?.minQuantity || 100);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'faq'>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Product Not Found</h1>
        <Link to="/catalog" className="text-brand-600 font-semibold hover:text-brand-700">Browse all products →</Link>
      </div>
    );
  }

  if (Object.keys(selectedOptions).length === 0) {
    product.options.forEach(opt => {
      if (opt.values.length > 0) selectedOptions[opt.id] = opt.values[0].value;
    });
  }

  const calculatePrice = () => {
    let optionModifiers = 0;
    product.options.forEach(opt => {
      const selected = opt.values.find(v => v.value === selectedOptions[opt.id]);
      if (selected) optionModifiers += selected.priceModifier;
    });
    const breakInfo = product.quantityBreaks.find(b => quantity >= b.minQty && quantity <= b.maxQty);
    const unitPrice = (breakInfo?.unitPrice || product.basePrice / product.minQuantity) + (optionModifiers / product.minQuantity);
    const subtotal = unitPrice * quantity;
    return { unitPrice: unitPrice + (product.setupFee / quantity), subtotal: subtotal + product.setupFee, optionModifiers };
  };

  const pricing = calculatePrice();

  const handleAddToCart = () => {
    const item = {
      id: uuidv4(),
      product,
      quantity,
      selectedOptions: { ...selectedOptions },
      unitPrice: pricing.unitPrice,
      totalPrice: pricing.subtotal,
    };
    addToCart(item);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <Link to="/" className="hover:text-brand-600 transition-smooth">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/catalog" className="hover:text-brand-600 transition-smooth">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/catalog/${product.category}`} className="hover:text-brand-600 transition-smooth capitalize">{product.category.replace('-', ' ')}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden cursor-zoom-in group" onClick={() => setShowZoom(true)}>
            <img src={product.gallery[selectedImage]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <button className="absolute bottom-4 right-4 w-11 h-11 glass rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth shadow-lg">
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`aspect-square rounded-xl overflow-hidden transition-smooth ring-2 ${i === selectedImage ? 'ring-brand-600 shadow-lg shadow-brand-600/20' : 'ring-transparent hover:ring-gray-200'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            {product.bestseller && <Badge variant="premium">⭐ Bestseller</Badge>}
            <Badge>{product.category.replace('-', ' ')}</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Price Display - Glassmorphism */}
          <div className="glass rounded-2xl p-5 mb-6 shadow-sm">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-gray-900">${pricing.subtotal.toFixed(2)}</span>
              <span className="text-sm text-gray-400 font-medium">(${pricing.unitPrice.toFixed(2)}/ea)</span>
            </div>
            {product.setupFee > 0 && <p className="text-sm text-gray-500 mt-1">+ ${product.setupFee.toFixed(2)} one-time setup fee</p>}
            <div className="flex items-center gap-2 mt-2 text-green-600 text-sm font-medium">
              <Truck className="w-4 h-4" /> Free shipping on orders over $75
            </div>
          </div>

          {/* Options */}
          <div className="space-y-5 mb-6">
            {product.options.map(option => (
              <div key={option.id}>
                <label className="block text-sm font-semibold text-gray-900 mb-2.5">
                  {option.name}
                </label>
                {option.type === 'select' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {option.values.map(val => (
                      <button
                        key={val.id}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.id]: val.value }))}
                        className={`text-left px-4 py-3 rounded-xl border-2 text-sm transition-smooth ${selectedOptions[option.id] === val.value ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm shadow-brand-600/10' : 'border-gray-100 hover:border-gray-200 text-gray-700 bg-white'}`}
                      >
                        <span className="font-medium">{val.label}</span>
                        {val.priceModifier !== 0 && <span className="text-xs text-gray-400 ml-1.5">({val.priceModifier > 0 ? '+' : ''}${val.priceModifier})</span>}
                      </button>
                    ))}
                  </div>
                )}
                {option.type === 'radio' && (
                  <div className="flex flex-wrap gap-2">
                    {option.values.map(val => (
                      <button
                        key={val.id}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.id]: val.value }))}
                        className={`px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-smooth ${selectedOptions[option.id] === val.value ? 'border-brand-600 bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'border-gray-100 hover:border-gray-200 text-gray-700 bg-white'}`}
                      >
                        {val.label}
                        {val.priceModifier !== 0 && <span className="ml-1 opacity-70">({val.priceModifier > 0 ? '+' : ''}${val.priceModifier})</span>}
                      </button>
                    ))}
                  </div>
                )}
                {option.type === 'color' && (
                  <div className="flex flex-wrap gap-3">
                    {option.values.map(val => (
                      <button
                        key={val.id}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.id]: val.value }))}
                        className={`w-10 h-10 rounded-full border-2 transition-smooth ${selectedOptions[option.id] === val.value ? 'border-brand-600 ring-4 ring-brand-100 scale-110' : 'border-gray-200 hover:scale-105'}`}
                        style={{ backgroundColor: val.value }}
                        title={val.label}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2.5">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center glass rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(product.minQuantity, q - (product.minQuantity > 1 ? 25 : 1)))} className="px-3.5 py-2.5 hover:bg-brand-50 transition-smooth"><Minus className="w-4 h-4 text-gray-600" /></button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(product.minQuantity, Math.min(product.maxQuantity, parseInt(e.target.value) || product.minQuantity)))} className="w-20 text-center py-2.5 text-sm font-semibold bg-transparent focus:outline-none" />
                <button onClick={() => setQuantity(q => Math.min(product.maxQuantity, q + (product.minQuantity > 1 ? 25 : 1)))} className="px-3.5 py-2.5 hover:bg-brand-50 transition-smooth"><Plus className="w-4 h-4 text-gray-600" /></button>
              </div>
              <span className="text-sm text-gray-400">Min: {product.minQuantity}</span>
            </div>
            {/* Quantity Breaks */}
            <div className="mt-4 glass rounded-xl p-3 overflow-x-auto">
              <table className="text-xs w-full">
                <thead>
                  <tr className="text-gray-400">
                    {product.quantityBreaks.map((b, i) => <th key={i} className="px-3 py-1.5 text-center font-medium">{b.minQty}+</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-bold text-gray-900">
                    {product.quantityBreaks.map((b, i) => <td key={i} className="px-3 py-1.5 text-center">${b.unitPrice.toFixed(2)}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-white transition-all text-base ${addedToCart ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg shadow-brand-600/30 hover:shadow-brand-600/40'}`}
            >
              {addedToCart ? <><Check className="w-5 h-5" /> Added to Cart!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
            </button>
            <button onClick={() => toggleFavorite(product.id)} className={`px-4 py-4 rounded-xl border-2 transition-smooth ${favorites.includes(product.id) ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-100 hover:border-gray-200 text-gray-400 hover:text-red-400'}`}>
              <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Design Options - Glassmorphism */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link to={`/editor/${product.id}`} className="flex items-center gap-3 p-4 glass rounded-xl hover:shadow-md transition-smooth group">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-smooth">
                <Palette className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Design Online</div>
                <div className="text-xs text-gray-400">Use our editor</div>
              </div>
            </Link>
            <button className="flex items-center gap-3 p-4 glass rounded-xl hover:shadow-md transition-smooth group">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-smooth">
                <Upload className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Upload Design</div>
                <div className="text-xs text-gray-400">PDF, PNG, JPG</div>
              </div>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-5 border-t border-gray-100">
            {[
              { icon: Truck, label: `${product.deliveryDays} day delivery` },
              { icon: Shield, label: 'Quality guaranteed' },
              { icon: RotateCcw, label: 'Easy returns' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                <item.icon className="w-5 h-5 text-brand-500" />
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-gray-100 mb-8">
          {(['description', 'specs', 'reviews', 'faq'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-smooth capitalize -mb-px ${activeTab === tab ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
              {tab === 'faq' ? 'FAQ' : tab}
            </button>
          ))}
        </div>
        <div className="max-w-3xl">
          {activeTab === 'description' && (
            <div className="prose text-gray-600 leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>Our {product.name.toLowerCase()} are printed using state-of-the-art digital and offset printing technology, ensuring vibrant colors and sharp details on every piece. Each order goes through rigorous quality control before shipping.</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="glass rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {[
                  { label: 'Print Method', value: 'Digital / Offset' },
                  { label: 'Color Mode', value: 'CMYK Full Color' },
                  { label: 'Resolution', value: '300 DPI minimum' },
                  { label: 'File Formats', value: 'PDF, PNG, JPG, TIFF' },
                  { label: 'Bleed', value: '0.125" on all sides' },
                  { label: 'Turnaround', value: `${product.deliveryDays} business days` },
                  { label: 'Min Order', value: `${product.minQuantity} units` },
                  { label: 'Max Order', value: `${product.maxQuantity.toLocaleString()} units` },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-400">{spec.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {[
                { name: 'Alex J.', rating: 5, text: 'Excellent quality! The colors are vibrant and the paper feels premium.', date: '2024-12-10' },
                { name: 'Maria S.', rating: 5, text: 'Fast delivery and perfect printing. Will order again.', date: '2024-12-05' },
                { name: 'Tom R.', rating: 4, text: 'Great product overall. Slight color variation from screen but still very happy.', date: '2024-11-28' },
              ].map((review, i) => (
                <GlassCard key={i} className="p-5" hover={false}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}</div>
                    <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                    <span className="text-xs text-gray-300">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                </GlassCard>
              ))}
            </div>
          )}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              {[
                { q: 'What file format should I upload?', a: 'We accept PDF, PNG, JPG, and TIFF files. For best results, use PDF with embedded fonts and 300 DPI resolution.' },
                { q: 'How do I know my design will print correctly?', a: 'Our design editor includes bleed guides, safe areas, and a print preview. You can also order a proof before full production.' },
                { q: 'What is your turnaround time?', a: `Standard turnaround for this product is ${product.deliveryDays} business days. Rush options may be available at checkout.` },
                { q: 'Can I order a sample first?', a: 'Yes! Contact our support team to request a sample pack or a digital proof of your design.' },
              ].map((faq, i) => (
                <details key={i} className="group glass rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:text-brand-600 transition-smooth">
                    {faq.q}
                    <span className="text-gray-300 group-open:rotate-180 transition-transform ml-4">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group glass-card rounded-2xl overflow-hidden">
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-smooth line-clamp-2">{p.name}</h3>
                  <p className="text-sm font-bold text-gray-900 mt-2">From ${p.basePrice.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowZoom(false)}>
          <img src={product.gallery[selectedImage]} alt={product.name} className="max-w-full max-h-full object-contain rounded-lg" />
          <button className="absolute top-6 right-6 w-11 h-11 glass-dark rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-smooth" onClick={() => setShowZoom(false)}>✕</button>
        </div>
      )}
    </div>
  );
}
