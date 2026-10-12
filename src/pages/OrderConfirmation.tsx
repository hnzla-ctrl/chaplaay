import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import { useStore } from '../store';
import { Badge, GlassCard } from '../components/ui';

export function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useStore();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
        <Link to="/" className="text-brand-600 font-semibold">Go to homepage →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/20 animate-fade-in-up">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 animate-fade-in-up stagger-1">Order Confirmed!</h1>
        <p className="text-gray-500 animate-fade-in-up stagger-2">Thank you for your order. We've sent a confirmation email with your order details.</p>
        <p className="text-sm text-gray-400 mt-2 animate-fade-in-up stagger-3">Order #{order.id}</p>
      </div>

      {/* Timeline */}
      <div className="glass rounded-2xl p-6 mb-6 shadow-premium animate-fade-in-up stagger-3">
        <h2 className="font-bold text-gray-900 mb-5">Order Status</h2>
        <div className="flex items-center gap-2 sm:gap-4">
          {[
            { icon: CheckCircle, label: 'Placed', active: true, done: true },
            { icon: Package, label: 'Processing', active: true, done: false },
            { icon: Truck, label: 'Shipping', active: false, done: false },
            { icon: MapPin, label: 'Delivered', active: false, done: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-green-500' : step.active ? 'bg-brand-600 shadow-lg shadow-brand-600/20' : 'bg-gray-100'}`}>
                <step.icon className={`w-4 h-4 ${step.done || step.active ? 'text-white' : 'text-gray-300'}`} />
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step.active ? 'text-brand-600' : step.done ? 'text-green-600' : 'text-gray-300'}`}>{step.label}</span>
              {i < 3 && <div className={`flex-1 h-0.5 rounded-full ${step.done ? 'bg-green-400' : 'bg-gray-100'}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Order Details */}
      <div className="glass rounded-2xl p-6 mb-6 shadow-premium">
        <h2 className="font-bold text-gray-900 mb-4">Order Details</h2>
        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.id} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
              <img src={item.product.image} alt="" className="w-16 h-16 rounded-xl object-cover shadow-sm" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{item.product.name}</h3>
                <p className="text-xs text-gray-400">Quantity: {item.quantity}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(item.selectedOptions).map(([key, value]) => {
                    const opt = item.product.options.find(o => o.id === key);
                    const val = opt?.values.find(v => v.value === value);
                    return val ? <span key={key} className="text-[10px] glass px-2 py-0.5 rounded-full">{opt?.name}: {val.label}</span> : null;
                  })}
                </div>
              </div>
              <span className="font-bold text-sm">${item.totalPrice.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-medium">${order.subtotal.toFixed(2)}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-${order.discount.toFixed(2)}</span></div>}
          <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-medium">{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Tax</span><span className="font-medium">${order.tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
            <span>Total</span>
            <span className="gradient-text">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="glass rounded-2xl p-6 mb-8 shadow-premium">
        <h2 className="font-bold text-gray-900 mb-2">Estimated Delivery</h2>
        <p className="text-gray-600">Expected by <strong className="text-brand-600">{new Date(order.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong></p>
        <p className="text-sm text-gray-400 mt-1">We'll send tracking information once your order ships.</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/account" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl font-bold hover:from-brand-700 hover:to-brand-800 transition-smooth shadow-lg shadow-brand-600/20">
          View My Orders
        </Link>
        <Link to="/catalog" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 glass rounded-xl font-semibold text-gray-700 hover:shadow-sm transition-smooth">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
