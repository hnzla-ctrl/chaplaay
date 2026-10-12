import { Product, Category, Template } from '../types';

const img = (seed: string, w = 600, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories: Category[] = [
  { id: 'c1', name: 'Business Essentials', slug: 'business-essentials', description: 'Make a lasting impression with professional business cards, letterheads, and stationery.', image: img('bizcards', 800, 500), subcategories: [{ name: 'Business Cards', slug: 'business-cards', count: 12 }, { name: 'Letterheads', slug: 'letterheads', count: 6 }, { name: 'Envelopes', slug: 'envelopes', count: 4 }, { name: 'Notepads', slug: 'notepads', count: 5 }], icon: '💼' },
  { id: 'c2', name: 'Marketing Materials', slug: 'marketing-materials', description: 'Promote your brand with flyers, brochures, posters, and more.', image: img('flyers', 800, 500), subcategories: [{ name: 'Flyers', slug: 'flyers', count: 8 }, { name: 'Brochures', slug: 'brochures', count: 6 }, { name: 'Postcards', slug: 'postcards', count: 5 }, { name: 'Posters', slug: 'posters', count: 7 }, { name: 'Menus', slug: 'menus', count: 4 }], icon: '📢' },
  { id: 'c3', name: 'Signs & Displays', slug: 'signs-displays', description: 'Eye-catching signage for events, retail, and outdoor advertising.', image: img('banners', 800, 500), subcategories: [{ name: 'Banners', slug: 'banners', count: 9 }, { name: 'Yard Signs', slug: 'yard-signs', count: 4 }, { name: 'Retractable Displays', slug: 'retractable', count: 3 }, { name: 'Window Decals', slug: 'decals', count: 5 }], icon: '🪧' },
  { id: 'c4', name: 'Stickers & Labels', slug: 'stickers-labels', description: 'Custom stickers and labels for products, packaging, and branding.', image: img('stickers', 800, 500), subcategories: [{ name: 'Die-Cut Stickers', slug: 'die-cut', count: 6 }, { name: 'Sheet Labels', slug: 'sheet-labels', count: 4 }, { name: 'Roll Labels', slug: 'roll-labels', count: 5 }, { name: 'Product Labels', slug: 'product-labels', count: 7 }], icon: '🏷️' },
  { id: 'c5', name: 'Packaging', slug: 'packaging', description: 'Custom packaging that protects and promotes your products.', image: img('packaging', 800, 500), subcategories: [{ name: 'Mailer Boxes', slug: 'mailer-boxes', count: 5 }, { name: 'Paper Bags', slug: 'paper-bags', count: 4 }, { name: 'Product Boxes', slug: 'product-boxes', count: 6 }, { name: 'Hang Tags', slug: 'hang-tags', count: 3 }], icon: '📦' },
  { id: 'c6', name: 'Clothing & Bags', slug: 'clothing-bags', description: 'Custom apparel and bags for your team, events, or brand.', image: img('tshirts', 800, 500), subcategories: [{ name: 'T-Shirts', slug: 't-shirts', count: 8 }, { name: 'Hoodies', slug: 'hoodies', count: 5 }, { name: 'Caps', slug: 'caps', count: 4 }, { name: 'Tote Bags', slug: 'tote-bags', count: 3 }], icon: '👕' },
  { id: 'c7', name: 'Promotional Products', slug: 'promotional-products', description: 'Branded merchandise that keeps your business top of mind.', image: img('promos', 800, 500), subcategories: [{ name: 'Pens', slug: 'pens', count: 6 }, { name: 'Mugs', slug: 'mugs', count: 5 }, { name: 'Bottles', slug: 'bottles', count: 4 }, { name: 'Notebooks', slug: 'notebooks', count: 3 }], icon: '🎁' },
  { id: 'c8', name: 'Invitations & Gifts', slug: 'invitations-gifts', description: 'Personalized invitations, cards, and photo gifts.', image: img('invites', 800, 500), subcategories: [{ name: 'Greeting Cards', slug: 'greeting-cards', count: 7 }, { name: 'Photo Books', slug: 'photo-books', count: 4 }, { name: 'Wall Art', slug: 'wall-art', count: 5 }, { name: 'Calendars', slug: 'calendars', count: 3 }], icon: '🎉' },
];

export const products: Product[] = [
  {
    id: 'p1', name: 'Premium Business Cards', slug: 'premium-business-cards', category: 'business-essentials', subcategory: 'business-cards',
    description: 'Make a powerful first impression with our premium business cards. Printed on thick, durable cardstock with your choice of finish. Perfect for networking events, meetings, and everyday professional use.',
    shortDescription: 'Thick, professional cards that make an impression', basePrice: 24.99, image: img('bizcard1'), gallery: [img('bizcard1'), img('bizcard2'), img('bizcard3'), img('bizcard4')],
    rating: 4.8, reviewCount: 2341, tags: ['business', 'networking', 'professional'], featured: true, bestseller: true,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: 'Standard (3.5" × 2")', value: 'standard', priceModifier: 0 }, { id: 's2', label: 'Square (2.5" × 2.5")', value: 'square', priceModifier: 5 }, { id: 's3', label: 'Mini (3" × 1")', value: 'mini', priceModifier: -2 }] },
      { id: 'paper', name: 'Paper Stock', type: 'select', required: true, values: [{ id: 'p1', label: '14pt Matte', value: '14matte', priceModifier: 0 }, { id: 'p2', label: '16pt Gloss', value: '16gloss', priceModifier: 3 }, { id: 'p3', label: '18pt Premium Matte', value: '18matte', priceModifier: 8 }, { id: 'p4', label: '32pt Ultra Thick', value: '32ultra', priceModifier: 15 }] },
      { id: 'finish', name: 'Finish', type: 'radio', required: true, values: [{ id: 'f1', label: 'Matte', value: 'matte', priceModifier: 0 }, { id: 'f2', label: 'Gloss', value: 'gloss', priceModifier: 2 }, { id: 'f3', label: 'Soft Touch', value: 'soft-touch', priceModifier: 8 }, { id: 'f4', label: 'Spot UV', value: 'spot-uv', priceModifier: 12 }] },
      { id: 'sides', name: 'Printing', type: 'radio', required: true, values: [{ id: 'sd1', label: 'Single Sided', value: 'single', priceModifier: 0 }, { id: 'sd2', label: 'Double Sided', value: 'double', priceModifier: 5 }] },
      { id: 'corners', name: 'Corners', type: 'radio', required: true, values: [{ id: 'cr1', label: 'Square Corners', value: 'square', priceModifier: 0 }, { id: 'cr2', label: 'Rounded Corners', value: 'rounded', priceModifier: 3 }] },
    ],
    quantityBreaks: [{ minQty: 50, maxQty: 99, unitPrice: 0.50 }, { minQty: 100, maxQty: 249, unitPrice: 0.35 }, { minQty: 250, maxQty: 499, unitPrice: 0.25 }, { minQty: 500, maxQty: 999, unitPrice: 0.18 }, { minQty: 1000, maxQty: 9999, unitPrice: 0.12 }],
    setupFee: 0, minQuantity: 50, maxQuantity: 10000, deliveryDays: 5,
  },
  {
    id: 'p2', name: 'Tri-Fold Brochures', slug: 'tri-fold-brochures', category: 'marketing-materials', subcategory: 'brochures',
    description: 'Showcase your services and products with professionally printed tri-fold brochures. Ideal for handouts, mailers, and display racks.',
    shortDescription: 'Professional brochures that tell your story', basePrice: 89.99, image: img('brochure1'), gallery: [img('brochure1'), img('brochure2'), img('brochure3')],
    rating: 4.7, reviewCount: 876, tags: ['marketing', 'brochure', 'folded'], featured: true, bestseller: true,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: '8.5" × 11"', value: 'letter', priceModifier: 0 }, { id: 's2', label: '8.5" × 14"', value: 'legal', priceModifier: 10 }] },
      { id: 'paper', name: 'Paper', type: 'select', required: true, values: [{ id: 'p1', label: '100lb Gloss Text', value: '100gloss', priceModifier: 0 }, { id: 'p2', label: '100lb Matte Text', value: '100matte', priceModifier: 0 }, { id: 'p3', label: '130lb Premium Gloss', value: '130gloss', priceModifier: 15 }] },
      { id: 'sides', name: 'Printing', type: 'radio', required: true, values: [{ id: 'sd1', label: 'Full Color Both Sides', value: 'full-both', priceModifier: 0 }, { id: 'sd2', label: 'Full Color / B&W Inside', value: 'full-bw', priceModifier: -5 }] },
    ],
    quantityBreaks: [{ minQty: 25, maxQty: 49, unitPrice: 3.60 }, { minQty: 50, maxQty: 99, unitPrice: 2.80 }, { minQty: 100, maxQty: 249, unitPrice: 2.20 }, { minQty: 250, maxQty: 499, unitPrice: 1.80 }, { minQty: 500, maxQty: 9999, unitPrice: 1.50 }],
    setupFee: 0, minQuantity: 25, maxQuantity: 5000, deliveryDays: 6,
  },
  {
    id: 'p3', name: 'Vinyl Banners', slug: 'vinyl-banners', category: 'signs-displays', subcategory: 'banners',
    description: 'Durable vinyl banners perfect for indoor and outdoor use. Weather-resistant with vibrant full-color printing and reinforced edges.',
    shortDescription: 'Durable banners for any occasion', basePrice: 39.99, image: img('banner1'), gallery: [img('banner1'), img('banner2'), img('banner3')],
    rating: 4.9, reviewCount: 1523, tags: ['signage', 'outdoor', 'banner', 'event'], featured: true, bestseller: true,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: '2\' × 4\'', value: '2x4', priceModifier: 0 }, { id: 's2', label: '3\' × 6\'', value: '3x6', priceModifier: 20 }, { id: 's3', label: '4\' × 8\'', value: '4x8', priceModifier: 45 }, { id: 's4', label: 'Custom Size', value: 'custom', priceModifier: 30 }] },
      { id: 'material', name: 'Material', type: 'select', required: true, values: [{ id: 'm1', label: '13oz Vinyl', value: '13oz', priceModifier: 0 }, { id: 'm2', label: '18oz Heavy Duty', value: '18oz', priceModifier: 15 }] },
      { id: 'finish', name: 'Finishing', type: 'radio', required: true, values: [{ id: 'f1', label: 'Hemmed Edges + Grommets', value: 'grommets', priceModifier: 0 }, { id: 'f2', label: 'Pole Pockets', value: 'pockets', priceModifier: 5 }, { id: 'f3', label: 'Clean Cut', value: 'clean', priceModifier: -3 }] },
    ],
    quantityBreaks: [{ minQty: 1, maxQty: 1, unitPrice: 39.99 }, { minQty: 2, maxQty: 4, unitPrice: 34.99 }, { minQty: 5, maxQty: 9, unitPrice: 29.99 }, { minQty: 10, maxQty: 9999, unitPrice: 24.99 }],
    setupFee: 0, minQuantity: 1, maxQuantity: 100, deliveryDays: 4,
  },
  {
    id: 'p4', name: 'Die-Cut Stickers', slug: 'die-cut-stickers', category: 'stickers-labels', subcategory: 'die-cut',
    description: 'Custom shaped stickers cut to your design. Waterproof, UV-resistant, and perfect for laptops, water bottles, and product packaging.',
    shortDescription: 'Custom-shaped waterproof stickers', basePrice: 19.99, image: img('sticker1'), gallery: [img('sticker1'), img('sticker2'), img('sticker3')],
    rating: 4.8, reviewCount: 3102, tags: ['stickers', 'waterproof', 'custom'], featured: true, bestseller: true,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: '2" × 2"', value: '2x2', priceModifier: 0 }, { id: 's2', label: '3" × 3"', value: '3x3', priceModifier: 3 }, { id: 's3', label: '4" × 4"', value: '4x4', priceModifier: 6 }, { id: 's4', label: '5" × 5"', value: '5x5', priceModifier: 10 }] },
      { id: 'material', name: 'Material', type: 'select', required: true, values: [{ id: 'm1', label: 'White Vinyl', value: 'white', priceModifier: 0 }, { id: 'm2', label: 'Clear Vinyl', value: 'clear', priceModifier: 2 }, { id: 'm3', label: 'Holographic', value: 'holographic', priceModifier: 8 }] },
      { id: 'finish', name: 'Finish', type: 'radio', required: true, values: [{ id: 'f1', label: 'Gloss', value: 'gloss', priceModifier: 0 }, { id: 'f2', label: 'Matte', value: 'matte', priceModifier: 0 }] },
    ],
    quantityBreaks: [{ minQty: 25, maxQty: 49, unitPrice: 1.20 }, { minQty: 50, maxQty: 99, unitPrice: 0.80 }, { minQty: 100, maxQty: 249, unitPrice: 0.55 }, { minQty: 250, maxQty: 499, unitPrice: 0.40 }, { minQty: 500, maxQty: 9999, unitPrice: 0.30 }],
    setupFee: 0, minQuantity: 25, maxQuantity: 5000, deliveryDays: 5,
  },
  {
    id: 'p5', name: 'Custom T-Shirts', slug: 'custom-t-shirts', category: 'clothing-bags', subcategory: 't-shirts',
    description: 'High-quality custom printed t-shirts. Choose from a range of colors, sizes, and printing methods for your team, event, or brand.',
    shortDescription: 'Premium custom printed apparel', basePrice: 14.99, image: img('tshirt1'), gallery: [img('tshirt1'), img('tshirt2'), img('tshirt3')],
    rating: 4.6, reviewCount: 1847, tags: ['apparel', 'custom', 'team'], featured: false, bestseller: true,
    options: [
      { id: 'style', name: 'Style', type: 'select', required: true, values: [{ id: 'st1', label: 'Crew Neck', value: 'crew', priceModifier: 0 }, { id: 'st2', label: 'V-Neck', value: 'vneck', priceModifier: 1 }, { id: 'st3', label: 'Long Sleeve', value: 'long', priceModifier: 4 }] },
      { id: 'color', name: 'Color', type: 'color', required: true, values: [{ id: 'c1', label: 'White', value: '#ffffff', priceModifier: 0 }, { id: 'c2', label: 'Black', value: '#1a1a1a', priceModifier: 0 }, { id: 'c3', label: 'Navy', value: '#1e3a5f', priceModifier: 0 }, { id: 'c4', label: 'Red', value: '#dc2626', priceModifier: 0 }, { id: 'c5', label: 'Forest Green', value: '#166534', priceModifier: 0 }] },
      { id: 'print', name: 'Print Location', type: 'radio', required: true, values: [{ id: 'pl1', label: 'Front Only', value: 'front', priceModifier: 0 }, { id: 'pl2', label: 'Back Only', value: 'back', priceModifier: 0 }, { id: 'pl3', label: 'Front & Back', value: 'both', priceModifier: 5 }] },
    ],
    quantityBreaks: [{ minQty: 1, maxQty: 11, unitPrice: 19.99 }, { minQty: 12, maxQty: 23, unitPrice: 16.99 }, { minQty: 24, maxQty: 47, unitPrice: 14.99 }, { minQty: 48, maxQty: 95, unitPrice: 12.99 }, { minQty: 96, maxQty: 9999, unitPrice: 10.99 }],
    setupFee: 0, minQuantity: 1, maxQuantity: 500, deliveryDays: 7,
  },
  {
    id: 'p6', name: 'Custom Mailer Boxes', slug: 'custom-mailer-boxes', category: 'packaging', subcategory: 'mailer-boxes',
    description: 'Branded mailer boxes that create an unforgettable unboxing experience. Full-color printing on all surfaces with durable corrugated construction.',
    shortDescription: 'Branded packaging that wows', basePrice: 149.99, image: img('box1'), gallery: [img('box1'), img('box2'), img('box3')],
    rating: 4.9, reviewCount: 654, tags: ['packaging', 'ecommerce', 'branding'], featured: true, bestseller: false,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: 'Small (8×6×4")', value: 'small', priceModifier: 0 }, { id: 's2', label: 'Medium (12×9×6")', value: 'medium', priceModifier: 15 }, { id: 's3', label: 'Large (16×12×8")', value: 'large', priceModifier: 30 }, { id: 's4', label: 'Custom Size', value: 'custom', priceModifier: 25 }] },
      { id: 'print', name: 'Printing', type: 'radio', required: true, values: [{ id: 'pr1', label: 'Outside Only', value: 'outside', priceModifier: 0 }, { id: 'pr2', label: 'Inside & Outside', value: 'both', priceModifier: 40 }] },
      { id: 'finish', name: 'Finish', type: 'radio', required: true, values: [{ id: 'f1', label: 'Matte', value: 'matte', priceModifier: 0 }, { id: 'f2', label: 'Gloss', value: 'gloss', priceModifier: 5 }] },
    ],
    quantityBreaks: [{ minQty: 10, maxQty: 29, unitPrice: 8.50 }, { minQty: 30, maxQty: 49, unitPrice: 7.00 }, { minQty: 50, maxQty: 99, unitPrice: 5.50 }, { minQty: 100, maxQty: 249, unitPrice: 4.50 }, { minQty: 250, maxQty: 9999, unitPrice: 3.50 }],
    setupFee: 50, minQuantity: 10, maxQuantity: 5000, deliveryDays: 10,
  },
  {
    id: 'p7', name: 'Custom Mugs', slug: 'custom-mugs', category: 'promotional-products', subcategory: 'mugs',
    description: 'Ceramic mugs with vibrant full-color printing. Perfect for office use, gifts, and promotional giveaways.',
    shortDescription: 'Custom printed ceramic mugs', basePrice: 9.99, image: img('mug1'), gallery: [img('mug1'), img('mug2')],
    rating: 4.5, reviewCount: 2156, tags: ['promotional', 'gifts', 'office'], featured: false, bestseller: true,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: '11oz Standard', value: '11oz', priceModifier: 0 }, { id: 's2', label: '15oz Large', value: '15oz', priceModifier: 3 }] },
      { id: 'color', name: 'Handle Color', type: 'color', required: true, values: [{ id: 'c1', label: 'White', value: 'white', priceModifier: 0 }, { id: 'c2', label: 'Black', value: 'black', priceModifier: 0 }, { id: 'c3', label: 'Blue', value: 'blue', priceModifier: 0 }, { id: 'c4', label: 'Red', value: 'red', priceModifier: 0 }] },
    ],
    quantityBreaks: [{ minQty: 1, maxQty: 15, unitPrice: 12.99 }, { minQty: 16, maxQty: 47, unitPrice: 10.99 }, { minQty: 48, maxQty: 95, unitPrice: 9.49 }, { minQty: 96, maxQty: 191, unitPrice: 8.49 }, { minQty: 192, maxQty: 9999, unitPrice: 7.49 }],
    setupFee: 0, minQuantity: 1, maxQuantity: 500, deliveryDays: 6,
  },
  {
    id: 'p8', name: 'Wedding Invitations', slug: 'wedding-invitations', category: 'invitations-gifts', subcategory: 'greeting-cards',
    description: 'Elegant wedding invitations with premium paper options and finishes. Create the perfect first impression for your special day.',
    shortDescription: 'Elegant invitations for your special day', basePrice: 79.99, image: img('wedding1'), gallery: [img('wedding1'), img('wedding2'), img('wedding3')],
    rating: 4.9, reviewCount: 987, tags: ['wedding', 'invitation', 'elegant'], featured: true, bestseller: false,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: '5" × 7"', value: '5x7', priceModifier: 0 }, { id: 's2', label: 'A5 (5.8" × 8.3")', value: 'a5', priceModifier: 5 }] },
      { id: 'paper', name: 'Paper', type: 'select', required: true, values: [{ id: 'p1', label: 'Cotton Smooth', value: 'cotton', priceModifier: 0 }, { id: 'p2', label: 'Linen Textured', value: 'linen', priceModifier: 8 }, { id: 'p3', label: 'Pearlescent', value: 'pearl', priceModifier: 12 }] },
      { id: 'finish', name: 'Finish', type: 'radio', required: true, values: [{ id: 'f1', label: 'None', value: 'none', priceModifier: 0 }, { id: 'f2', label: 'Foil Stamping', value: 'foil', priceModifier: 25 }, { id: 'f3', label: 'Letterpress', value: 'letterpress', priceModifier: 35 }] },
    ],
    quantityBreaks: [{ minQty: 10, maxQty: 24, unitPrice: 5.50 }, { minQty: 25, maxQty: 49, unitPrice: 4.50 }, { minQty: 50, maxQty: 99, unitPrice: 3.80 }, { minQty: 100, maxQty: 199, unitPrice: 3.20 }, { minQty: 200, maxQty: 9999, unitPrice: 2.80 }],
    setupFee: 0, minQuantity: 10, maxQuantity: 500, deliveryDays: 8,
  },
  {
    id: 'p9', name: 'Retractable Banner Stand', slug: 'retractable-banner-stand', category: 'signs-displays', subcategory: 'retractable',
    description: 'Professional retractable banner stands with high-resolution graphics. Includes carrying case and lightweight aluminum frame.',
    shortDescription: 'Professional display stands with graphics', basePrice: 129.99, image: img('retractable1'), gallery: [img('retractable1'), img('retractable2')],
    rating: 4.7, reviewCount: 432, tags: ['display', 'trade-show', 'professional'], featured: false, bestseller: false,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: '33" × 80"', value: '33x80', priceModifier: 0 }, { id: 's2', label: '36" × 90"', value: '36x90', priceModifier: 30 }] },
      { id: 'material', name: 'Graphic Material', type: 'select', required: true, values: [{ id: 'm1', label: 'Premium Vinyl', value: 'vinyl', priceModifier: 0 }, { id: 'm2', label: 'Fabric (Wrinkle-Free)', value: 'fabric', priceModifier: 25 }] },
    ],
    quantityBreaks: [{ minQty: 1, maxQty: 1, unitPrice: 129.99 }, { minQty: 2, maxQty: 4, unitPrice: 109.99 }, { minQty: 5, maxQty: 9, unitPrice: 94.99 }, { minQty: 10, maxQty: 9999, unitPrice: 84.99 }],
    setupFee: 0, minQuantity: 1, maxQuantity: 50, deliveryDays: 5,
  },
  {
    id: 'p10', name: 'Custom Flyer Printing', slug: 'custom-flyers', category: 'marketing-materials', subcategory: 'flyers',
    description: 'Eye-catching flyers for events, promotions, and marketing campaigns. Available in multiple sizes with vibrant full-color printing.',
    shortDescription: 'Vibrant flyers for any campaign', basePrice: 34.99, image: img('flyer1'), gallery: [img('flyer1'), img('flyer2')],
    rating: 4.6, reviewCount: 1234, tags: ['flyer', 'marketing', 'event'], featured: false, bestseller: true,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: '4.25" × 5.5"', value: 'half', priceModifier: -5 }, { id: 's2', label: '5.5" × 8.5"', value: 'half-letter', priceModifier: 0 }, { id: 's3', label: '8.5" × 11"', value: 'letter', priceModifier: 5 }] },
      { id: 'paper', name: 'Paper', type: 'select', required: true, values: [{ id: 'p1', label: '80lb Gloss Text', value: '80gloss', priceModifier: 0 }, { id: 'p2', label: '100lb Gloss Text', value: '100gloss', priceModifier: 5 }, { id: 'p3', label: '100lb Uncoated', value: '100uncoated', priceModifier: 3 }] },
      { id: 'sides', name: 'Printing', type: 'radio', required: true, values: [{ id: 'sd1', label: 'Single Sided', value: 'single', priceModifier: 0 }, { id: 'sd2', label: 'Double Sided', value: 'double', priceModifier: 8 }] },
    ],
    quantityBreaks: [{ minQty: 25, maxQty: 99, unitPrice: 1.40 }, { minQty: 100, maxQty: 249, unitPrice: 0.90 }, { minQty: 250, maxQty: 499, unitPrice: 0.65 }, { minQty: 500, maxQty: 999, unitPrice: 0.45 }, { minQty: 1000, maxQty: 9999, unitPrice: 0.30 }],
    setupFee: 0, minQuantity: 25, maxQuantity: 10000, deliveryDays: 4,
  },
  {
    id: 'p11', name: 'Product Labels (Rolls)', slug: 'product-labels-rolls', category: 'stickers-labels', subcategory: 'roll-labels',
    description: 'Professional product labels on rolls for easy application. Perfect for bottles, jars, containers, and product packaging.',
    shortDescription: 'Professional roll labels for products', basePrice: 29.99, image: img('labels1'), gallery: [img('labels1'), img('labels2')],
    rating: 4.7, reviewCount: 876, tags: ['labels', 'product', 'packaging'], featured: false, bestseller: false,
    options: [
      { id: 'shape', name: 'Shape', type: 'select', required: true, values: [{ id: 'sh1', label: 'Rectangle', value: 'rect', priceModifier: 0 }, { id: 'sh2', label: 'Circle', value: 'circle', priceModifier: 0 }, { id: 'sh3', label: 'Oval', value: 'oval', priceModifier: 2 }, { id: 'sh4', label: 'Custom Die-Cut', value: 'diecut', priceModifier: 10 }] },
      { id: 'material', name: 'Material', type: 'select', required: true, values: [{ id: 'm1', label: 'White Paper', value: 'paper', priceModifier: 0 }, { id: 'm2', label: 'White Vinyl (Waterproof)', value: 'vinyl', priceModifier: 5 }, { id: 'm3', label: 'Clear Vinyl', value: 'clear', priceModifier: 8 }] },
    ],
    quantityBreaks: [{ minQty: 50, maxQty: 99, unitPrice: 0.60 }, { minQty: 100, maxQty: 249, unitPrice: 0.45 }, { minQty: 250, maxQty: 499, unitPrice: 0.35 }, { minQty: 500, maxQty: 999, unitPrice: 0.25 }, { minQty: 1000, maxQty: 9999, unitPrice: 0.18 }],
    setupFee: 0, minQuantity: 50, maxQuantity: 10000, deliveryDays: 5,
  },
  {
    id: 'p12', name: 'Custom Notebooks', slug: 'custom-notebooks', category: 'promotional-products', subcategory: 'notebooks',
    description: 'Branded notebooks with custom covers. Available in multiple sizes with lined, dotted, or blank interior pages.',
    shortDescription: 'Branded notebooks for your team', basePrice: 7.99, image: img('notebook1'), gallery: [img('notebook1'), img('notebook2')],
    rating: 4.4, reviewCount: 567, tags: ['notebook', 'promotional', 'office'], featured: false, bestseller: false,
    options: [
      { id: 'size', name: 'Size', type: 'select', required: true, values: [{ id: 's1', label: 'A5 (5.8" × 8.3")', value: 'a5', priceModifier: 0 }, { id: 's2', label: 'A6 (4.1" × 5.8")', value: 'a6', priceModifier: -2 }, { id: 's3', label: 'B5 (6.9" × 9.8")', value: 'b5', priceModifier: 3 }] },
      { id: 'pages', name: 'Interior', type: 'select', required: true, values: [{ id: 'pg1', label: 'Lined (80 pages)', value: 'lined', priceModifier: 0 }, { id: 'pg2', label: 'Dotted (80 pages)', value: 'dotted', priceModifier: 0 }, { id: 'pg3', label: 'Blank (80 pages)', value: 'blank', priceModifier: 0 }, { id: 'pg4', label: 'Lined (160 pages)', value: 'lined160', priceModifier: 3 }] },
    ],
    quantityBreaks: [{ minQty: 5, maxQty: 24, unitPrice: 9.99 }, { minQty: 25, maxQty: 49, unitPrice: 8.49 }, { minQty: 50, maxQty: 99, unitPrice: 7.49 }, { minQty: 100, maxQty: 249, unitPrice: 6.49 }, { minQty: 250, maxQty: 9999, unitPrice: 5.49 }],
    setupFee: 0, minQuantity: 5, maxQuantity: 1000, deliveryDays: 7,
  },
];

