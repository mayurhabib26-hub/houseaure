# House of Aure — Golden Moments, Everyday

> *"Golden moments, Everyday."*  
> Premium luxury contemporary fashion label designed for moments worth remembering.

---

## Brand Identity & Aesthetic Direction

House of Aure is a luxury independent fashion label that blends architectural tailoring, natural noble textiles (Normandy certified flax, Giza long-staple cotton, 22-momme mulberry silk, and tropical wool), and quiet refinement.

- **Palette**: Warm ivory canvas (`#FAF9F5`), travertine surface (`#F4EFE6`), charcoal obsidian (`#141414`), and subtle muted champagne gold (`#C5A880`).
- **Typography**: High-contrast editorial display serif (*Cormorant Garamond*) paired with geometric grotesque (*Plus Jakarta Sans*).
- **Official Brand Mark**: Circular ivory seal emblem featuring the official brand geometry, tagline, and founding heritage (*Since 2024*).

---

## Key Features

1. **Cinematic Intro / Splash Screen**:
   - Full-screen ivory canvas revealing the House of Aure emblem and tagline.
   - Smooth Framer Motion curtain wipe transition into the storefront.

2. **Top Bar & Floating Navigation**:
   - Implements the strict 3-zone Top Bar Contract.
   - Transparent overlay at hero top, seamlessly transforming into a frosted glass floating navbar (`backdrop-blur-md`) with hairline border upon scrolling.
   - Animated champagne gold hairline scroll progress bar pinned to the top edge.

3. **Full-Screen Editorial Hero**:
   - High-fashion campaign visuals with subtle Spotlight ambient glow and measured contrast scrims.
   - Parallax scroll motion: image translates and expands gracefully while headline lifts and fades.
   - *"Scroll to Explore"* indicator and shimmer CTA buttons (*"Shop Collection"* & *"Explore New Arrivals"*).

4. **Magic UI Marquee**:
   - Slow, elegant scrolling ticker: `HOUSE OF AURE · GOLDEN MOMENTS, EVERYDAY · TIMELESS REFINEMENT · DESIGNED FOR YOU · AUTUMN / WINTER 2026`.

5. **New Arrivals Grid**:
   - 4-column desktop, 2-column mobile layout with staggered viewport entrance motion.
   - Secondary perspective on hover, clickable color swatches, size display, Quick Add button, and wishlist toggle.

6. **Shop by Category (BentoGrid)**:
   - Bento-style layout for Men, Women, Outerwear, Essentials, and Accessories with smooth zoom hover states and directional link indicators.

7. **"The World of Aure" (Spline 3D Scene)**:
   - Interactive 3D Aure sculpture rendered in real time with studio rim lighting and champagne metallic reflections.
   - Responds smoothly to mouse coordinate movement with organic orbit rotation.

8. **21st.dev Container Scroll Animation**:
   - Seasonal campaign film frame that expands smoothly with scroll progress and depth parallax.

9. **The Aure Edit & Story Chapters**:
   - Curated 3-item horizontal showcase highlighting individual composition and textile notes.
   - Dual-chapter editorial narrative exploring *Material Purity* and *Architectural Proportions* with image parallax.

10. **@houseofaure Social Editorial Grid**:
    - 6-image curated social gallery with Instagram hover reveals and *"Follow the Journey"* link.

11. **Minimalist Luxury Newsletter**:
    - Clean subscription module with verified email confirmation feedback.

12. **Complete E-Commerce Suite**:
    - **Slide-out Cart Drawer**: Itemized order summary, size/color specs, quantity steppers, item removal, and free shipping progress meter.
    - **Full-Screen Live Search Overlay**: Instant filtering by product name, category, or fabric composition with popular search tags.
    - **Product QuickView / PDP Modal**: Multi-angle gallery, size selection with tailoring chart dialog, color picker, quantity controls, and 1-Click Buy.
    - **Wishlist Drawer**: Saved garments with instant *"Move to Bag"* action.
    - **Concierge Checkout Flow**: Delivery address form (India / INR `₹`), payment mode selector (UPI / Credit & Debit Cards / Cash on Delivery), and order confirmation receipt state.

13. **Accessibility & Motion Governance**:
    - Floating back-to-top button appearing after 600px of scroll.
    - Full compliance with `prefers-reduced-motion`.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion / Framer Motion 12](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## Project Structure

```
├── public/                     # Static public assets (images, icons)
│   ├── images/                 # High-resolution production catalog images
│   └── src/assets/images/      # Mirrored production assets
├── src/
│   ├── assets/images/          # High-fidelity studio photography & campaign shots
│   ├── components/
│   │   ├── BrandLogo.tsx       # Official House of Aure logo (emblem & wordmark)
│   │   ├── CartDrawer.tsx      # Slide-out cart with shipping calculator
│   │   ├── CategoryBento.tsx   # BentoGrid category showcase
│   │   ├── CheckoutModal.tsx   # Multi-step checkout with UPI/Card/COD
│   │   ├── EditorialContainerScroll.tsx # 21st.dev Container Scroll section
│   │   ├── FashionStory.tsx    # Editorial storytelling with scroll parallax
│   │   ├── FeaturedEdit.tsx    # "The Aure Edit" 3-item horizontal showcase
│   │   ├── Footer.tsx          # Editorial footer with links & seal
│   │   ├── Hero.tsx            # Campaign hero with parallax & Spotlight
│   │   ├── InstagramGrid.tsx   # @houseofaure 6-photo social grid
│   │   ├── IntroScreen.tsx     # Cinematic curtain splash screen
│   │   ├── MarqueeSection.tsx  # Magic UI scrolling statement ticker
│   │   ├── MobileMenu.tsx      # Fullscreen luxury mobile navigation
│   │   ├── Navbar.tsx          # Floating navbar with scroll progress bar
│   │   ├── NewArrivals.tsx     # Product catalog grid with staggered motion
│   │   ├── Newsletter.tsx      # "Join the House" subscription
│   │   ├── ProductCard.tsx     # Product card with hover image & quick add
│   │   ├── ProductQuickView.tsx# Product details modal with size chart
│   │   ├── ScrollReveal.tsx    # Viewport-triggered scroll motion utility
│   │   ├── SearchOverlay.tsx   # Fullscreen live search
│   │   ├── SplineScene.tsx     # Interactive 3D Aure sculpture
│   │   └── WishlistDrawer.tsx  # Slide-out wishlist
│   ├── data/
│   │   └── products.ts         # Complete product data & categories (INR ₹)
│   ├── pages/
│   │   ├── AboutView.tsx       # Atelier philosophy & story page
│   │   └── ShopView.tsx        # Catalog page with filter & sort controls
│   ├── types.ts                # TypeScript interfaces
│   ├── App.tsx                 # Main application controller
│   ├── index.css               # Design tokens, typography & animations
│   └── main.tsx                # React entry point
├── index.html                  # HTML entry with Cormorant Garamond & Plus Jakarta Sans
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/house-of-aure.git
cd house-of-aure
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` or the port indicated in the terminal.

### 4. Build for production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview production build
```bash
npm run preview
```

---

## License

© 2026 House of Aure. All rights reserved.
