import React from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import { Product } from '../types/product';
import { Heart, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { RoyalPackagingVisual } from './RoyalPackagingVisual';

interface WishlistViewProps {
  onBackToStore: () => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  onBackToStore,
  onSelectProduct,
}) => {
  const { wishlist, removeFromWishlist, moveToCartFromWishlist, currency } = useCart();

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E4DC]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="p-2 text-slate-500 hover:text-[#121C33] rounded-md transition-colors"
              aria-label="Back to store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#121C33]">
                Your Saved Wishlist
              </h1>
              <p className="text-xs text-[#5B606B]">
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later · All eligible for 20% discount
              </p>
            </div>
          </div>

          <button
            onClick={onBackToStore}
            className="text-xs font-semibold uppercase tracking-wider text-[#121C33] hover:underline flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E4DC] p-8 max-w-md mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF9F5] border border-[#E8E4DC] flex items-center justify-center text-[#7A808C] mx-auto mb-4">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#121C33] mb-1">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-[#6C727F] mb-6 leading-relaxed">
              Explore our modern makeup collection. Tap the heart on any product to save your favorite formulations and shades.
            </p>
            <button
              onClick={onBackToStore}
              className="px-6 py-3 bg-[#121C33] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#1C2C50] transition-colors"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#EAE7E1] hover:border-[#121C33]/30 transition-all flex flex-col overflow-hidden shadow-xs"
              >
                <div
                  onClick={() => onSelectProduct(product)}
                  className="aspect-square bg-[#FAF9F5] cursor-pointer overflow-hidden relative"
                >
                  <RoyalPackagingVisual
                    product={product}
                    className="w-full h-full object-cover"
                    showLabel={false}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#121C33] text-[#F7E7CE] text-[10px] font-bold px-2 py-0.5 rounded">
                    20% OFF
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A808C] uppercase tracking-wider font-medium">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif text-sm font-bold text-[#121C33] hover:underline cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm font-bold text-[#121C33] tabular-nums">
                        {formatPrice(product.salePrice, currency)}
                      </span>
                      <span className="text-xs text-[#8C93A0] line-through tabular-nums">
                        {formatPrice(product.originalPrice, currency)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F0ECE1] flex items-center gap-2">
                    <button
                      onClick={() => moveToCartFromWishlist(product)}
                      className="flex-1 py-2 px-3 bg-[#121C33] text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-[#1C2C50] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2 text-slate-400 hover:text-[#B8405E] border border-[#E2DED5] rounded-lg hover:border-[#B8405E] transition-colors"
                      aria-label="Remove item"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
