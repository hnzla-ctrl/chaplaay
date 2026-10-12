import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, Users, ShoppingCart, FileText, Settings, Tag, MessageSquare, TrendingUp, DollarSign, Eye, Edit, Trash2, Plus, ChevronDown, Search } from 'lucide-react';
import { useStore } from '../store';
import { products, categories } from '../data';

export function AdminPage() {
  const { user, isAuthenticated, orders } = useStore();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
        <p className="text-gray-600 mb-4">Please sign in with an admin account to access this page.</p>
        <Link to="/account" className="text-brand-600 font-medium">Sign in →</Link>
        <p className="text-xs text-gray-400 mt-4">Hint: Sign in with admin@printcraft.com</p>
      </div>
    );
  }

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Mock admin data
  const stats = [
    { label: 'Total Revenue', value: '$48,295', change: '+12.5%', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Orders', value: '284', change: '+8.2%', icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
    { label: 'Customers', value: '1,429', change: '+5.1%', icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 shrink-0 hidden lg:block">
        <div className="mb-6">
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-400">PrintCraft Pro</p>
        </div>
        <nav className="space-y-1">
          {sections.map(section => (
            <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeSection === section.id ? 'bg-brand-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <section.icon className="w-4 h-4" /> {section.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-800 mt-8">
          <Link to="/" className="text-sm text-gray-400 hover:text-white">← Back to Store</Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile nav */}
        <div className="lg:hidden border-b p-3 overflow-x-auto">
          <div className="flex gap-2">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${activeSection === s.id ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s.label}</button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeSection === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl border p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl border">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Recent Orders</h2>
                  <button onClick={() => setActiveSection('orders')} className="text-sm text-brand-600 font-medium">View all →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Order ID</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Customer</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Total</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{order.id}</td>
                          <td className="px-4 py-3">{order.shippingAddress?.name || 'Guest'}</td>
                          <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">{order.status}</span></td>
                          <td className="px-4 py-3 font-medium">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      )) : (
                        <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No orders yet. Orders will appear here when customers place them.</td></tr>
                      )}
                      {/* Mock orders for demo */}
                      {[
                        { id: 'ORD-A1B2C3', customer: 'Sarah M.', status: 'shipped', total: 124.99, date: '2024-12-15' },
                        { id: 'ORD-D4E5F6', customer: 'James K.', status: 'processing', total: 89.50, date: '2024-12-14' },
                        { id: 'ORD-G7H8I9', customer: 'Emily R.', status: 'paid', total: 234.00, date: '2024-12-14' },
                        { id: 'ORD-J0K1L2', customer: 'Michael T.', status: 'delivered', total: 67.80, date: '2024-12-13' },
                      ].map(order => (
                        <tr key={order.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{order.id}</td>
                          <td className="px-4 py-3">{order.customer}</td>
                          <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : order.status === 'processing' ? 'bg-amber-100 text-amber-700' : order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{order.status}</span></td>
                          <td className="px-4 py-3 font-medium">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-3 text-gray-500">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sales Chart Placeholder */}
              <div className="mt-6 bg-white rounded-xl border p-6">
                <h2 className="font-bold text-gray-900 mb-4">Sales Overview (Last 7 Days)</h2>
                <div className="flex items-end gap-2 h-40">
                  {[65, 45, 78, 52, 89, 72, 95].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-brand-500 rounded-t" style={{ height: `${val}%` }}></div>
                      <span className="text-xs text-gray-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border rounded-lg text-sm">
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Order</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Customer</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Items</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Total</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{order.id}</td>
                        <td className="px-4 py-3">{order.shippingAddress?.name || 'Guest'}</td>
                        <td className="px-4 py-3">{order.items.length} items</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">{order.status}</span></td>
                        <td className="px-4 py-3 font-medium">${order.total.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-gray-100 rounded"><Eye className="w-3.5 h-3.5 text-gray-500" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded"><Edit className="w-3.5 h-3.5 text-gray-500" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No orders found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700"><Plus className="w-4 h-4" /> Add Product</button>
              </div>
              <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Price</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Rating</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 capitalize">{product.category.replace('-', ' ')}</td>
                        <td className="px-4 py-3 font-medium">${product.basePrice.toFixed(2)}</td>
                        <td className="px-4 py-3">⭐ {product.rating}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-gray-100 rounded"><Edit className="w-3.5 h-3.5 text-gray-500" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'customers' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>
              <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Orders</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Total Spent</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Sarah Mitchell', email: 'sarah@example.com', orders: 12, spent: '$1,245.80', joined: '2024-03-15' },
                      { name: 'James Kim', email: 'james@example.com', orders: 8, spent: '$892.40', joined: '2024-05-22' },
                      { name: 'Emily Rodriguez', email: 'emily@example.com', orders: 5, spent: '$456.20', joined: '2024-07-10' },
                      { name: 'Michael Thompson', email: 'michael@example.com', orders: 15, spent: '$2,103.00', joined: '2024-01-08' },
                      { name: 'Lisa Park', email: 'lisa@example.com', orders: 3, spent: '$234.60', joined: '2024-09-30' },
                    ].map((customer, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{customer.name}</td>
                        <td className="px-4 py-3 text-gray-600">{customer.email}</td>
                        <td className="px-4 py-3">{customer.orders}</td>
                        <td className="px-4 py-3 font-medium">{customer.spent}</td>
                        <td className="px-4 py-3 text-gray-500">{customer.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'templates' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Template Management</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700"><Plus className="w-4 h-4" /> Add Template</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 6).map(p => (
                  <div key={p.id} className="bg-white rounded-xl border overflow-hidden">
                    <img src={p.image} alt="" className="w-full aspect-video object-cover" />
                    <div className="p-3">
                      <h3 className="font-medium text-sm">{p.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Active</span>
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-gray-100 rounded"><Edit className="w-3.5 h-3.5 text-gray-500" /></button>
                          <button className="p-1 hover:bg-gray-100 rounded"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'promotions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Coupons & Promotions</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700"><Plus className="w-4 h-4" /> Create Coupon</button>
              </div>
              <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Code</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Discount</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Uses</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { code: 'WELCOME10', discount: '10% off', uses: '234/∞', status: 'Active' },
                      { code: 'SAVE20', discount: '20% off', uses: '56/100', status: 'Active' },
                      { code: 'PRINT15', discount: '15% off', uses: '89/∞', status: 'Active' },
                      { code: 'SUMMER25', discount: '25% off', uses: '200/200', status: 'Expired' },
                    ].map((coupon, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono font-medium">{coupon.code}</td>
                        <td className="px-4 py-3">{coupon.discount}</td>
                        <td className="px-4 py-3 text-gray-600">{coupon.uses}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${coupon.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{coupon.status}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-gray-100 rounded"><Edit className="w-3.5 h-3.5 text-gray-500" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'support' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Support Tickets</h1>
              <div className="space-y-3">
                {[
                  { id: 'TK-001', subject: 'File upload not working', customer: 'Sarah M.', status: 'Open', priority: 'High', time: '2 hours ago' },
                  { id: 'TK-002', subject: 'Request for refund on order #ORD-A1B2C3', customer: 'James K.', status: 'In Progress', priority: 'Medium', time: '5 hours ago' },
                  { id: 'TK-003', subject: 'Question about paper stock options', customer: 'Emily R.', status: 'Open', priority: 'Low', time: '1 day ago' },
                  { id: 'TK-004', subject: 'Design approval needed for business cards', customer: 'Michael T.', status: 'Resolved', priority: 'Medium', time: '2 days ago' },
                ].map(ticket => (
                  <div key={ticket.id} className="bg-white rounded-xl border p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${ticket.status === 'Open' ? 'bg-red-500' : ticket.status === 'In Progress' ? 'bg-amber-500' : 'bg-green-500'}`} />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{ticket.subject}</div>
                        <div className="text-xs text-gray-500">{ticket.id} · {ticket.customer} · {ticket.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${ticket.priority === 'High' ? 'bg-red-50 text-red-600' : ticket.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-600'}`}>{ticket.priority}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${ticket.status === 'Open' ? 'bg-red-50 text-red-600' : ticket.status === 'In Progress' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>{ticket.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Store Settings</h1>
              <div className="space-y-6">
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="font-bold text-gray-900 mb-4">General</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                      <input type="text" defaultValue="PrintCraft Pro" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                      <input type="email" defaultValue="support@printcraftpro.com" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="font-bold text-gray-900 mb-4">Shipping</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold</label>
                      <input type="number" defaultValue="75" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping Rate</label>
                      <input type="number" defaultValue="9.99" step="0.01" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700">Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
