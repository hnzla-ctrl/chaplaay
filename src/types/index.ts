export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  options: ProductOption[];
  quantityBreaks: QuantityBreak[];
  setupFee: number;
  minQuantity: number;
  maxQuantity: number;
  deliveryDays: number;
  featured: boolean;
  bestseller: boolean;
}

export interface ProductOption {
  id: string;
  name: string;
  type: 'select' | 'radio' | 'color' | 'size';
  values: OptionValue[];
  required: boolean;
}

export interface OptionValue {
  id: string;
  label: string;
  value: string;
  priceModifier: number;
  image?: string;
}

export interface QuantityBreak {
  minQty: number;
  maxQty: number;
  unitPrice: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: { name: string; slug: string; count: number }[];
  icon: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  style: string;
  industry: string;
  colors: string[];
  preview: string;
  compatibleProducts: string[];
  favoriteCount: number;
  premium: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
  designId?: string;
  designPreview?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'in_production' | 'shipped' | 'delivered' | 'cancelled';

export interface DesignProject {
  id: string;
  name: string;
  productId: string;
  thumbnail: string;
  lastModified: string;
  pages: DesignPage[];
}

export interface DesignPage {
  id: string;
  width: number;
  height: number;
  objects: DesignObject[];
}

export interface DesignObject {
  id: string;
  type: 'text' | 'image' | 'shape' | 'qr';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  opacity: number;
  // Text specific
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: string;
  // Image specific
  src?: string;
  // Shape specific
  shapeType?: 'rect' | 'circle' | 'line' | 'triangle';
  cornerRadius?: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: string;
  createdAt: string;
  messages: { sender: string; content: string; timestamp: string }[];
}
