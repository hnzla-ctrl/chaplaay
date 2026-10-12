import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-surface-950 text-white overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/30">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9V2h12v7"/>
                  <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold">Print</span>
                <span className="text-xl font-bold gradient-text">Craft</span>
                <span className="text-[10px] font-medium text-white/40 block -mt-1 tracking-widest">PRO</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Premium custom printing for businesses and individuals. Quality you can trust, delivered with care and precision.
            </p>
            <div className="space-y-2.5 text-sm text-white/60">
              <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-brand-400" /> 1-800-PRINT-PRO</div>
              <div className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-brand-400" /> support@printcraftpro.com</div>
              <div className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-brand-400" /> San Francisco, CA</div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Products</h3>
            <ul className="space-y-2.5 text-sm">
              {['Business Cards', 'Marketing Materials', 'Signs & Displays', 'Stickers & Labels', 'Packaging', 'Clothing & Bags', 'Promotional Products'].map(item => (
                <li key={item}><Link to="/catalog" className="text-white/50 hover:text-white transition-smooth">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Support</h3>
            <ul className="space-y-2.5 text-sm">
              {['Help Center', 'Contact Us', 'Shipping Info', 'Returns & Refunds', 'File Specifications', 'Design Services'].map(item => (
                <li key={item}><Link to="/support" className="text-white/50 hover:text-white transition-smooth">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {['About Us', 'Careers', 'Blog', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}><a href="#" className="text-white/50 hover:text-white transition-smooth">{item}</a></li>
              ))}
              <li><Link to="/admin" className="text-white/50 hover:text-white transition-smooth">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">© 2024 PrintCraft Pro. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30">Secure payments</span>
            <div className="flex gap-2">
              {['Visa', 'MC', 'Amex', 'PayPal'].map(m => (
                <span key={m} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-white/50 font-medium">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
