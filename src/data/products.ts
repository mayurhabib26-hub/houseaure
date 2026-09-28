import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'aure-tailored-jacket',
    name: 'Aure Tailored Jacket',
    category: 'Outerwear',
    price: 5999,
    originalPrice: 7499,
    image: '/src/assets/images/product_tailored_jacket_1790604459666.jpg',
    hoverImage: '/src/assets/images/bento_menswear_tailoring_1790604372489.jpg',
    description: 'Precision cut structured jacket crafted from high-twist wool-blend with natural horn buttons and relaxed architectural shoulders.',
    details: [
      'Italian blended tropical wool',
      'Unstructured relaxed shoulder pad',
      'Double piped interior pockets',
      'Dry clean only'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#1C1B1A' },
      { name: 'Warm Taupe', hex: '#8C8275' },
      { name: 'Ecru', hex: '#EBE5D8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNewArrival: true,
    isFeatured: true,
    fabric: '85% Tropical Wool, 15% Mulberry Silk'
  },
  {
    id: 'aure-essential-shirt',
    name: 'Aure Essential Shirt',
    category: 'Men',
    price: 2999,
    image: '/src/assets/images/product_linen_shirt_1790604472438.jpg',
    hoverImage: '/src/assets/images/craftsmanship_fabric_detail_1790604414532.jpg',
    description: 'Tailored with crisp French seams and understated mother-of-pearl buttons. Designed to age with character.',
    details: [
      '100% Giza long-staple cotton',
      'Camp collar silhouette',
      'Mother of pearl buttons',
      'Pre-washed for soft hand-feel'
    ],
    colors: [
      { name: 'Pure Chalk', hex: '#F9F8F5' },
      { name: 'Muted Sand', hex: '#D7CEBE' },
      { name: 'Slate Gray', hex: '#4A4844' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNewArrival: true,
    isFeatured: true,
    fabric: '100% Organic Giza Cotton'
  },
  {
    id: 'aure-essential-dress',
    name: 'Aure Essential Dress',
    category: 'Women',
    price: 4499,
    image: '/src/assets/images/product_silk_dress_1790604488245.jpg',
    hoverImage: '/src/assets/images/bento_womens_drape_1790604385297.jpg',
    description: 'A bias-cut silhouette that drapes effortlessly over the body. Crafted from lustrous champagne mulberry silk.',
    details: [
      'Bias cut for natural fluid movement',
      'Adjustable slender silk straps',
      'French finished inner hems',
      'Subtle cowl neckline'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#DCCDB7' },
      { name: 'Obsidian Black', hex: '#161514' },
      { name: 'Ivory Bone', hex: '#F3EFE7' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    isNewArrival: true,
    isFeatured: true,
    fabric: '100% 22-Momme Mulberry Silk'
  },
  {
    id: 'aure-signature-overshirt',
    name: 'Aure Signature Overshirt',
    category: 'Outerwear',
    price: 4299,
    originalPrice: 4999,
    image: '/src/assets/images/product_overshirt_sand_1790604509458.jpg',
    hoverImage: '/src/assets/images/craftsmanship_fabric_detail_1790604414532.jpg',
    description: 'Heavyweight brushed organic canvas overshirt with dual front patch pockets and custom stamped metallic hardware.',
    details: [
      '380 GSM Heavyweight Japanese canvas',
      'Dual reinforced flap chest pockets',
      'Aure debossed metal shank buttons',
      'Boxy modern drop-shoulder cut'
    ],
    colors: [
      { name: 'Sand Dune', hex: '#CEBEA5' },
      { name: 'Washed Olive', hex: '#585949' },
      { name: 'Deep Midnight', hex: '#1D212A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isNewArrival: true,
    isFeatured: false,
    fabric: '100% Organic Heavyweight Cotton'
  },
  {
    id: 'aure-relaxed-trousers',
    name: 'Aure Relaxed Trousers',
    category: 'Men',
    price: 3499,
    image: '/src/assets/images/bento_menswear_tailoring_1790604372489.jpg',
    hoverImage: '/src/assets/images/product_tailored_jacket_1790604459666.jpg',
    description: 'Single-pleated wide-leg trousers engineered with an elasticated back waistband for refined all-day comfort.',
    details: [
      'Single front pleat drape',
      'Concealed horn button closure',
      'Deep slash side pockets',
      'Blind stitched cuffs'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#181716' },
      { name: 'Oatmeal Taupe', hex: '#C2B8A8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNewArrival: false,
    isFeatured: true,
    fabric: '70% Viscose, 30% Linen'
  },
  {
    id: 'aure-everyday-tee',
    name: 'Aure Everyday Tee',
    category: 'Essentials',
    price: 1799,
    image: '/src/assets/images/craftsmanship_fabric_detail_1790604414532.jpg',
    hoverImage: '/src/assets/images/product_overshirt_sand_1790604509458.jpg',
    description: 'The definitive luxury heavyweight tee. Crafted from 240 GSM combed cotton with a bound neck rib that never collapses.',
    details: [
      '240 GSM combed ring-spun cotton',
      'Anti-shrink pre-steamed treatment',
      'Subtle Aure blind tonal embroidery',
      'Seamless tubular side construction'
    ],
    colors: [
      { name: 'Vintage Chalk', hex: '#F5F2EA' },
      { name: 'Faded Charcoal', hex: '#2A2928' },
      { name: 'Warm Mocha', hex: '#635345' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isNewArrival: false,
    isFeatured: false,
    fabric: '100% Combed Compact Cotton'
  },
  {
    id: 'aure-linen-shirt',
    name: 'Aure Linen Shirt',
    category: 'Men',
    price: 3299,
    image: '/src/assets/images/product_linen_shirt_1790604472438.jpg',
    hoverImage: '/src/assets/images/bento_menswear_tailoring_1790604372489.jpg',
    description: 'Normandy-harvested flax woven into an airy, textured weave with unmatched breathability and a casual drape.',
    details: [
      '100% European Certified Flax',
      'Breathable open basketweave',
      'Relaxed resort collar',
      'Straight vented hem'
    ],
    colors: [
      { name: 'Natural Ecru', hex: '#E5DED1' },
      { name: 'Navy Dusk', hex: '#1C2433' },
      { name: 'Terracotta Fog', hex: '#9E7462' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNewArrival: true,
    isFeatured: false,
    fabric: '100% French Flax Linen'
  },
  {
    id: 'aure-studio-hoodie',
    name: 'Aure Studio Hoodie',
    category: 'Essentials',
    price: 3999,
    image: '/src/assets/images/product_overshirt_sand_1790604509458.jpg',
    hoverImage: '/src/assets/images/craftsmanship_fabric_detail_1790604414532.jpg',
    description: '450 GSM French Terry hoodie with a double-layered hood, hidden side seam pockets, and zero exterior drawstrings for a sleek silhouette.',
    details: [
      '450 GSM French Terry loopback',
      'Zero-drawstring architectural hood',
      'Concealed kangaroo interior pocket',
      'Ribbed side body panels'
    ],
    colors: [
      { name: 'Raw Bone', hex: '#EAE5D9' },
      { name: 'Ink Charcoal', hex: '#191817' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNewArrival: true,
    isFeatured: false,
    fabric: '100% Organic Heavy Loopback Cotton'
  },
  {
    id: 'aure-leather-tote',
    name: 'Aure Minimalist Leather Tote',
    category: 'Accessories',
    price: 7999,
    image: '/src/assets/images/bento_womens_drape_1790604385297.jpg',
    hoverImage: '/src/assets/images/hero_fashion_editorial_1790604359254.jpg',
    description: 'Full-grain vegetable-tanned saddle leather tote designed with seamless unlined interior and magnetic brass closure.',
    details: [
      'Full grain vegetable tanned leather',
      'Hand-burnished wax edges',
      'Fits up to 16" laptop with sleeve',
      'Handmade by master leather artisans'
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#7E4E2C' },
      { name: 'Matte Obsidian', hex: '#1A1A1A' }
    ],
    sizes: ['M'],
    inStock: true,
    isNewArrival: false,
    isFeatured: true,
    fabric: '100% Full Grain Tuscan Leather'
  }
];

export const CATEGORIES = [
  {
    id: 'men',
    name: 'Men',
    subtitle: 'Tailored silhouettes & refined cottons',
    image: '/src/assets/images/bento_menswear_tailoring_1790604372489.jpg',
    itemCount: '14 styles'
  },
  {
    id: 'women',
    name: 'Women',
    subtitle: 'Fluid silk & draped sculptural pieces',
    image: '/src/assets/images/bento_womens_drape_1790604385297.jpg',
    itemCount: '18 styles'
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    subtitle: 'The latest Autumn/Winter drop',
    image: '/src/assets/images/hero_fashion_editorial_1790604359254.jpg',
    itemCount: '9 styles'
  },
  {
    id: 'essentials',
    name: 'Essentials',
    subtitle: 'Daily elevated foundations',
    image: '/src/assets/images/product_linen_shirt_1790604472438.jpg',
    itemCount: '12 styles'
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    subtitle: 'Architectural wool & canvas overcoats',
    image: '/src/assets/images/product_tailored_jacket_1790604459666.jpg',
    itemCount: '7 styles'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    subtitle: 'Hand-burnished leather & silk scarves',
    image: '/src/assets/images/craftsmanship_fabric_detail_1790604414532.jpg',
    itemCount: '6 styles'
  }
];
