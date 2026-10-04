import React from 'react';
import { Order } from '../types/product';
import { formatPrice } from '../utils/pricing';
import { CheckCircle2, PackageCheck, Sparkles, ArrowRight, Truck, Home } from 'lucide-react';
import { RoyalPackagingVisual } from './RoyalPackagingVisual';

interface OrderConfirmationModalProps {
  order: Order | null;
  onContinueShopping: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onContinueShopping,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-[#E8E4DC] overflow-hidden my-8">
        {/* Celebration Header */}
        <div className="bg-[#121C33] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-[#1D2B4D] border-2 border-[#C9A96E] flex items-center justify-center mx-auto mb-4 text-[#C9A96E] shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold block mb-1">
            Order Confirmed
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#F9F6EE] mb-2">
            Thank You, {order.shippingAddress.firstName}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Your order has been placed successfully. We are preparing your formulations in our signature
            dark royal packaging.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-[#0E1629] px-4 py-1.5 rounded-full border border-[#23345B] text-xs font-mono text-[#F7E7CE]">
            <span>Order Reference:</span>
            <strong className="text-[#C9A96E] tracking-wider">{order.id}</strong>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Shipping & Delivery ETA Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E4DC] text-xs text-[#525763]">
            <div>
              <span className="font-bold text-[#121C33] block uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C9A96E]" /> Delivery Estimate
              </span>
              <p className="font-medium text-[#121C33]">{order.deliveryOption.name}</p>
              <p>{order.deliveryOption.estimatedDays}</p>
              <p className="text-[11px] text-slate-400 mt-1">Tracking updates sent to {order.shippingAddress.email}</p>
            </div>

            <div>
              <span className="font-bold text-[#121C33] block uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#C9A96E]" /> Shipping Destination
              </span>
              <p className="text-[#121C33] font-medium">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.address} {order.shippingAddress.apartment}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#121C33] uppercase tracking-wider mb-3">
              Itemized Formulations
            </h3>
            <div className="divide-y divide-[#EAE7E1] border-y border-[#EAE7E1]">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-lg bg-[#FAF9F5] border border-[#EAE7E1] overflow-hidden shrink-0">
                    <RoyalPackagingVisual
                      product={item.product}
                      selectedShade={item.selectedShade}
                      className="w-full h-full object-cover"
                      showLabel={false}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-[#121C33] truncate">
                      {item.product.name}
                    </h4>
                    {item.selectedShade && (
                      <p className="text-[11px] text-[#6C727F] truncate">
                        Shade: {item.selectedShade.name}
                      </p>
                    )}
                    <span className="text-[11px] text-slate-500 font-mono">Qty: {item.quantity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#121C33] tabular-nums block">
                      {formatPrice(item.unitPrice * item.quantity, order.currency)}
                    </span>
                    <span className="text-[10px] text-[#8C93A0] line-through tabular-nums">
                      {formatPrice(item.originalUnitPrice * item.quantity, order.currency)}
                    </span>
                    <span className="text-[9px] text-[#121C33] font-semibold bg-[#F5EFE6] px-1 py-0.2 rounded">
                      20% OFF
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Totals */}
          <div className="space-y-1.5 text-xs text-[#525763] pt-2">
            <div className="flex justify-between">
              <span>Original Retail Subtotal</span>
              <span className="line-through tabular-nums text-[#8C93A0]">
                {formatPrice(order.subtotal, order.currency)}
              </span>
            </div>
            <div className="flex justify-between text-[#121C33] font-semibold">
              <span className="flex items-center gap-1">
                <span>Promotional 20% Discount</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              </span>
              <span className="tabular-nums">-{formatPrice(order.savings, order.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping ({order.deliveryOption.name})</span>
              <span className="tabular-nums">
                {order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee, order.currency)}
              </span>
            </div>
            <div className="pt-2 border-t border-[#E8E4DC] flex justify-between text-base font-bold text-[#121C33]">
              <span>Final Total Paid</span>
              <span className="tabular-nums font-mono text-lg">
                {formatPrice(order.total, order.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 bg-[#FAF9F5] border-t border-[#E8E4DC] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            A confirmation receipt has been sent to your inbox.
          </span>
          <button
            onClick={onContinueShopping}
            className="w-full sm:w-auto px-6 py-3 bg-[#121C33] text-white rounded-lg font-semibold text-xs tracking-wider uppercase hover:bg-[#1C2C50] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
          </button>
        </div>
      </div>
    </div>
  );
};
