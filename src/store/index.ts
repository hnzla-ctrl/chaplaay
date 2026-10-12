import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, User, Order, DesignProject, SupportTicket } from '../types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { subtotal: number; shipping: number; tax: number; total: number; discount: number };

  // Orders
  orders: Order[];
  placeOrder: (shippingAddress: any) => string;
  
  // Design Projects
  projects: DesignProject[];
  saveProject: (project: DesignProject) => void;
  deleteProject: (id: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;

  // UI
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  // Support
  tickets: SupportTicket[];
  addTicket: (ticket: SupportTicket) => void;

  // Coupons
  appliedCoupon: string | null;
  discount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, _password: string) => {
        const user: User = {
          id: 'u1',
          email,
          name: email.split('@')[0],
          role: email === 'admin@printcraft.com' ? 'admin' : 'customer',
          addresses: [
            { id: 'a1', label: 'Home', name: 'John Doe', street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US', isDefault: true }
          ]
        };
        set({ user, isAuthenticated: true });
        return true;
      },
      register: (name: string, email: string, _password: string) => {
        const user: User = {
          id: 'u' + Date.now(),
          email,
          name,
          role: 'customer',
          addresses: []
        };
        set({ user, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),

      cart: [],
      addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(i => i.id !== id) })),
      updateCartQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(i => i.id === id ? { ...i, quantity, totalPrice: i.unitPrice * quantity } : i)
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart, appliedCoupon, discount } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        const discountAmount = appliedCoupon ? subtotal * (discount / 100) : 0;
        const shipping = subtotal > 75 ? 0 : 9.99;
        const tax = (subtotal - discountAmount) * 0.08;
        const total = subtotal - discountAmount + shipping + tax;
        return { subtotal, shipping, tax, total, discount: discountAmount };
      },

      orders: [],
      placeOrder: (shippingAddress) => {
        const { cart, getCartTotal } = get();
        const totals = getCartTotal();
        const order: Order = {
          id: 'ORD-' + Date.now().toString(36).toUpperCase(),
          items: [...cart],
          status: 'paid',
          subtotal: totals.subtotal,
          shipping: totals.shipping,
          tax: totals.tax,
          discount: totals.discount || 0,
          total: totals.total,
          shippingAddress,
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        };
        set((state) => ({ orders: [order, ...state.orders], cart: [], appliedCoupon: null, discount: 0 }));
        return order.id;
      },

      projects: [],
      saveProject: (project) => set((state) => {
        const exists = state.projects.find(p => p.id === project.id);
        if (exists) {
          return { projects: state.projects.map(p => p.id === project.id ? project : p) };
        }
        return { projects: [...state.projects, project] };
      }),
      deleteProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),

      favorites: [],
      toggleFavorite: (productId) => set((state) => ({
        favorites: state.favorites.includes(productId)
          ? state.favorites.filter(id => id !== productId)
          : [...state.favorites, productId]
      })),

      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),

      tickets: [],
      addTicket: (ticket) => set((state) => ({ tickets: [ticket, ...state.tickets] })),

      appliedCoupon: null,
      discount: 0,
      applyCoupon: (code) => {
        const coupons: Record<string, number> = { 'WELCOME10': 10, 'SAVE20': 20, 'PRINT15': 15 };
        if (coupons[code.toUpperCase()]) {
          set({ appliedCoupon: code.toUpperCase(), discount: coupons[code.toUpperCase()] });
          return true;
        }
        return false;
      },
      removeCoupon: () => set({ appliedCoupon: null, discount: 0 }),
    }),
    { name: 'printcraft-store', partialize: (state) => ({ cart: state.cart, user: state.user, isAuthenticated: state.isAuthenticated, orders: state.orders, projects: state.projects, favorites: state.favorites, tickets: state.tickets, appliedCoupon: state.appliedCoupon, discount: state.discount }) }
  )
);
