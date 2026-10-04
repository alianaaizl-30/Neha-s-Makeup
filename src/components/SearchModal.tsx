import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';
import { formatPrice } from '../utils/pricing';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { RoyalPackagingVisual } from './RoyalPackagingVisual';

interface SearchModalProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ products, onSelectProduct }) => {
  const { isSearchOpen, closeSearch, currency } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Global keydown listener for keyboard escape or "/" shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
      if (e.key === '/' && !isSearchOpen && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        // openSearch logic handled in parent or context
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? products.filter((p) => {
        const inName = p.name.toLowerCase().includes(trimmed);
        const inCat = p.category.toLowerCase().includes(trimmed);
        const inSub = p.subcategory.toLowerCase().includes(trimmed);
        const inFinish = p.finish.toLowerCase().includes(trimmed);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(trimmed));
        const inShades = p.shades.some((s) => s.name.toLowerCase().includes(trimmed));
        return inName || inCat || inSub || inFinish || inTags || inShades;
      })
    : [];

  const popularSearches = ['Foundation', 'Satin Lipstick', 'The Royal Archive', 'Brush Set', 'Cream Blush', 'Mascara'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeSearch}
      />

      <div className="relative max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#E8E4DC] overflow-hidden z-10 mt-10 sm:mt-16">
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E4DC] flex items-center gap-3 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-[#121C33] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search makeup, shades, formulas, brushes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-[#1E2024] placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700"
              aria-label="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-[#121C33] ml-2"
          >
            Esc
          </button>
        </div>

        {/* Search Content */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            /* Popular Suggestions */
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A808C] block mb-3">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-[#E2DED5] text-xs font-medium text-[#4A4F57] hover:border-[#121C33] hover:text-[#121C33] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-[#121C33] text-white rounded-xl text-xs flex items-center justify-between border border-[#23345B]">
                <span className="text-[#C9A96E] font-semibold">20% OFF STOREWIDE</span>
                <span className="text-slate-300">Automatic promotion applied on all results</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Results List */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#7A808C] pb-2 border-b border-[#F0ECE1]">
                <span>Found {results.length} formulation{results.length > 1 ? 's' : ''}</span>
                <span className="text-[#121C33] font-medium">All items 20% off</span>
              </div>

              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    closeSearch();
                  }}
                  className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#FAF9F5] transition-colors cursor-pointer border border-transparent hover:border-[#E8E4DC]"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#FAF9F5] shrink-0 border border-[#EAE7E1]">
                    <RoyalPackagingVisual
                      product={product}
                      className="w-full h-full object-cover"
                      showLabel={false}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-[#7A808C] uppercase tracking-wider">
                      <span>{product.category}</span>
                      <span>·</span>
                      <span>{product.subcategory}</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#121C33] truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-[#121C33] tabular-nums">
                        {formatPrice(product.salePrice, currency)}
                      </span>
                      <span className="text-[10px] text-[#8C93A0] line-through tabular-nums">
                        {formatPrice(product.originalPrice, currency)}
                      </span>
                      <span className="text-[9px] bg-[#121C33] text-[#F7E7CE] px-1 rounded font-bold">
                        20% OFF
                      </span>
                    </div>
                  </div>

                  <div className="text-slate-400 shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Polished Empty Search State */
            <div className="text-center py-12">
              <h3 className="font-serif text-base font-bold text-[#121C33] mb-1">
                No products found for "{query}"
              </h3>
              <p className="text-xs text-[#6C727F] mb-4">
                We couldn't find any formulations matching your search term.
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-4 py-2 bg-[#121C33] text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-[#1C2C50]"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
