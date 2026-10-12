import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, ChevronRight, Check, Truck } from 'lucide-react';
import { useStore } from '../store';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, isAuthenticated, user, placeOrder } = useStore();
  const totals = getCartTotal();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    shippingMethod: 'standard',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });
  const [processing, setProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <Link to="/catalog" className="text-brand-600 font-medium">Continue shopping →</Link>
      </div>
    );
  }

  const updateField = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const shippingCost = formData.shippingMethod === 'express' ? 19.99 : formData.shippingMethod === 'rush' ? 34.99 : totals.shipping;

  const handleSubmit = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    const orderId = placeOrder({
      id: 'a1',
      label: 'Shipping',
      name: `${formData.firstName} ${formData.lastName}`,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country,
      isDefault: true,
    });
    navigate(`/order-confirmation/${orderId}`);
  };

  const steps = ['Contact & Shipping', 'Payment', 'Review'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/cart" className="hover:text-brand-600">Cart</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium">Checkout</span>
      </nav>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-10">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-brand-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i + 1 <= step ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`w-12 sm:w-20 h-0.5 mx-2 ${i + 1 < step ? 'bg-brand-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact & Shipping Information</h2>
              
              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Checking out as guest</p>
                  <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="Email address" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                <input type="text" value={formData.street} onChange={(e) => updateField('street', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" value={formData.city} onChange={(e) => updateField('city', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input type="text" value={formData.state} onChange={(e) => updateField('state', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP *</label>
                  <input type="text" value={formData.zip} onChange={(e) => updateField('zip', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">Shipping Method</h3>
              <div className="space-y-3 mb-6">
                {[
                  { id: 'standard', label: 'Standard Shipping', desc: '5-7 business days', price: totals.shipping === 0 ? 'Free' : '$9.99' },
                  { id: 'express', label: 'Express Shipping', desc: '2-3 business days', price: '$19.99' },
                  { id: 'rush', label: 'Rush Production', desc: '1-2 business days', price: '$34.99' },
                ].map(method => (
                  <label key={method.id} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${formData.shippingMethod === method.id ? 'border-brand-600 bg-brand-50' : 'hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" value={method.id} checked={formData.shippingMethod === method.id} onChange={(e) => updateField('shippingMethod', e.target.value)} className="accent-brand-600" />
                      <div>
                        <div className="font-medium text-gray-900">{method.label}</div>
                        <div className="text-sm text-gray-500">{method.desc}</div>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">{method.price}</span>
                  </label>
                ))}
              </div>

              <button onClick={() => setStep(2)} className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
              <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Your payment information is encrypted and secure</span>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                <input type="text" value={formData.cardName} onChange={(e) => updateField('cardName', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="John Doe" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                <div className="relative">
                  <input type="text" value={formData.cardNumber} onChange={(e) => updateField('cardNumber', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 pr-12" placeholder="4242 4242 4242 4242" maxLength={19} />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry *</label>
                  <input type="text" value={formData.cardExpiry} onChange={(e) => updateField('cardExpiry', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="MM/YY" maxLength={5} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC *</label>
                  <input type="text" value={formData.cardCvc} onChange={(e) => updateField('cardCvc', e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="123" maxLength={4} />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 border rounded-xl font-medium text-gray-700 hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">Review Order</button>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">This is a demo. Use card number 4242 4242 4242 4242 for testing.</p>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-1">Shipping Address</h3>
                  <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                  <p className="text-sm text-gray-600">{formData.street}</p>
                  <p className="text-sm text-gray-600">{formData.city}, {formData.state} {formData.zip}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-1">Payment</h3>
                  <p className="text-sm text-gray-600">Card ending in {formData.cardNumber.slice(-4) || '****'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Items ({cart.length})</h3>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span className="text-gray-600">{item.product.name} × {item.quantity}</span>
                      <span className="font-medium">${item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-3 border rounded-xl font-medium text-gray-700 hover:bg-gray-50">Back</button>
                <button onClick={handleSubmit} disabled={processing} className="flex-1 bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {processing ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                  ) : (
                    <><Lock className="w-4 h-4" /> Place Order — ${totals.total.toFixed(2)}</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-auto">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.product.image} alt="" className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
              {totals.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-${totals.discount.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Tax</span><span>${totals.tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span>${(totals.total + (shippingCost - totals.shipping)).toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
