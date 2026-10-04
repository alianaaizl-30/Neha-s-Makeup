import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS_CATALOG } from './data/products';
import { Product, CategoryType, Order } from './types/product';
import { PromotionBar } from './components/PromotionBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AllProductsSection } from './components/AllProductsSection';
import { CategoriesSection } from './components/CategoriesSection';
import { BestSellersSection } from './components/BestSellersSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { ShadeDiscoverySection } from './components/ShadeDiscoverySection';
import { BrushCollectionSpotlight } from './components/BrushCollectionSpotlight';
import { BrandStorySection } from './components/BrandStorySection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WishlistView } from './components/WishlistView';
import { PolicyModal } from './components/PolicyModal';
import { Toast } from './components/Toast';

type ViewMode = 'home' | 'product-detail' | 'checkout' | 'wishlist';

const MainApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CategoryType | 'All'>('All');
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [policyType, setPolicyType] = useState<'shipping' | 'returns' | 'faq' | 'about' | null>(null);

  // Handle selecting a product to open PDP
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewMode('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle navigation from header or categories
  const handleNavigateCategory = (cat: CategoryType | 'All' | 'Sale' | 'New' | 'Bestsellers') => {
    setViewMode('home');
    if (cat === 'Bestsellers') {
      setActiveNav('Bestsellers');
      const elem = document.getElementById('bestsellers-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'New') {
      setActiveNav('New');
      const elem = document.getElementById('new-arrivals-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'Sale') {
      setActiveNav('Sale');
      setActiveCategoryFilter('All');
      const elem = document.getElementById('shop-all-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveNav(cat);
      setActiveCategoryFilter(cat);
      const elem = document.getElementById('shop-all-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setViewMode('home');
    setActiveNav('Home');
    setActiveCategoryFilter('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopAllCTA = () => {
    setViewMode('home');
    setActiveCategoryFilter('All');
    const elem = document.getElementById('shop-all-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreBestsellersCTA = () => {
    setViewMode('home');
    const elem = document.getElementById('bestsellers-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreBrushesCTA = () => {
    setViewMode('home');
    setActiveCategoryFilter('Brushes');
    const elem = document.getElementById('shop-all-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderComplete = (order: Order) => {
    setConfirmedOrder(order);
    setViewMode('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E2024]">
      {/* 1. MANDATORY TOP PROMOTION BAR: 20% OFF ALL PRODUCTS */}
      <PromotionBar />

      {/* 2. HEADER / NAVIGATION */}
      <Header
        onNavigateCategory={handleNavigateCategory}
        onNavigateHome={handleNavigateHome}
        onOpenWishlist={() => setViewMode('wishlist')}
        activeNav={activeNav}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {viewMode === 'checkout' ? (
          <CheckoutView
            onBackToCart={() => setViewMode('home')}
            onOrderComplete={handleOrderComplete}
          />
        ) : viewMode === 'wishlist' ? (
          <WishlistView
            onBackToStore={handleNavigateHome}
            onSelectProduct={handleSelectProduct}
          />
        ) : viewMode === 'product-detail' && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setViewMode('home')}
            onSelectRelated={handleSelectProduct}
            relatedProducts={PRODUCTS_CATALOG.filter(
              (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
            )}
            onOpenCheckout={() => setViewMode('checkout')}
          />
        ) : (
          /* HOMEPAGE IN MANDATORY ORDER */
          <div>
            {/* 3. HERO SECTION */}
            <Hero
              onShopAll={handleShopAllCTA}
              onExploreBestsellers={handleExploreBestsellersCTA}
            />

            {/* 4. ALL PRODUCTS — MUST APPEAR BEFORE CATEGORIES */}
            <AllProductsSection
              products={PRODUCTS_CATALOG}
              onSelectProduct={handleSelectProduct}
              selectedCategoryFilter={activeCategoryFilter}
              onCategoryFilterChange={setActiveCategoryFilter}
            />

            {/* 5. CATEGORIES COME AFTER ALL PRODUCTS */}
            <CategoriesSection
              onSelectCategory={(cat) => {
                if (cat === 'New' || cat === 'Bestsellers') {
                  handleNavigateCategory(cat);
                } else {
                  handleNavigateCategory(cat);
                }
              }}
            />

            {/* 7. BEST SELLERS */}
            <BestSellersSection
              products={PRODUCTS_CATALOG}
              onSelectProduct={handleSelectProduct}
              onViewAll={handleExploreBestsellersCTA}
            />

            {/* 8. NEW ARRIVALS */}
            <NewArrivalsSection
              products={PRODUCTS_CATALOG}
              onSelectProduct={handleSelectProduct}
              onViewAll={() => handleNavigateCategory('New')}
            />

            {/* 9. SHADE / COLOR DISCOVERY */}
            <ShadeDiscoverySection
              products={PRODUCTS_CATALOG}
              onSelectProduct={handleSelectProduct}
            />

            {/* 10. BRUSH COLLECTION SPOTLIGHT */}
            <BrushCollectionSpotlight
              products={PRODUCTS_CATALOG}
              onSelectProduct={handleSelectProduct}
              onExploreBrushes={handleExploreBrushesCTA}
            />

            {/* 11. BRAND STORY */}
            <BrandStorySection />

            {/* 12. NEWSLETTER */}
            <NewsletterSection />
          </div>
        )}
      </main>

      {/* 13. FOOTER */}
      <Footer
        onNavigateCategory={(cat) => handleNavigateCategory(cat)}
        onNavigateHome={handleNavigateHome}
        onOpenPolicy={(policy) => setPolicyType(policy)}
      />

      {/* Global Interactive Overlays */}
      <CartDrawer
        onProceedToCheckout={() => setViewMode('checkout')}
        onContinueShopping={() => setViewMode('home')}
      />

      <SearchModal
        products={PRODUCTS_CATALOG}
        onSelectProduct={handleSelectProduct}
      />

      <ProductQuickViewModal />

      <OrderConfirmationModal
        order={confirmedOrder}
        onContinueShopping={() => setConfirmedOrder(null)}
      />

      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
