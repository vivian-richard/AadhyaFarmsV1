# Aadhya Farms Mobile App

A Swiggy Instamart-inspired mobile app for Aadhya Farms, built with React, TypeScript, and Vite.

## Features

The mobile app includes all features from the main website:

### 🏠 Home
- Farm fresh banner
- 8 category grid (Dairy, Eggs, Chicken, Mutton, Ghee, Paneer, Subscribe, Farm Stay)
- Special offers section
- Popular products showcase
- Subscription CTA
- Farm stay promotion

### 🛍️ Shopping
- **Products Page**: Category-based filtering with horizontal tabs
- **Product Detail**: Full product information with quantity selector
- **Search**: Real-time search with recent searches and popular products
- **Cart**: Item management with quantity controls and bill summary
- **Wishlist**: Save favorite products with add to cart

### 📦 Subscriptions & Orders
- **Subscriptions**: Daily/weekly subscription plans
- **Orders**: Active and past order tracking
- **Order Details**: Reorder and rating functionality

### 🏡 Farm Stay
- Room selection (Deluxe Cottage, Family Suite, Premium Villa)
- Activity showcase (Farm tour, cow feeding, milking demo, etc.)
- Booking management

### 🎁 Rewards
- Referral program with code sharing
- Farm credits management
- Reward history tracking

### 👤 Profile
- User account management
- Menu navigation to all features
- Settings and support access

## Design System

Inspired by Swiggy Instamart with:

- **Primary Color**: Orange (#FC8019)
- **Secondary Colors**: Farm Green (#2D5016), Gold Accent (#D4AF37)
- **Layout**: Clean white backgrounds, card-based UI
- **Navigation**: Fixed top header + bottom navigation bar
- **Typography**: Modern, readable fonts with clear hierarchy

## How to Access

### Development
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Access the mobile app:
   - Mobile App: `http://localhost:5173/m`
   - Desktop Site: `http://localhost:5173`

### Mobile App Routes

All mobile routes are prefixed with `/m`:

- `/m` - Home page
- `/m/products` - Product listing
- `/m/product-detail/:id` - Product details
- `/m/cart` - Shopping cart
- `/m/search` - Search page
- `/m/subscriptions` - Subscription plans
- `/m/farmstay` - Farm stay bookings
- `/m/rewards` - Referral rewards
- `/m/orders` - Order history
- `/m/wishlist` - Saved items
- `/m/profile` - User profile

## Project Structure

```
src/
├── mobile/
│   ├── MobileHeader.tsx          # Top navigation bar
│   ├── MobileBottomNav.tsx       # Bottom navigation bar
│   ├── MobileHome.tsx            # Home page
│   ├── MobileProducts.tsx        # Product listing
│   ├── MobileProductDetail.tsx   # Product details
│   ├── MobileCart.tsx            # Shopping cart
│   ├── MobileSearch.tsx          # Search functionality
│   ├── MobileSubscriptions.tsx   # Subscription plans
│   ├── MobileFarmStay.tsx        # Farm stay bookings
│   ├── MobileRewards.tsx         # Rewards & referrals
│   ├── MobileOrders.tsx          # Order tracking
│   ├── MobileWishlist.tsx        # Wishlist management
│   ├── MobileProfile.tsx         # User profile
│   └── mobile-styles.css         # Mobile-specific styles
├── MobileApp.tsx                 # Mobile app entry point
└── main.tsx                      # Route detection logic
```

## Shared Features

The mobile app shares context providers with the desktop site:
- Cart
- Wishlist
- Authentication
- Products
- Subscriptions
- Referrals
- Farm Stay
- Farm Credits

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Vite** - Build tool
- **Custom CSS** - Swiggy-inspired styling

## Mobile-First Features

- Touch-optimized interactions
- Horizontal scrolling category tabs
- Fixed bottom navigation
- Sticky add-to-cart bars
- Optimized product cards
- Mobile-friendly modals

## Future Enhancements

- Push notifications
- Offline support
- Location-based delivery
- Live order tracking
- In-app chat support
- Quick reorder shortcuts
