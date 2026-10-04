import React from 'react';
import { Product } from '../types/product';
import brushSetImg from '../assets/images/product_brush_set_royal_box_1790355978933.jpg';
import { formatPrice } from '../utils/pricing';
import { useCart } from '../context/CartContext';
import { Sparkles, ArrowRight, Check, Feather, ShieldCheck } from 'lucide-react';

interface BrushCollectionSpotlightProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreBrushes: () => void;
}

export const BrushCollectionSpotlight: React.FC<BrushCollectionSpotlightProps> = ({
  products,
  onSelectProduct,
  onExploreBrushes,
}) => {
  const { currency, addToCart } = useCart();
  const sovereignBrushSet = products.find((p) => p.id === 'nm-b-01');

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121C33] text-white rounded-3xl overflow-hidden shadow-xl border border-[#23345B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Image: Brush Set with Dark Royal Box */}
            <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 lg:aspect-square overflow-hidden bg-[#182442]">
              <img
                src={brushSetImg}
                alt="NEHA'S MAKEUP The Sovereign 10-Piece Luxury Brush Set with royal box"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-103"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#0A101E]/90 backdrop-blur-xs text-[#F7E7CE] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-[#23345B]">
                20% OFF Set Discount
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handcrafted Precision Tools</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F9F6EE] leading-tight mb-4">
                The Sovereign Brush Wardrobe
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Engineered with ultra-soft vegan silk micro-filaments that pick up and deposit pigment seamlessly. Weighted hardwood handles lacquered in signature dark royal navy, paired with champagne brass ferrules.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-[#C9A96E] shrink-0" />
                  <span>100% Vegan Micro-Silk</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                  <span>Zero Shedding Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C9A96E] shrink-0" />
                  <span>Dark Royal Gift Box Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9A96E] shrink-0" />
                  <span>10 Face & Eye Brushes</span>
                </div>
              </div>

              {/* Price & Actions */}
              {sovereignBrushSet && (
                <div className="pt-6 border-t border-[#23345B] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-[#F9F6EE] tabular-nums font-serif">
                      {formatPrice(sovereignBrushSet.salePrice, currency)}
                    </span>
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {formatPrice(sovereignBrushSet.originalPrice, currency)}
                    </span>
                    <span className="text-xs bg-[#C9A96E] text-[#121C33] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Save 20%
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => addToCart(sovereignBrushSet, undefined, 1)}
                      className="px-5 py-3 bg-[#C9A96E] text-[#121C33] rounded-lg font-semibold text-xs tracking-wider uppercase hover:bg-[#BFA063] transition-colors cursor-pointer text-center"
                    >
                      Add Set to Bag
                    </button>
                    <button
                      onClick={onExploreBrushes}
                      className="px-4 py-3 bg-[#1D2B4D] text-white border border-[#23345B] rounded-lg font-semibold text-xs tracking-wider uppercase hover:bg-[#283B69] transition-colors cursor-pointer text-center"
                    >
                      All Brushes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
