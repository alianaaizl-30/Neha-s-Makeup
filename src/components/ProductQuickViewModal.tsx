import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Shade } from '../types/product';
import { formatPrice } from '../utils/pricing';
import { X, Star, ShoppingBag, Check } from 'lucide-react';
import { RoyalPackagingVisual } from './RoyalPackagingVisual';

export const ProductQuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, currency } = useCart();
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Set default shade when product loads
  React.useEffect(() => {
    if (quickViewProduct && quickViewProduct.shades.length > 0) {
      setSelectedShade(quickViewProduct.shades[0]);
    } else {
      setSelectedShade(undefined);
    }
    setQuantity(1);
    setIsAdded(false);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedShade, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl border border-[#E8E4DC]">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-800 rounded-full bg-white/80 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Image & Royal Packaging */}
          <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#EAE7E1]">
            <RoyalPackagingVisual
              product={quickViewProduct}
              selectedShade={selectedShade}
              className="w-full h-full"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6C727F] mb-1">
                <span className="uppercase tracking-wider font-semibold text-[#8C93A0]">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-[#1E2024]">
                  <Star className="w-3.5 h-3.5 fill-[#C9A96E] text-[#C9A96E]" />
                  <span className="font-semibold tabular-nums">{quickViewProduct.rating.toFixed(1)}</span>
                </div>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#121C33] mb-2">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-bold text-[#121C33] tabular-nums">
                  {formatPrice(quickViewProduct.salePrice, currency)}
                </span>
                <span className="text-xs text-[#8C93A0] line-through tabular-nums">
                  {formatPrice(quickViewProduct.originalPrice, currency)}
                </span>
                <span className="bg-[#121C33] text-[#F7E7CE] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                  20% OFF
                </span>
              </div>

              <p className="text-xs text-[#525763] line-clamp-3 mb-4 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Shades */}
              {quickViewProduct.shades.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-[#1E2024] font-medium mb-1.5">
                    <span>Shade: {selectedShade?.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {quickViewProduct.shades.map((shade) => (
                      <button
                        key={shade.id}
                        onClick={() => setSelectedShade(shade)}
                        className={`w-5 h-5 rounded-full border transition-all ${
                          selectedShade?.id === shade.id
                            ? 'scale-125 ring-2 ring-[#121C33] border-white'
                            : 'border-black/20 hover:scale-110'
                        }`}
                        style={{ backgroundColor: shade.hex }}
                        title={shade.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Add to Bag */}
            <div className="pt-4 border-t border-[#EAE7E1] flex items-center gap-3">
              <div className="flex items-center border border-[#D5D0C5] rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1.5 text-xs font-bold text-slate-700"
                >
                  -
                </button>
                <span className="px-2 py-1.5 text-xs font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1.5 text-xs font-bold text-slate-700"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#121C33] text-white hover:bg-[#1C2C50]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C9A96E]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
