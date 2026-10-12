import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../store';
import { useState } from 'react';

export function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, appliedCoupon, applyCoupon, removeCoupon } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const totals = getCartTotal();

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items yet.</p>
        <Link to="/catalog" className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-xl border p-4 sm:p-6 flex gap-4">
              <Link to={`/product/${item.product.slug}`} className="shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link to={`/product/${item.product.slug}`} className="font-semibold text-gray-900 hover:text-brand-600">{item.product.name}</Link>
                    <div className="mt-1 space-y-0.5">
                      {Object.entries(item.selectedOptions).map(([key, value]) => {
                        const option = item.product.options.find(o => o.id === key);
                        const optionValue = option?.values.find(v => v.value === value);
                        return optionValue ? (
                          <p key={key} className="text-xs text-gray-500">{option?.name}: {optionValue.label}</p>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateCartQuantity(item.id, Math.max(item.product.minQuantity, item.quantity - (item.product.minQuantity > 1 ? 25 : 1)))} className="px-2.5 py-1.5 hover:bg-gray-50">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-medium min-w-[3rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + (item.product.minQuantity > 1 ? 25 : 1))} className="px-2.5 py-1.5 hover:bg-gray-50">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${item.totalPrice.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">${item.unitPrice.toFixed(2)}/ea</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Coupon */}
            <div className="mb-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">{appliedCoupon} ({useStore.getState().discount}% off)</span>
                  </div>
                  <button onClick={removeCoupon} className="text-green-600 hover:text-green-700 text-sm">Remove</button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon code" className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    <button onClick={handleApplyCoupon} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">Apply</button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                  <p className="text-xs text-gray-500 mt-1">Try: WELCOME10, SAVE20, PRINT15</p>
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{totals.shipping === 0 ? <span className="text-green-600">Free</span> : `$${totals.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (est.)</span>
                <span className="font-medium">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full text-center bg-brand-600 text-white py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors mt-6">
              Proceed to Checkout
            </Link>
            <Link to="/catalog" className="block text-center text-sm text-brand-600 font-medium mt-3 hover:text-brand-700">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
