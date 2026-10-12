import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { EditorPage } from './pages/EditorPage';
import { AdminPage } from './pages/AdminPage';
import { SupportPage } from './pages/SupportPage';
import { OrderConfirmation } from './pages/OrderConfirmation';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:category" element={<CatalogPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/account/*" element={<AccountPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/editor/:productId?" element={<EditorPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
