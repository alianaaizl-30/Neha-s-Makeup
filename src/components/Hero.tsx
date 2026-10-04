import React from 'react';
import heroImg from '../assets/images/hero_editorial_neha_makeup_1790355927089.jpg';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onShopAll: () => void;
  onExploreBestsellers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopAll, onExploreBestsellers }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Elegant Sub-kicker (unboxed text) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#736858] mb-3">
              <span className="w-6 h-[1.5px] bg-[#C9A96E]" />
              <span>Autumn / Winter Luxury Collection</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#121C33] font-bold">20% Off All Formulations</span>
            </div>

            {/* Headline with text-wrap balance */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#121C33] leading-[1.12] mb-5 [text-wrap:balance]">
              Beauty, Your Way.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#525763] leading-relaxed mb-8 max-w-xl">
              Discover modern makeup formulated for effortless everyday beauty. Breathable
              complexion serums, silky velvet lipsticks, and handcrafted brushes—presented in our
              signature dark royal packaging.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
              <button
                onClick={onShopAll}
                className="px-6 py-3.5 bg-[#121C33] text-white rounded-lg font-semibold text-xs tracking-wider uppercase hover:bg-[#1C2C50] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
              </button>

              <button
                onClick={onExploreBestsellers}
                className="px-6 py-3.5 bg-white border border-[#D5D0C5] text-[#121C33] rounded-lg font-semibold text-xs tracking-wider uppercase hover:bg-[#F2EEE4] hover:border-[#121C33] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Bestsellers</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-6 border-t border-[#EAE6DE] grid grid-cols-3 gap-3 text-[11px] sm:text-xs text-[#5E6470]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span className="truncate">US & UK Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span className="truncate">30-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span className="truncate">100% Cruelty-Free</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Column (Editorial photo + Dark Royal Packaging) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E0DCD2] aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 bg-[#EAE6DE]">
              <img
                src={heroImg}
                alt="NEHA'S MAKEUP luxury editorial model with signature dark royal packaging"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-103"
                referrerPolicy="no-referrer"
              />

              {/* Luxury Inset Tag */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#121C33]/92 backdrop-blur-md border border-[#23345B] text-white p-3.5 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1D2B4D] border border-[#C9A96E]/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                </div>
                <div>
                  <div className="font-serif text-xs font-bold tracking-wider text-[#F7E7CE] uppercase">
                    Signature Dark Royal Packaging
                  </div>
                  <div className="text-[11px] text-slate-300">
                    20% Discount active on every product
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
