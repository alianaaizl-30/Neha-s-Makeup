import React, { useState } from 'react';
import { Product, Shade } from '../types/product';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { RoyalPackagingVisual } from './RoyalPackagingVisual';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const { currency, addToCart, addToWishlist, isInWishlist, openQuickView } = useCart();
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(
    product.shades.length > 0 ? product.shades[0] : undefined
  );
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedShade, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      openQuickView(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-xl border border-[#EAE7E1] hover:border-[#121C33]/30 transition-all duration-200 overflow-hidden cursor-pointer shadow-xs hover:shadow-md"
    >
      {/* Visual Presentation Area: Product + Packaging */}
      <div className="relative aspect-4/3 sm:aspect-square bg-[#FAF9F5] overflow-hidden">
        <RoyalPackagingVisual
          product={product}
          selectedShade={selectedShade}
          className="w-full h-full"
        />

        {/* 20% OFF Badge (Top-left) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          <span className="bg-[#121C33] text-[#F7E7CE] text-[10px] sm:text-[11px] font-bold tracking-wider px-2 py-0.5 rounded shadow-sm border border-[#23345B]">
            20% OFF
          </span>
          {product.bestSeller && (
            <span className="bg-[#C9A96E] text-[#121C33] text-[9px] font-semibold tracking-wider px-1.5 py-0.5 rounded shadow-xs uppercase">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button (Top-right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#2A2E35] hover:text-[#B8405E] transition-colors shadow-sm"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          title={isFavorited ? 'In wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited ? 'fill-[#B8405E] text-[#B8405E] scale-110' : 'hover:scale-110'
            }`}
          />
        </button>

        {/* Quick View Hover Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 bg-white/95 text-[#121C33] text-xs font-medium rounded-full shadow-md flex items-center gap-1.5 hover:bg-[#121C33] hover:text-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        {/* Anti-Slop Zero-Pill Metadata */}
        <div className="flex items-center justify-between text-xs text-[#6C727F] mb-1">
          <div className="flex items-center gap-1.5 truncate">
            <span className="uppercase tracking-wider text-[11px] font-medium text-[#8C93A0]">
              {product.category}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-[11px] truncate text-[#6C727F]">{product.subcategory}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#1E2024] shrink-0">
            <Star className="w-3 h-3 fill-[#C9A96E] text-[#C9A96E]" />
            <span className="tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="text-[#8C93A0] tabular-nums">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-sm sm:text-base font-bold text-[#121C33] group-hover:text-[#1F315B] transition-colors line-clamp-1 mb-2">
          {product.name}
        </h3>

        {/* Interactive Shade Swatches (if available) */}
        {product.shades.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {product.shades.slice(0, 6).map((shade) => (
                <button
                  key={shade.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedShade(shade);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedShade?.id === shade.id
                      ? 'scale-125 ring-2 ring-[#121C33] ring-offset-1 border-white'
                      : 'border-black/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: shade.hex }}
                  title={shade.name}
                  aria-label={shade.name}
                />
              ))}
              {product.shades.length > 6 && (
                <span className="text-[10px] text-[#7C828D] pl-1 tabular-nums font-medium">
                  +{product.shades.length - 6}
                </span>
              )}
            </div>
            {selectedShade && (
              <p className="text-[11px] text-[#5A606B] truncate mt-0.5">
                Shade: <span className="font-medium text-[#1E2024]">{selectedShade.name}</span>
              </p>
            )}
          </div>
        )}

        {/* Price & Action Row */}
        <div className="mt-auto pt-2 border-t border-[#F0ECE1] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {/* Discounted Sale Price */}
            <span className="text-base sm:text-lg font-bold text-[#121C33] tabular-nums">
              {formatPrice(product.salePrice, currency)}
            </span>
            {/* Original Strikethrough Price */}
            <span className="text-xs text-[#8C93A0] line-through tabular-nums">
              {formatPrice(product.originalPrice, currency)}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-[#121C33] text-white hover:bg-[#1C2C50] active:scale-95'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
