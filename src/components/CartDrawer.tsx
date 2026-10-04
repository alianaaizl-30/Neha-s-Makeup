import React from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import { X, Trash2, Heart, ArrowRight, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { RoyalPackagingVisual } from './RoyalPackagingVisual';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    currency,
    cartSummary,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThresholdUSD = 50;
  const freeShippingThreshold = currency === 'GBP' ? 40 : 50;
  const currentSubtotal =
    currency === 'GBP' ? cartSummary.saleSubtotalUSD * 0.79 : cartSummary.saleSubtotalUSD;
  const progressPercent = Math.min(100, Math.round((currentSubtotal / freeShippingThreshold) * 100));
  const amountRemaining = Math.max(0, freeShippingThreshold - currentSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col border-l border-[#E8E4DC]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E8E4DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#121C33]" />
              <h2 className="font-serif text-lg font-bold uppercase tracking-wider text-[#121C33]">
                Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 20% Discount Ribbon */}
          <div className="bg-[#121C33] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-[#23345B]">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-[#F7E7CE] font-bold">20% OFF Applied</span>
            </div>
            <span className="text-slate-300 font-mono text-[11px]">Automatic Savings</span>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F0ECE1] px-4 py-2.5 border-b border-[#E2DED5] text-xs">
            <div className="flex items-center justify-between font-medium text-[#1E2024] mb-1.5">
              <span>
                {amountRemaining === 0 ? (
                  <span className="text-[#2F683B] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> You've unlocked Free Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#121C33]">{formatPrice(amountRemaining, currency)}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#7A808C] font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#E0DCD2] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#121C33] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#EAE6DE] flex items-center justify-center text-[#7A808C] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#121C33] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#6C727F] max-w-xs mb-6">
                  Discover our modern, everyday makeup formulations with an automatic 20% discount on all products.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    onContinueShopping();
                  }}
                  className="px-6 py-2.5 bg-[#121C33] text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-[#1C2C50] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 bg-white rounded-xl border border-[#EAE7E1] shadow-2xs"
                >
                  {/* Item Image with Packaging preview */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FAF9F5] shrink-0 border border-[#EAE7E1]">
                    <RoyalPackagingVisual
                      product={item.product}
                      selectedShade={item.selectedShade}
                      className="w-full h-full object-cover"
                      showLabel={false}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-[#121C33] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-[#B8405E] p-1 -mr-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedShade && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#6C727F] mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: item.selectedShade.hex }}
                          />
                          <span className="truncate">{item.selectedShade.name}</span>
                        </div>
                      )}

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-bold text-[#121C33] tabular-nums">
                          {formatPrice(item.unitPrice, currency)}
                        </span>
                        <span className="text-[10px] text-[#8C93A0] line-through tabular-nums">
                          {formatPrice(item.originalUnitPrice, currency)}
                        </span>
                        <span className="text-[9px] font-semibold text-[#121C33] bg-[#F4EFE6] px-1 py-0.2 rounded">
                          -20%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#F5F2EB]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D5D0C5] rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-center min-w-[24px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Move to Wishlist */}
                      <button
                        onClick={() => {
                          addToWishlist(item.product);
                          removeFromCart(item.id);
                        }}
                        className="text-[11px] text-[#6C727F] hover:text-[#B8405E] flex items-center gap-1"
                      >
                        <Heart className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Itemized Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#E8E4DC] space-y-3">
              <div className="space-y-1.5 text-xs text-[#525763]">
                <div className="flex justify-between">
                  <span>Original Retail Subtotal</span>
                  <span className="line-through tabular-nums text-[#8C93A0]">
                    {cartSummary.formattedOriginalSubtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[#121C33] font-semibold">
                  <span className="flex items-center gap-1">
                    <span>20% Promotional Discount</span>
                    <span className="text-[10px] bg-[#121C33] text-[#F7E7CE] px-1 rounded">20% OFF</span>
                  </span>
                  <span className="tabular-nums">-{cartSummary.formattedSavings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#2F683B] font-medium">
                    {amountRemaining === 0 ? 'Free' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8E4DC] flex justify-between text-sm sm:text-base font-bold text-[#121C33]">
                  <span>Total</span>
                  <span className="tabular-nums">{cartSummary.formattedSaleSubtotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#121C33] text-white rounded-lg font-semibold text-xs tracking-wider uppercase hover:bg-[#1C2C50] transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
              </button>

              <button
                onClick={() => {
                  closeCart();
                  onContinueShopping();
                }}
                className="w-full py-2 text-center text-xs font-medium text-[#6C727F] hover:text-[#121C33] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