export const templates: Template[] = [
  { id: 't1', name: 'Modern Minimal', category: 'Business Cards', style: 'Minimal', industry: 'General Business', colors: ['#1a1a1a', '#ffffff', '#e5e5e5'], preview: img('tmpl1', 400, 250), compatibleProducts: ['p1'], favoriteCount: 342, premium: false },
  { id: 't2', name: 'Bold & Professional', category: 'Business Cards', style: 'Corporate', industry: 'Finance', colors: ['#1e3a5f', '#f59e0b', '#ffffff'], preview: img('tmpl2', 400, 250), compatibleProducts: ['p1'], favoriteCount: 256, premium: false },
  { id: 't3', name: 'Creative Gradient', category: 'Business Cards', style: 'Creative', industry: 'Design', colors: ['#7c3aed', '#ec4899', '#ffffff'], preview: img('tmpl3', 400, 250), compatibleProducts: ['p1'], favoriteCount: 189, premium: true },
  { id: 't4', name: 'Nature Green', category: 'Flyers', style: 'Organic', industry: 'Health & Wellness', colors: ['#166534', '#86efac', '#ffffff'], preview: img('tmpl4', 400, 250), compatibleProducts: ['p10'], favoriteCount: 167, premium: false },
  { id: 't5', name: 'Event Promo', category: 'Flyers', style: 'Bold', industry: 'Events', colors: ['#dc2626', '#1a1a1a', '#ffffff'], preview: img('tmpl5', 400, 250), compatibleProducts: ['p10'], favoriteCount: 234, premium: false },
  { id: 't6', name: 'Tech Launch', category: 'Brochures', style: 'Modern', industry: 'Technology', colors: ['#2563eb', '#0f172a', '#ffffff'], preview: img('tmpl6', 400, 250), compatibleProducts: ['p2'], favoriteCount: 145, premium: true },
  { id: 't7', name: 'Elegant Wedding', category: 'Invitations', style: 'Elegant', industry: 'Wedding', colors: ['#d4a574', '#ffffff', '#1a1a1a'], preview: img('tmpl7', 400, 250), compatibleProducts: ['p8'], favoriteCount: 456, premium: true },
  { id: 't8', name: 'Sale Banner', category: 'Banners', style: 'Bold', industry: 'Retail', colors: ['#ef4444', '#fbbf24', '#ffffff'], preview: img('tmpl8', 400, 250), compatibleProducts: ['p3'], favoriteCount: 198, premium: false },
  { id: 't9', name: 'Brand Sticker Pack', category: 'Stickers', style: 'Playful', industry: 'General Business', colors: ['#2563eb', '#f59e0b', '#10b981'], preview: img('tmpl9', 400, 250), compatibleProducts: ['p4'], favoriteCount: 312, premium: false },
  { id: 't10', name: 'Restaurant Menu', category: 'Menus', style: 'Classic', industry: 'Food & Beverage', colors: ['#78350f', '#fef3c7', '#1a1a1a'], preview: img('tmpl10', 400, 250), compatibleProducts: ['p2'], favoriteCount: 278, premium: false },
  { id: 't11', name: 'Unboxing Experience', category: 'Packaging', style: 'Premium', industry: 'E-commerce', colors: ['#1a1a1a', '#d4a574', '#ffffff'], preview: img('tmpl11', 400, 250), compatibleProducts: ['p6'], favoriteCount: 189, premium: true },
  { id: 't12', name: 'Team Spirit', category: 'T-Shirts', style: 'Bold', industry: 'Sports', colors: ['#dc2626', '#1e3a5f', '#ffffff'], preview: img('tmpl12', 400, 250), compatibleProducts: ['p5'], favoriteCount: 267, premium: false },
];

