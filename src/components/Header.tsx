import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { CategoryType } from '../types/product';

interface HeaderProps {
  onNavigateCategory: (category: CategoryType | 'All' | 'Sale' | 'New' | 'Bestsellers') => void;
  onNavigateHome: () => void;
  onOpenWishlist: () => void;
  activeNav: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateCategory,
  onNavigateHome,
  onOpenWishlist,
  activeNav,
}) => {
  const { totalItemsCount, openCart, openSearch, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; action: () => void; key: string; badge?: string }[] = [
    { label: 'Shop All', action: () => onNavigateCategory('All'), key: 'All' },
    { label: 'Face', action: () => onNavigateCategory('Face'), key: 'Face' },
    { label: 'Eyes', action: () => onNavigateCategory('Eyes'), key: 'Eyes' },
    { label: 'Lips', action: () => onNavigateCategory('Lips'), key: 'Lips' },
    { label: 'Brushes', action: () => onNavigateCategory('Brushes'), key: 'Brushes' },
    { label: 'Best Sellers', action: () => onNavigateCategory('Bestsellers'), key: 'Bestsellers' },
    { label: 'New Arrivals', action: () => onNavigateCategory('New'), key: 'New' },
    { label: 'Sale -20%', action: () => onNavigateCategory('Sale'), key: 'Sale', badge: '20% OFF' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Zone 1: Mobile Hamburger + Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#1E2024] hover:text-[#121C33] rounded-md transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Single text element wordmark as required by Top Bar Contract */}
            <button
              onClick={() => {
                onNavigateHome();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase text-[#121C33] group-hover:text-[#1E2D50] transition-colors">
                NEHA'S MAKEUP
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean text, no pill enclosures) */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium text-[#4A4F57]">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={link.action}
                className={`relative py-1 transition-colors hover:text-[#121C33] cursor-pointer ${
                  activeNav === link.key ? 'text-[#121C33] font-semibold' : ''
                }`}
              >
                <span>{link.label}</span>
                {activeNav === link.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#121C33]" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={openSearch}
              className="p-2 text-[#2D3139] hover:text-[#121C33] rounded-full hover:bg-[#F0ECE1] transition-colors relative"
              aria-label="Search makeup and shades"
              title="Search collection (Press / or click)"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#2D3139] hover:text-[#121C33] rounded-full hover:bg-[#F0ECE1] transition-colors relative"
              aria-label="Open Wishlist"
              title="Saved items"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#B8405E] fill-[#B8405E]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B8405E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3 py-2 bg-[#121C33] text-white rounded-lg hover:bg-[#1A2645] transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#C9A96E]" />
              <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">Bag</span>
              <span className="bg-[#C9A96E] text-[#121C33] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF9F5] shadow-2xl flex flex-col z-50 border-r border-[#E8E4DC]">
            <div className="flex items-center justify-between p-4 border-b border-[#E8E4DC]">
              <span className="font-serif text-lg font-bold tracking-[0.16em] uppercase text-[#121C33]">
                NEHA'S MAKEUP
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#121C33] text-white text-xs flex items-center justify-between">
              <span className="font-semibold tracking-wider text-[#C9A96E]">20% OFF ALL PRODUCTS</span>
              <span className="text-slate-300">AUTO-APPLIED</span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    link.action();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-3 px-2 text-left text-sm font-medium tracking-wide uppercase text-slate-800 hover:text-[#121C33] hover:bg-[#F2EEE4] rounded-md transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}

              <div className="pt-4 border-t border-[#E8E4DC] mt-4 space-y-2">
                <button
                  onClick={() => {
                    openSearch();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 py-2.5 px-2 text-sm text-slate-700 hover:bg-[#F2EEE4] rounded-md"
                >
                  <Search className="w-4 h-4 text-[#121C33]" />
                  <span>Search Products</span>
                </button>
                <button
                  onClick={() => {
                    onOpenWishlist();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 py-2.5 px-2 text-sm text-slate-700 hover:bg-[#F2EEE4] rounded-md"
                >
                  <Heart className="w-4 h-4 text-[#B8405E]" />
                  <span>Wishlist ({wishlist.length})</span>
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-[#E8E4DC] text-xs text-slate-500 text-center">
              Shipping to United States & United Kingdom
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
