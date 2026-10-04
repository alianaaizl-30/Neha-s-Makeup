import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface BestSellersSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  onSelectProduct,
  onViewAll,
}) => {
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <section id="bestsellers-section" className="py-14 sm:py-20 bg-[#FAF9F5] border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#736858] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Cult Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#121C33]">
              BEST SELLERS
            </h2>
            <p className="text-sm text-[#5B606B] mt-1.5 max-w-xl">
              Our highest-rated formulations, proven on thousands of daily routines across the US and UK.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="text-xs font-semibold uppercase tracking-wider text-[#121C33] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
