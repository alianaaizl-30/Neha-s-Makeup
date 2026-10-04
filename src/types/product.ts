export type CategoryType = 'Face' | 'Eyes' | 'Lips' | 'Brushes' | 'Tools';

export type FinishType = 'Matte' | 'Satin' | 'Glossy' | 'Shimmer' | 'Natural';

export type SkinType = 'Normal' | 'Dry' | 'Oily' | 'Combination';

export type ColorFamily =
  | 'Nude'
  | 'Pink'
  | 'Red'
  | 'Brown'
  | 'Berry'
  | 'Coral'
  | 'Plum'
  | 'Gold'
  | 'Bronze'
  | 'Neutral';

export interface Shade {
  id: string;
  name: string;
  hex: string;
  tone?: string;
  description?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryType;
  subcategory: string;
  description: string;
  originalPrice: number;
  salePrice: number; // Strictly originalPrice * 0.80
  discountPercentage: number; // 20
  images: string[];
  packagingImage?: string;
  packagingDetails?: {
    type: 'box' | 'compact' | 'tube' | 'dropper' | 'cylinder' | 'set-box';
    color: string;
    foilAccent: string;
    finish: string;
  };
  shades: Shade[];
  finish: FinishType;
  skinTypes: SkinType[];
  rating: number;
  reviewCount: number;
  ingredients: string;
  howToUse: string;
  inStock: boolean;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  tags: string[];
  colorFamily?: ColorFamily;
  volumeOrWeight?: string;
}

export interface CartItem {
  id: string; // generated from productId + (shadeId || 'default')
  product: Product;
  selectedShade?: Shade;
  quantity: number;
  unitPrice: number; // Discounted sale price
  originalUnitPrice: number;
}

export type Currency = 'USD' | 'GBP';

export interface DeliveryOption {
  id: string;
  name: string;
  priceUSD: number;
  priceGBP: number;
  estimatedDays: string;
  description: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: 'United States' | 'United Kingdom';
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  savings: number;
  shippingFee: number;
  total: number;
  currency: Currency;
  shippingAddress: ShippingAddress;
  deliveryOption: DeliveryOption;
  status: 'confirmed';
}

export interface FilterState {
  category?: CategoryType | 'All';
  subcategory?: string;
  colorFamily?: ColorFamily;
  finish?: FinishType;
  skinType?: SkinType;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  searchQuery?: string;
  sortBy?: 'featured' | 'newest' | 'best-selling' | 'price-asc' | 'price-desc' | 'rating-desc';
}
