import React, { useState } from 'react';
import { Product, Shade } from '../types/product';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { RoyalPackagingVisual } from './RoyalPackagingVisual';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectRelated: (product: Product) => void;
  relatedProducts: Product[];
  onOpenCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSelectRelated,
  relatedProducts,
  onOpenCheckout,
}) => {
  const { currency, addToCart, addToWishlist, isInWishlist } = useCart();
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(
    product.shades.length > 0 ? product.shades[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'how-to-use' | 'ingredients' | 'reviews'>('how-to-use');
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedShade, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedShade, quantity);
    onOpenCheckout();
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6C727F] mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[#121C33] hover:underline font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Store</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#121C33] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Contiguous PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E8E4DC] shadow-xs mb-12">
          {/* Left: Product & Royal Packaging Presentation */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#EAE7E1]">
              <RoyalPackagingVisual
                product={product}
                selectedShade={selectedShade}
                className="w-full h-full object-cover"
              />

              {/* 20% OFF Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#121C33] text-[#F7E7CE] text-xs font-bold tracking-wider px-3 py-1 rounded shadow-md border border-[#23345B]">
                  20% OFF
                </span>
              </div>
            </div>

            {/* Packaging Brand Promise Note */}
            <div className="bg-[#121C33] text-white p-4 rounded-xl border border-[#23345B] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1D2B4D] border border-[#C9A96E]/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#C9A96E]" />
              </div>
              <div className="text-xs">
                <span className="font-serif font-semibold tracking-wider text-[#F7E7CE] uppercase block">
                  NEHA'S MAKEUP Signature Box Included
                </span>
                <span className="text-slate-300">
                  Shipped in our slightly dark royal blue soft-touch protective box with gold foil.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#6C727F] mb-2">
              <span className="uppercase tracking-widest font-semibold text-[#8C93A0]">
                {product.category} · {product.subcategory}
              </span>
              <div className="flex items-center gap-1.5 font-medium text-[#1E2024]">
                <div className="flex items-center text-[#C9A96E]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#C9A96E]'
                          : 'fill-none stroke-[#C9A96E]'
                      }`}
                    />
                  ))}
                </div>
                <span className="tabular-nums font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-[#8C93A0] tabular-nums">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121C33] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Pricing Module with Consistent 20% Calculation */}
            <div className="flex items-baseline gap-3 p-3.5 rounded-lg bg-[#FAF9F5] border border-[#EAE7E1] mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-[#121C33] tabular-nums">
                {formatPrice(product.salePrice, currency)}
              </span>
              <span className="text-base text-[#8C93A0] line-through tabular-nums">
                {formatPrice(product.originalPrice, currency)}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#121C33] text-[#F7E7CE] text-xs font-bold uppercase tracking-wider">
                Save 20%
              </span>
              <span className="ml-auto text-xs text-[#4E7D56] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#525763] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Shade Selection Module */}
            {product.shades.length > 0 && (
              <div className="mb-6 p-4 rounded-xl border border-[#EAE7E1] bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#121C33] tracking-wide uppercase">
                    Select Shade:
                  </span>
                  <span className="text-xs font-medium text-[#121C33]">
                    {selectedShade ? selectedShade.name : 'Choose a shade'}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.shades.map((shade) => {
                    const isSelected = selectedShade?.id === shade.id;
                    return (
                      <button
                        key={shade.id}
                        onClick={() => setSelectedShade(shade)}
                        className={`group relative p-1.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'border-[#121C33] bg-[#FAF9F5] ring-2 ring-[#121C33]/20 shadow-xs'
                            : 'border-[#EAE7E1] hover:border-slate-400 bg-white'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full border shadow-xs transition-transform ${
                            isSelected ? 'scale-105 border-white ring-2 ring-[#121C33]' : 'border-black/10'
                          }`}
                          style={{ backgroundColor: shade.hex }}
                        />
                        <span className="text-[10px] text-center text-[#4A4F57] font-medium leading-tight truncate w-full">
                          {shade.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector + Add to Bag & Buy Now */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D5D0C5] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#F2EEE4] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-sm font-semibold tabular-nums min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-2.5 text-sm font-bold text-slate-700 hover:bg-[#F2EEE4] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#121C33] text-white hover:bg-[#1C2C50] active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C9A96E]" />
                      <span>Add to Bag · {formatPrice(product.salePrice * quantity, currency)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => addToWishlist(product)}
                  className="p-3 border border-[#D5D0C5] rounded-lg hover:border-[#121C33] text-slate-700 transition-colors"
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#B8405E] text-[#B8405E]' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-4 rounded-lg font-semibold text-xs tracking-wider uppercase bg-[#C9A96E] text-[#121C33] hover:bg-[#BFA063] transition-all shadow-xs active:scale-98 cursor-pointer text-center"
              >
                Instant Checkout (20% OFF)
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-4 border-t border-[#EAE7E1] space-y-2 text-xs text-[#525763]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>
                  Free Standard Shipping to United States & United Kingdom over{' '}
                  {currency === 'USD' ? '$50' : '£40'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>30-Day Hassle-Free Returns & Shade Exchange Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>Clean ingredients · Vegan & 100% Leaping Bunny Cruelty-Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details: How to Use, Ingredients, Reviews */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DC] mb-12">
          <div className="flex items-center gap-6 border-b border-[#E8E4DC] pb-4 mb-6">
            <button
              onClick={() => setActiveTab('how-to-use')}
              className={`text-xs sm:text-sm font-semibold tracking-wider uppercase pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'how-to-use' ? 'text-[#121C33]' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              How To Use
              {activeTab === 'how-to-use' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#121C33]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`text-xs sm:text-sm font-semibold tracking-wider uppercase pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'ingredients' ? 'text-[#121C33]' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Ingredients & Formula
              {activeTab === 'ingredients' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#121C33]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-xs sm:text-sm font-semibold tracking-wider uppercase pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'reviews' ? 'text-[#121C33]' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Reviews ({product.reviewCount})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#121C33]" />
              )}
            </button>
          </div>

          <div>
            {activeTab === 'how-to-use' && (
              <div className="space-y-4 max-w-2xl text-sm text-[#525763] leading-relaxed">
                <p>{product.howToUse}</p>
                <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#EAE7E1] text-xs">
                  <span className="font-semibold text-[#121C33] block mb-1">
                    Neha's Pro Beauty Tip:
                  </span>
                  Always allow each layer 30 seconds to set before applying additional powder or cream formulas for a crease-resistant, natural skin radiance that lasts all day.
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="max-w-2xl text-xs sm:text-sm text-[#525763] leading-relaxed space-y-3">
                <p className="font-mono text-xs text-[#6C727F] bg-[#FAF9F5] p-4 rounded-lg border border-[#EAE7E1]">
                  {product.ingredients}
                </p>
                <p className="text-xs text-slate-500">
                  Formulated without parabens, sulfates, phthalates, synthetic fragrance, or mineral oil. Dermatologist-tested and non-comedogenic.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF9F5] border border-[#EAE7E1]">
                  <div className="text-center pr-4 border-r border-[#E2DED5]">
                    <span className="font-serif text-3xl font-bold text-[#121C33]">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="block text-[11px] text-slate-500">out of 5.0</span>
                  </div>
                  <div className="text-xs text-[#525763]">
                    <span className="font-semibold text-[#121C33] block">
                      Based on {product.reviewCount} Verified Purchases
                    </span>
                    98% of customers would recommend this formulation to a friend.
                  </div>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4">
                  <div className="border-b border-[#EAE7E1] pb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-[#121C33]">Sarah M. (New York, US)</span>
                      <span className="text-slate-400">Verified Buyer · 2 days ago</span>
                    </div>
                    <div className="flex items-center text-[#C9A96E] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C9A96E]" />
                      ))}
                    </div>
                    <p className="text-xs text-[#525763]">
                      "The packaging alone feels like something that should cost double the price! The slightly dark royal box with the gold text is gorgeous on my vanity, and the formula blends so effortlessly without feeling heavy."
                    </p>
                  </div>

                  <div className="border-b border-[#EAE7E1] pb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-[#121C33]">Emma W. (London, UK)</span>
                      <span className="text-slate-400">Verified Buyer · 1 week ago</span>
                    </div>
                    <div className="flex items-center text-[#C9A96E] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C9A96E]" />
                      ))}
                    </div>
                    <p className="text-xs text-[#525763]">
                      "Ordered with the 20% discount to the UK and it arrived in 3 days. The shade match is spot on and the texture looks just like radiant healthy skin."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#121C33] mb-6">
              Complete Your Everyday Routine
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectRelated(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-xl border border-[#EAE7E1] p-3 hover:border-[#121C33]/40 transition-all cursor-pointer shadow-xs"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#FAF9F5] mb-2">
                    <RoyalPackagingVisual product={rel} className="w-full h-full" showLabel={false} />
                  </div>
                  <h3 className="font-serif text-xs font-bold text-[#121C33] line-clamp-1">
                    {rel.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-[#121C33]">
                      {formatPrice(rel.salePrice, currency)}
                    </span>
                    <span className="text-[10px] text-[#8C93A0] line-through">
                      {formatPrice(rel.originalPrice, currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
