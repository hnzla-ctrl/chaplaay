import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, Download } from 'lucide-react';
import { useStore } from '../store';

export function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useStore();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
        <Link to="/" className="text-brand-600 font-medium">Go to homepage →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your order. We've sent a confirmation email with your order details.</p>
        <p className="text-sm text-gray-500 mt-2">Order #{order.id}</p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Order Status</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"><CheckCircle className="w-5 h-5 text-white" /></div>
            <span className="font-medium">Order Placed</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center"><Package className="w-5 h-5 text-white" /></div>
            <span className="font-medium text-brand-600">Processing</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><Truck className="w-5 h-5" /></div>
            <span className="font-medium">Shipping</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
            <span className="font-medium">Delivered</span>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Order Details</h2>
        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.id} className="flex gap-4 py-3 border-b last:border-0">
              <img src={item.product.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(item.selectedOptions).map(([key, value]) => {
                    const opt = item.product.options.find(o => o.id === key);
                    const val = opt?.values.find(v => v.value === value);
                    return val ? <span key={key} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{opt?.name}: {val.label}</span> : null;
                  })}
                </div>
              </div>
              <span className="font-semibold">${item.totalPrice.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-${order.discount.toFixed(2)}</span></div>}
          <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Tax</span><span>${order.tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white rounded-xl border p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-3">Estimated Delivery</h2>
        <p className="text-gray-600">Your order is expected to arrive by <strong>{new Date(order.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong></p>
        <p className="text-sm text-gray-500 mt-2">We'll send you tracking information once your order ships.</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/account" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors">
          View My Orders
        </Link>
        <Link to="/catalog" className="inline-flex items-center justify-center gap-2 px-6 py-3 border rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
