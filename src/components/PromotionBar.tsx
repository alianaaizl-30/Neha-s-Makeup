import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Globe } from 'lucide-react';

export const PromotionBar: React.FC = () => {
  const { currency, setCurrency } = useCart();

  return (
    <div className="relative z-50 bg-[#121C33] text-white border-b border-[#1E2D50] px-4 py-2.5 text-xs sm:text-sm tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Currency Switcher (US / UK) */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <Globe className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-slate-400">Market:</span>
          <div className="flex items-center gap-1 bg-[#1A2645] rounded px-1.5 py-0.5 border border-[#2B3E6E]">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                currency === 'USD'
                  ? 'bg-[#C9A96E] text-[#121C33] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Shop in US Dollars (United States)"
            >
              USD ($)
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setCurrency('GBP')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                currency === 'GBP'
                  ? 'bg-[#C9A96E] text-[#121C33] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Shop in British Pounds (United Kingdom)"
            >
              GBP (£)
            </button>
          </div>
        </div>

        {/* Central Non-Negotiable Promotion Message */}
        <div className="flex items-center justify-center gap-2 text-center font-medium mx-auto">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          <span className="font-bold tracking-wider text-[#F7E7CE] uppercase">
            20% OFF ALL PRODUCTS
          </span>
          <span className="hidden md:inline text-slate-300">
            — AUTOMATICALLY APPLIED AT CHECKOUT
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E] hidden sm:inline" />
        </div>

        {/* Free shipping threshold note */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-300">
          <span>US & UK Free Express Shipping over {currency === 'USD' ? '$50' : '£40'}</span>
        </div>
      </div>
    </div>
  );
};
