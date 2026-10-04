import React from 'react';
import { useCart } from '../context/CartContext';
import { Globe, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { CategoryType } from '../types/product';

interface FooterProps {
  onNavigateCategory: (category: CategoryType | 'All') => void;
  onNavigateHome: () => void;
  onOpenPolicy: (type: 'shipping' | 'returns' | 'faq' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateCategory,
  onNavigateHome,
  onOpenPolicy,
}) => {
  const { currency, setCurrency } = useCart();

  return (
    <footer className="bg-[#121C33] text-white border-t border-[#1E2D50] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Trust Elements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#23345B] text-xs">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#C9A96E] shrink-0" />
            <div>
              <span className="font-semibold text-[#F7E7CE] block mb-0.5">
                Fast US & UK Delivery
              </span>
              <p className="text-slate-300 text-[11px]">
                Free standard shipping on orders over {currency === 'USD' ? '$50' : '£40'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-[#C9A96E] shrink-0" />
            <div>
              <span className="font-semibold text-[#F7E7CE] block mb-0.5">
                30-Day Easy Returns
              </span>
              <p className="text-slate-300 text-[11px]">
                Hassle-free shade exchanges and returns guaranteed
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C9A96E] shrink-0" />
            <div>
              <span className="font-semibold text-[#F7E7CE] block mb-0.5">
                Clean Formulations
              </span>
              <p className="text-slate-300 text-[11px]">
                100% Cruelty-free & dermatologist tested
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#C9A96E] shrink-0" />
            <div>
              <span className="font-semibold text-[#F7E7CE] block mb-0.5">
                Royal Packaging
              </span>
              <p className="text-slate-300 text-[11px]">
                Signature dark royal casing with gold embossing
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-[#23345B]">
          {/* Brand Info */}
          <div className="md:col-span-4">
            <button
              onClick={onNavigateHome}
              className="text-left font-serif text-2xl font-bold tracking-[0.2em] uppercase text-[#F9F6EE] mb-3 block"
            >
              NEHA'S MAKEUP
            </button>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-4">
              Modern makeup crafted for effortless everyday beauty. Breathable bases, rich velvety lipsticks, and handcrafted brush sets delivered in our signature dark royal aesthetic.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C9A96E] font-medium">
              <span>Current Promotion:</span>
              <span className="bg-[#1D2B4D] px-2 py-0.5 rounded border border-[#2B3E6E] text-[#F7E7CE]">
                20% OFF ALL PRODUCTS
              </span>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="md:col-span-2">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#C9A96E] mb-4">
              Collection
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigateCategory('All')}
                  className="hover:text-white transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('Face')}
                  className="hover:text-white transition-colors"
                >
                  Face & Foundation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('Eyes')}
                  className="hover:text-white transition-colors"
                >
                  Eyes & Palettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('Lips')}
                  className="hover:text-white transition-colors"
                >
                  Lips & Liners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('Brushes')}
                  className="hover:text-white transition-colors"
                >
                  Brushes & Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('Tools')}
                  className="hover:text-white transition-colors"
                >
                  Precision Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#C9A96E] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-white transition-colors"
                >
                  US & UK Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Shade Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('about')}
                  className="hover:text-white transition-colors"
                >
                  About NEHA'S MAKEUP
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Settings */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#C9A96E] mb-4">
              Regional Delivery
            </h4>
            <p className="text-xs text-slate-300 mb-3">
              Serving customers throughout the United States and United Kingdom.
            </p>
            <div className="flex items-center gap-2 bg-[#1A2645] p-2 rounded-lg border border-[#2B3E6E] text-xs">
              <Globe className="w-4 h-4 text-[#C9A96E]" />
              <span className="text-slate-300">Currency:</span>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded font-medium ${
                  currency === 'USD' ? 'bg-[#C9A96E] text-[#121C33]' : 'text-slate-300 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('GBP')}
                className={`px-2 py-0.5 rounded font-medium ${
                  currency === 'GBP' ? 'bg-[#C9A96E] text-[#121C33]' : 'text-slate-300 hover:text-white'
                }`}
              >
                GBP (£)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} NEHA'S MAKEUP. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
