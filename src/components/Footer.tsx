import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PrintCraft<span className="text-brand-400">Pro</span></span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">Premium custom printing for businesses and individuals. Quality you can trust, delivered fast.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> 1-800-PRINT-PRO</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@printcraftpro.com</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> San Francisco, CA</div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog/business-essentials" className="hover:text-white transition-colors">Business Cards</Link></li>
              <li><Link to="/catalog/marketing-materials" className="hover:text-white transition-colors">Marketing Materials</Link></li>
              <li><Link to="/catalog/signs-displays" className="hover:text-white transition-colors">Signs & Displays</Link></li>
              <li><Link to="/catalog/stickers-labels" className="hover:text-white transition-colors">Stickers & Labels</Link></li>
              <li><Link to="/catalog/packaging" className="hover:text-white transition-colors">Packaging</Link></li>
              <li><Link to="/catalog/clothing-bags" className="hover:text-white transition-colors">Clothing & Bags</Link></li>
              <li><Link to="/catalog/promotional-products" className="hover:text-white transition-colors">Promotional Products</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">File Specifications</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Design Services</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 PrintCraft Pro. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Secure payments via</span>
            <div className="flex gap-2">
              {['Visa', 'MC', 'Amex', 'PayPal'].map(m => (
                <span key={m} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
