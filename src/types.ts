export interface Product {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Essentials' | 'Outerwear' | 'Accessories';
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  description: string;
  details: string[];
  colors: { name: string; hex: string }[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  inStock: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  fabric: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type ActivePage = 'home' | 'shop' | 'about' | 'collections';
