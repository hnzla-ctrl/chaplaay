import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { useState } from 'react';
import { GlassCard, Badge, Button } from '../components/ui';

export function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, appliedCoupon, applyCoupon, removeCoupon } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const totals = getCartTotal();

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) { setCouponError(''); setCouponCode(''); }
    else setCouponError('Invalid coupon code');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-premium">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any items yet. Start exploring our premium products.</p>
        <Link to="/catalog" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 text-white px-7 py-3.5 rounded-xl font-bold hover:from-brand-700 hover:to-brand-800 transition-smooth shadow-lg shadow-brand-600/20">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <Badge>{cart.length} {cart.length === 1 ? 'item' : 'items'}</Badge>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="glass-card rounded-2xl p-5 flex gap-5">
              <Link to={`/product/${item.product.slug}`} className="shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-sm" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link to={`/product/${item.product.slug}`} className="font-semibold text-gray-900 hover:text-brand-600 transition-smooth">{item.product.name}</Link>
                    <div className="mt-1.5 space-y-0.5">
                      {Object.entries(item.selectedOptions).map(([key, value]) => {
                        const option = item.product.options.find(o => o.id === key);
                        const optionValue = option?.values.find(v => v.value === value);
                        return optionValue ? <p key={key} className="text-xs text-gray-400">{option?.name}: <span className="text-gray-600">{optionValue.label}</span></p> : null;
                      })}
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-smooth shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center glass rounded-lg overflow-hidden">
                    <button onClick={() => updateCartQuantity(item.id, Math.max(item.product.minQuantity, item.quantity - (item.product.minQuantity > 1 ? 25 : 1)))} className="px-2.5 py-1.5 hover:bg-brand-50 transition-smooth"><Minus className="w-3.5 h-3.5 text-gray-500" /></button>
                    <span className="px-3 py-1.5 text-sm font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + (item.product.minQuantity > 1 ? 25 : 1))} className="px-2.5 py-1.5 hover:bg-brand-50 transition-smooth"><Plus className="w-3.5 h-3.5 text-gray-500" /></button>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 text-lg">${item.totalPrice.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">${item.unitPrice.toFixed(2)}/ea</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary - Glassmorphism */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl p-6 sticky top-24 shadow-premium">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>
            
            {/* Coupon */}
            <div className="mb-5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">{appliedCoupon} (-{useStore.getState().discount}%)</span>
                  </div>
                  <button onClick={removeCoupon} className="text-green-600 hover:text-green-700 text-xs font-medium">Remove</button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon code" className="flex-1 px-3 py-2.5 glass-input rounded-xl text-sm focus:outline-none" />
                    <button onClick={handleApplyCoupon} className="px-4 py-2.5 bg-surface-900 text-white rounded-xl text-sm font-semibold hover:bg-surface-800 transition-smooth">Apply</button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
                  <p className="text-[11px] text-gray-400 mt-1.5">Try: WELCOME10, SAVE20, PRINT15</p>
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm border-t border-gray-100 pt-5">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">${totals.subtotal.toFixed(2)}</span></div>
              {totals.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span className="font-semibold">-${totals.discount.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-semibold">{totals.shipping === 0 ? <span className="text-green-600">Free</span> : `$${totals.shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax (est.)</span><span className="font-semibold">${totals.tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-bold border-t border-gray-100 pt-4">
                <span>Total</span>
                <span className="gradient-text">${totals.total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full text-center bg-gradient-to-r from-brand-600 to-brand-700 text-white py-4 rounded-xl font-bold hover:from-brand-700 hover:to-brand-800 transition-smooth shadow-lg shadow-brand-600/20 mt-6">
              Proceed to Checkout
            </Link>
            <Link to="/catalog" className="block text-center text-sm text-brand-600 font-semibold mt-3 hover:text-brand-700 transition-smooth">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
