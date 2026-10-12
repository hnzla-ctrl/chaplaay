import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, MapPin, FileText, Clock, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { products as allProducts } from '../data';

export function AccountPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { user, isAuthenticated, login, logout, orders, projects, favorites, deleteProject } = useStore();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">{isRegister ? 'Create Account' : 'Sign In'}</h1>
          
          {isRegister ? (
            <form onSubmit={(e) => { e.preventDefault(); login(registerForm.email, registerForm.password); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={registerForm.name} onChange={(e) => setRegisterForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={registerForm.email} onChange={(e) => setRegisterForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={registerForm.password} onChange={(e) => setRegisterForm(p => ({ ...p, password: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
              </div>
              <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">Create Account</button>
              <p className="text-center text-sm text-gray-600">Already have an account? <button type="button" onClick={() => setIsRegister(false)} className="text-brand-600 font-medium">Sign in</button></p>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); login(loginForm.email, loginForm.password); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={loginForm.email} onChange={(e) => setLoginForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={loginForm.password} onChange={(e) => setLoginForm(p => ({ ...p, password: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors">Sign In</button>
              <p className="text-center text-sm text-gray-600">Don't have an account? <button type="button" onClick={() => setIsRegister(true)} className="text-brand-600 font-medium">Create one</button></p>
              <p className="text-center text-xs text-gray-400 mt-2">Demo: Use any email/password to sign in. Use admin@printcraft.com for admin access.</p>
            </form>
          )}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'projects', label: 'My Projects', icon: FileText },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
            {user?.role === 'admin' && (
              <Link to="/admin" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Settings className="w-4 h-4" /> Admin Panel
              </Link>
            )}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order History</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Link to="/catalog" className="text-brand-600 font-medium">Start shopping →</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-xl border p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-bold text-gray-900">{order.id}</span>
                          <span className="text-sm text-gray-500 ml-3">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'paid' ? 'bg-green-100 text-green-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        {order.items.slice(0, 3).map(item => (
                          <img key={item.id} src={item.product.image} alt="" className="w-10 h-10 rounded object-cover" />
                        ))}
                        {order.items.length > 3 && <span className="text-xs text-gray-500">+{order.items.length - 3} more</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                        <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Saved Projects</h2>
                <Link to="/editor" className="text-sm text-brand-600 font-medium hover:text-brand-700">+ New Project</Link>
              </div>
              {projects.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No saved projects yet</p>
                  <Link to="/editor" className="text-brand-600 font-medium">Start designing →</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-xl border overflow-hidden group">
                      <div className="aspect-[4/3] bg-gray-100 relative">
                        <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Link to={`/editor?project=${project.id}`} className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-900">Open Editor</Link>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900 text-sm">{project.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Last edited {new Date(project.lastModified).toLocaleDateString()}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => deleteProject(project.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Favorite Products</h2>
              {favorites.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No favorites yet</p>
                  <Link to="/catalog" className="text-brand-600 font-medium">Browse products →</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favorites.map(favId => {
                    const product = allProducts.find((p) => p.id === favId);
                    if (!product) return null;
                    return (
                      <Link key={favId} to={`/product/${product.slug}`} className="flex gap-4 bg-white rounded-xl border p-4 hover:shadow-md transition-all">
                        <img src={product.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">From ${product.basePrice.toFixed(2)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Addresses</h2>
              <div className="bg-white rounded-xl border p-6">
                {user?.addresses && user.addresses.length > 0 ? (
                  user.addresses.map(addr => (
                    <div key={addr.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{addr.label}</span>
                        {addr.isDefault && <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded">Default</span>}
                      </div>
                      <p className="text-sm text-gray-600">{addr.name}</p>
                      <p className="text-sm text-gray-600">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No saved addresses</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h2>
              <div className="bg-white rounded-xl border p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" defaultValue={user?.name} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" defaultValue={user?.email} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <button className="px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700">Save Changes</button>
                <hr className="my-4" />
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