export const reviews = [
  { id: 'r1', name: 'Sarah M.', rating: 5, text: 'The business cards turned out absolutely stunning. The soft-touch finish feels so premium. Will definitely order again!', product: 'Premium Business Cards', date: '2024-12-15' },
  { id: 'r2', name: 'James K.', rating: 5, text: 'Fast delivery and excellent print quality. The design tool made it easy to create exactly what I wanted.', product: 'Vinyl Banners', date: '2024-12-10' },
  { id: 'r3', name: 'Emily R.', rating: 4, text: 'Great stickers! The die-cut quality is perfect and they are truly waterproof. My customers love them.', product: 'Die-Cut Stickers', date: '2024-12-08' },
  { id: 'r4', name: 'Michael T.', rating: 5, text: 'The mailer boxes elevated our brand completely. The unboxing experience is exactly what we were looking for.', product: 'Custom Mailer Boxes', date: '2024-11-28' },
  { id: 'r5', name: 'Lisa P.', rating: 5, text: 'Beautiful wedding invitations! The pearlescent paper with foil stamping was absolutely gorgeous. Our guests were impressed.', product: 'Wedding Invitations', date: '2024-11-20' },
  { id: 'r6', name: 'David W.', rating: 4, text: 'Solid quality t-shirts for our company retreat. Printing was crisp and the shirts held up well after washing.', product: 'Custom T-Shirts', date: '2024-11-15' },
];
