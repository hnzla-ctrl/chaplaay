import { useState } from 'react';
import { Search, ChevronDown, MessageSquare, Phone, Mail, Clock, FileText, Send, Paperclip, HelpCircle } from 'lucide-react';
import { useStore } from '../store';
import { v4 as uuidv4 } from 'uuid';

export function SupportPage() {
  const { isAuthenticated, addTicket } = useStore();
  const [activeTab, setActiveTab] = useState('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'general', message: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqCategories = [
    {
      title: 'Products & Materials',
      icon: '📦',
      faqs: [
        { id: 'p1', q: 'What paper stocks do you offer?', a: 'We offer a wide range of paper stocks including 14pt matte, 16pt gloss, 18pt premium matte, and 32pt ultra thick. Each stock is available in different finishes including matte, gloss, soft touch, and spot UV.' },
        { id: 'p2', q: 'What is the difference between matte and gloss finish?', a: 'Matte finish provides a smooth, non-reflective surface that\'s easy to write on and gives a sophisticated look. Gloss finish provides vibrant colors with a shiny, reflective surface that makes images pop.' },
        { id: 'p3', q: 'Do you offer eco-friendly options?', a: 'Yes! We offer recycled paper stocks, soy-based inks, and FSC-certified materials. Look for our green leaf icon on eligible products.' },
      ]
    },
    {
      title: 'Design Editor',
      icon: '🎨',
      faqs: [
        { id: 'd1', q: 'How do I add text to my design?', a: 'Click the "T" (Type) tool in the left toolbar, then click on the canvas to add a text box. You can then type your text and customize the font, size, color, and alignment in the properties panel.' },
        { id: 'd2', q: 'What image formats can I upload?', a: 'Our editor supports PNG, JPEG, and SVG formats. For best print quality, use images with at least 300 DPI resolution at the final print size.' },
        { id: 'd3', q: 'How do I save my design?', a: 'Click the "Save" button in the top toolbar. Your design will be saved to your account and you can access it anytime from your dashboard. Designs are auto-saved every 30 seconds.' },
        { id: 'd4', q: 'What are bleed and safe areas?', a: 'The bleed area (outer dashed line) is the extra space that gets trimmed off during production. The safe area (inner dashed line) is where you should keep all important content to avoid it being cut off.' },
      ]
    },
    {
      title: 'Orders & Shipping',
      icon: '🚚',
      faqs: [
        { id: 's1', q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days after production. Express shipping is 2-3 business days, and rush production can reduce production time to 1-2 business days.' },
        { id: 's2', q: 'Can I track my order?', a: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track your order from your account dashboard under "Order History".' },
        { id: 's3', q: 'What is your return policy?', a: 'We offer a 100% satisfaction guarantee. If you\'re not happy with your order, contact us within 30 days and we\'ll reprint or refund your order.' },
        { id: 's4', q: 'Do you ship internationally?', a: 'Currently we ship within the United States. International shipping is coming soon! Sign up for our newsletter to be notified when we expand.' },
      ]
    },
    {
      title: 'Payments & Pricing',
      icon: '💳',
      faqs: [
        { id: 'pay1', q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, Discover, and PayPal. All payments are processed securely with 256-bit SSL encryption.' },
        { id: 'pay2', q: 'How do quantity discounts work?', a: 'The more you order, the less you pay per unit. Each product page shows the quantity break pricing table. Discounts are automatically applied when you reach a higher quantity tier.' },
      ]
    },
    {
      title: 'File Upload',
      icon: '📁',
      faqs: [
        { id: 'f1', q: 'What file formats do you accept?', a: 'We accept PDF, PNG, JPEG, and TIFF files. PDF is recommended for best results as it preserves fonts and vector graphics.' },
        { id: 'f2', q: 'What resolution should my files be?', a: 'For best print quality, files should be 300 DPI at the final print size. Our system will warn you if your uploaded image has insufficient resolution.' },
        { id: 'f3', q: 'How do I set up bleed in my file?', a: 'Extend your background and any elements that should go to the edge by 0.125" (3mm) beyond the trim line on all sides. Keep text and important elements at least 0.125" inside the trim line.' },
      ]
    },
  ];

  const filteredFaqs = searchQuery
    ? faqCategories.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
      })).filter(cat => cat.faqs.length > 0)
    : faqCategories;

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    addTicket({
      id: 'TK-' + uuidv4().slice(0, 6).toUpperCase(),
      subject: ticketForm.subject,
      status: 'open',
      category: ticketForm.category,
      createdAt: new Date().toISOString(),
      messages: [{ sender: 'customer', content: ticketForm.message, timestamp: new Date().toISOString() }],
    });
    setTicketSubmitted(true);
    setTicketForm({ subject: '', category: 'general', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">How can we help?</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions or contact our support team for personalized assistance.</p>
      </div>

      {/* Search - Glassmorphism */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for answers..." className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl text-lg focus:outline-none transition-smooth" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {[
          { id: 'help', label: 'Help Center', icon: HelpCircle },
          { id: 'contact', label: 'Contact Us', icon: MessageSquare },
          { id: 'ticket', label: 'Submit Ticket', icon: FileText },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'help' && (
        <div className="space-y-8">
          {filteredFaqs.map(category => (
            <div key={category.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span> {category.title}
              </h2>
              <div className="space-y-2">
                {category.faqs.map(faq => (
                  <details key={faq.id} className="group glass rounded-xl overflow-hidden" open={expandedFaq === faq.id}>
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}>
                      <span className="font-medium text-gray-900">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-600 border-t pt-3">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try different search terms or <button onClick={() => setActiveTab('contact')} className="text-brand-600 font-medium">contact us directly</button></p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Phone, label: 'Call Us', value: '1-800-PRINT-PRO', desc: 'Mon-Fri, 9am-6pm EST', color: 'bg-blue-50 text-blue-600' },
              { icon: Mail, label: 'Email Us', value: 'support@printcraftpro.com', desc: 'Response within 24 hours', color: 'bg-green-50 text-green-600' },
              { icon: Clock, label: 'Live Chat', value: 'Available Now', desc: 'Instant support', color: 'bg-purple-50 text-purple-600' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border p-5 text-center">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-brand-600 font-medium text-sm mt-1">{item.value}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Send us a message</h2>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input type="text" value={ticketForm.subject} onChange={(e) => setTicketForm(p => ({ ...p, subject: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={ticketForm.category} onChange={(e) => setTicketForm(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Issue</option>
                  <option value="design">Design Help</option>
                  <option value="billing">Billing</option>
                  <option value="technical">Technical Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea value={ticketForm.message} onChange={(e) => setTicketForm(p => ({ ...p, message: e.target.value }))} rows={5} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" required />
              </div>
              <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'ticket' && (
        <div className="max-w-2xl mx-auto">
          {ticketSubmitted ? (
            <div className="text-center py-12 bg-white rounded-xl border">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ticket Submitted!</h2>
              <p className="text-gray-600 mb-4">We've received your support request and will get back to you within 24 hours.</p>
              <button onClick={() => setTicketSubmitted(false)} className="text-brand-600 font-medium">Submit another ticket</button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Submit a Support Ticket</h2>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input type="text" value={ticketForm.subject} onChange={(e) => setTicketForm(p => ({ ...p, subject: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Brief description of your issue" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select value={ticketForm.category} onChange={(e) => setTicketForm(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="design">Design Help</option>
                    <option value="file">File Upload Problem</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="technical">Technical Support</option>
                    <option value="returns">Returns & Refunds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea value={ticketForm.message} onChange={(e) => setTicketForm(p => ({ ...p, message: e.target.value }))} rows={6} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" placeholder="Please describe your issue in detail..." required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Paperclip className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drag files here or <span className="text-brand-600 font-medium cursor-pointer">browse</span></p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
                <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700">
                  <Send className="w-4 h-4" /> Submit Ticket
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
