import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NewArrivalsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onSelectProduct,
  onViewAll,
}) => {
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <section id="new-arrivals-section" className="py-14 sm:py-20 bg-white border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#736858] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Just Launched</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#121C33]">
              NEW ARRIVALS
            </h2>
            <p className="text-sm text-[#5B606B] mt-1.5 max-w-xl">
              Fresh additions to our beauty lineup, featuring peptide-infused glazes and gilded tools.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="text-xs font-semibold uppercase tracking-wider text-[#121C33] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All New Formulations</span>
            <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
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
