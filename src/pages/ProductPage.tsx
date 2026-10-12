import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ChevronRight, Truck, Shield, RotateCcw, Check, ZoomIn, Minus, Plus, Upload, Palette } from 'lucide-react';
import { products } from '../data';
import { useStore } from '../store';
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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
        <Link to="/catalog" className="text-brand-600 font-medium">Browse all products →</Link>
      </div>
    );
  }

  // Initialize default options
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
    const setupFee = product.setupFee;
    return { unitPrice: unitPrice + (setupFee / quantity), subtotal: subtotal + setupFee, optionModifiers, setupFee };
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
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/catalog" className="hover:text-brand-600">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/catalog/${product.category}`} className="hover:text-brand-600 capitalize">{product.category.replace('-', ' ')}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 cursor-zoom-in" onClick={() => setShowZoom(true)}>
            <img src={product.gallery[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50">
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-brand-600' : 'border-transparent hover:border-gray-300'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.bestseller && <span className="bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Bestseller</span>}
            <span className="text-sm text-gray-500 capitalize">{product.category.replace('-', ' ')}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}
            </div>
            <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Price Display */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">${pricing.subtotal.toFixed(2)}</span>
              <span className="text-sm text-gray-500">(${pricing.unitPrice.toFixed(2)}/ea)</span>
            </div>
            {pricing.setupFee > 0 && <p className="text-sm text-gray-500 mt-1">+ ${pricing.setupFee.toFixed(2)} one-time setup fee</p>}
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1"><Truck className="w-4 h-4" /> Free shipping on orders over $75</p>
          </div>

          {/* Options */}
          <div className="space-y-5 mb-6">
            {product.options.map(option => (
              <div key={option.id}>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {option.name} {option.required && <span className="text-red-500">*</span>}
                </label>
                {option.type === 'select' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {option.values.map(val => (
                      <button
                        key={val.id}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.id]: val.value }))}
                        className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${selectedOptions[option.id] === val.value ? 'border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
                      >
                        <span className="font-medium">{val.label}</span>
                        {val.priceModifier !== 0 && <span className="text-xs text-gray-500 ml-1">({val.priceModifier > 0 ? '+' : ''}${val.priceModifier})</span>}
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
                        className={`px-4 py-2 rounded-full border text-sm transition-all ${selectedOptions[option.id] === val.value ? 'border-brand-600 bg-brand-600 text-white' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
                      >
                        {val.label}
                        {val.priceModifier !== 0 && <span className="ml-1 opacity-75">({val.priceModifier > 0 ? '+' : ''}${val.priceModifier})</span>}
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
                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedOptions[option.id] === val.value ? 'border-brand-600 ring-2 ring-brand-200' : 'border-gray-200'}`}
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
            <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(product.minQuantity, q - (product.minQuantity > 1 ? 25 : 1)))} className="px-3 py-2 hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(product.minQuantity, Math.min(product.maxQuantity, parseInt(e.target.value) || product.minQuantity)))} className="w-20 text-center py-2 border-x focus:outline-none" />
                <button onClick={() => setQuantity(q => Math.min(product.maxQuantity, q + (product.minQuantity > 1 ? 25 : 1)))} className="px-3 py-2 hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
              </div>
              <span className="text-sm text-gray-500">Min: {product.minQuantity}</span>
            </div>
            {/* Quantity Breaks */}
            <div className="mt-3 overflow-x-auto">
              <table className="text-xs w-full">
                <thead>
                  <tr className="text-gray-500">
                    {product.quantityBreaks.map((b, i) => <th key={i} className="px-2 py-1 text-center font-normal">{b.minQty}+{b.maxQty < 9999 ? `-${b.maxQty}` : ''}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-semibold text-gray-900">
                    {product.quantityBreaks.map((b, i) => <td key={i} className="px-2 py-1 text-center">${b.unitPrice.toFixed(2)}/ea</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all ${addedToCart ? 'bg-green-500' : 'bg-brand-600 hover:bg-brand-700'}`}
            >
              {addedToCart ? <><Check className="w-5 h-5" /> Added!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
            </button>
            <button onClick={() => toggleFavorite(product.id)} className={`px-4 py-3.5 rounded-xl border-2 transition-all ${favorites.includes(product.id) ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
              <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Design Options */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link to={`/editor/${product.id}`} className="flex items-center gap-2 p-3 border rounded-xl hover:border-brand-300 hover:bg-brand-50 transition-colors">
              <Palette className="w-5 h-5 text-brand-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Design Online</div>
                <div className="text-xs text-gray-500">Use our editor</div>
              </div>
            </Link>
            <button className="flex items-center gap-2 p-3 border rounded-xl hover:border-brand-300 hover:bg-brand-50 transition-colors">
              <Upload className="w-5 h-5 text-brand-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Upload Design</div>
                <div className="text-xs text-gray-500">PDF, PNG, JPG</div>
              </div>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-5 h-5 text-brand-600 mb-1" />
              <span className="text-xs text-gray-600">Delivery in {product.deliveryDays} days</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-5 h-5 text-brand-600 mb-1" />
              <span className="text-xs text-gray-600">Quality guaranteed</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="w-5 h-5 text-brand-600 mb-1" />
              <span className="text-xs text-gray-600">Easy returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-6 border-b">
          {(['description', 'specs', 'reviews', 'faq'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab === 'faq' ? 'FAQ' : tab}
            </button>
          ))}
        </div>
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none text-gray-600">
              <p>{product.description}</p>
              <p className="mt-4">Our {product.name.toLowerCase()} are printed using state-of-the-art digital and offset printing technology, ensuring vibrant colors and sharp details on every piece. Each order goes through rigorous quality control before shipping.</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{spec.label}</span>
                  <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {[
                { name: 'Alex J.', rating: 5, text: 'Excellent quality! The colors are vibrant and the paper feels premium.', date: '2024-12-10' },
                { name: 'Maria S.', rating: 5, text: 'Fast delivery and perfect printing. Will order again.', date: '2024-12-05' },
                { name: 'Tom R.', rating: 4, text: 'Great product overall. Slight color variation from screen but still very happy.', date: '2024-11-28' },
              ].map((review, i) => (
                <div key={i} className="p-4 border rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}</div>
                    <span className="text-sm font-medium text-gray-900">{review.name}</span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {[
                { q: 'What file format should I upload?', a: 'We accept PDF, PNG, JPG, and TIFF files. For best results, use PDF with embedded fonts and 300 DPI resolution.' },
                { q: 'How do I know my design will print correctly?', a: 'Our design editor includes bleed guides, safe areas, and a print preview. You can also order a proof before full production.' },
                { q: 'What is your turnaround time?', a: `Standard turnaround for this product is ${product.deliveryDays} business days. Rush options may be available at checkout.` },
                { q: 'Can I order a sample first?', a: 'Yes! Contact our support team to request a sample pack or a digital proof of your design.' },
              ].map((faq, i) => (
                <details key={i} className="group border rounded-xl">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 hover:text-brand-600">
                    {faq.q}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600">{faq.a}</div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group bg-white rounded-xl border hover:shadow-lg transition-all overflow-hidden">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-brand-600 line-clamp-2">{p.name}</h3>
                  <p className="text-sm font-bold text-gray-900 mt-1">From ${p.basePrice.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowZoom(false)}>
          <img src={product.gallery[selectedImage]} alt={product.name} className="max-w-full max-h-full object-contain" />
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center" onClick={() => setShowZoom(false)}>✕</button>
        </div>
      )}
    </div>
  );
}
