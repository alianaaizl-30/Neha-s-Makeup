import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import { ShippingAddress, DeliveryOption, Order } from '../types/product';
import {
  Lock,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { RoyalPackagingVisual } from './RoyalPackagingVisual';

interface CheckoutViewProps {
  onBackToCart: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  onBackToCart,
  onOrderComplete,
}) => {
  const { cart, currency, cartSummary, clearCart } = useCart();

  const [contactEmail, setContactEmail] = useState('customer@example.com');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'customer@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: currency === 'GBP' ? 'United Kingdom' : 'United States',
  });

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Standard Royal Delivery',
      priceUSD: cartSummary.saleSubtotalUSD >= 50 ? 0 : 5.99,
      priceGBP: cartSummary.saleSubtotalUSD >= 50 ? 0 : 4.99,
      estimatedDays: '3–5 Business Days',
      description: 'Tracked carbon-neutral shipping with dark royal protective packaging',
    },
    {
      id: 'express',
      name: 'Priority Royal Courier',
      priceUSD: 12.0,
      priceGBP: 9.5,
      estimatedDays: '1–2 Business Days',
      description: 'Expedited air courier with signature requirement on delivery',
    },
  ];

  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(deliveryOptions[0]);

  // Payment form state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState('Eleanor Vance');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const shippingFee = currency === 'GBP' ? selectedDelivery.priceGBP : selectedDelivery.priceUSD;
  const grandTotalUSD = cartSummary.saleSubtotalUSD + (currency === 'GBP' ? shippingFee / 0.79 : shippingFee);

  const handleCountryChange = (country: 'United States' | 'United Kingdom') => {
    setShippingAddress((prev) => ({
      ...prev,
      country,
      state: country === 'United Kingdom' ? 'Greater London' : 'NY',
      postalCode: country === 'United Kingdom' ? 'SW1A 1AA' : '10001',
      city: country === 'United Kingdom' ? 'London' : 'New York',
    }));
  };

  const handleTestAutofill = () => {
    setShippingAddress({
      firstName: 'Sophia',
      lastName: 'Harcourt',
      email: 'sophia.harcourt@example.com',
      phone: currency === 'GBP' ? '+44 20 7946 0912' : '+1 (212) 555-0199',
      address: currency === 'GBP' ? '10 Kensington Palace Gardens' : '5th Avenue Suite 1800',
      apartment: 'Apt 12C',
      city: currency === 'GBP' ? 'London' : 'New York',
      state: currency === 'GBP' ? 'Greater London' : 'NY',
      postalCode: currency === 'GBP' ? 'W8 4PX' : '10022',
      country: currency === 'GBP' ? 'United Kingdom' : 'United States',
    });
    setContactEmail('sophia.harcourt@example.com');
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!contactEmail.includes('@')) errs.email = 'Valid email is required';
    if (!shippingAddress.firstName.trim()) errs.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) errs.lastName = 'Last name is required';
    if (!shippingAddress.address.trim()) errs.address = 'Street address is required';
    if (!shippingAddress.city.trim()) errs.city = 'City is required';
    if (!shippingAddress.postalCode.trim()) errs.postalCode = 'Postal code is required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
      const order: Order = {
        id: `NM-${randomOrderNum}`,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...cart],
        subtotal: cartSummary.originalSubtotalUSD,
        savings: cartSummary.savingsUSD,
        shippingFee,
        total: grandTotalUSD,
        currency,
        shippingAddress,
        deliveryOption: selectedDelivery,
        status: 'confirmed',
      };
      clearCart();
      onOrderComplete(order);
    }, 1200);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E4DC]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCart}
              className="p-2 text-slate-500 hover:text-[#121C33] rounded-md transition-colors"
              aria-label="Back to store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#121C33]">
                NEHA'S MAKEUP
              </span>
              <span className="text-xs text-slate-500 block">Secure Checkout</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#2F683B] font-medium bg-[#E8F3EB] px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Form: Contact, Shipping, Delivery, Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Demo Autofill helper */}
            <div className="p-3 bg-white border border-[#E8E4DC] rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-600">Quickly test checkout with demo shipping details:</span>
              <button
                type="button"
                onClick={handleTestAutofill}
                className="px-2.5 py-1 bg-[#FAF9F5] border border-[#D5D0C5] text-[#121C33] font-semibold rounded hover:bg-[#F0ECE1] cursor-pointer"
              >
                Autofill Demo Address
              </button>
            </div>

            {/* 1. Contact Information */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-xs">
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#121C33] mb-4 flex items-center justify-between">
                <span>1. Contact Information</span>
                <span className="text-xs font-normal text-slate-400">Step 1 of 4</span>
              </h2>

              <div>
                <label className="block text-xs font-medium text-[#4A4F57] mb-1.5">
                  Email Address for Order Confirmation
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white ${
                    formErrors.email ? 'border-red-500' : 'border-[#D5D0C5] focus:border-[#121C33]'
                  }`}
                  placeholder="you@example.com"
                  required
                />
                {formErrors.email && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>

            {/* 2. Shipping Address (USA / UK) */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-xs">
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#121C33] mb-4 flex items-center justify-between">
                <span>2. Shipping Destination</span>
                <span className="text-xs font-normal text-slate-400">Step 2 of 4</span>
              </h2>

              <div className="space-y-4">
                {/* Country Toggle */}
                <div>
                  <label className="block text-xs font-medium text-[#4A4F57] mb-1.5">
                    Country / Region
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleCountryChange('United States')}
                      className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                        shippingAddress.country === 'United States'
                          ? 'border-[#121C33] bg-[#121C33] text-white shadow-xs'
                          : 'border-[#D5D0C5] bg-[#FAF9F5] text-slate-700 hover:bg-white'
                      }`}
                    >
                      United States (USD)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCountryChange('United Kingdom')}
                      className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                        shippingAddress.country === 'United Kingdom'
                          ? 'border-[#121C33] bg-[#121C33] text-white shadow-xs'
                          : 'border-[#D5D0C5] bg-[#FAF9F5] text-slate-700 hover:bg-white'
                      }`}
                    >
                      United Kingdom (GBP)
                    </button>
                  </div>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white focus:border-[#121C33]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white focus:border-[#121C33]"
                      required
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white focus:border-[#121C33]"
                    placeholder="123 Beauty Lane"
                    required
                  />
                </div>

                {/* Apartment / Suite */}
                <div>
                  <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                    Apartment, Suite, Unit (Optional)
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.apartment || ''}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, apartment: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white focus:border-[#121C33]"
                    placeholder="Apt 4B"
                  />
                </div>

                {/* City, State, Postcode */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                      City / Town
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white focus:border-[#121C33]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                      {shippingAddress.country === 'United Kingdom' ? 'County / Region' : 'State'}
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, state: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white focus:border-[#121C33]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                      {shippingAddress.country === 'United Kingdom' ? 'Postcode' : 'ZIP Code'}
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white focus:border-[#121C33]"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                    Phone for Delivery Updates
                  </label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] focus:outline-none focus:bg-white focus:border-[#121C33]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-xs">
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#121C33] mb-4 flex items-center justify-between">
                <span>3. Delivery Method</span>
                <span className="text-xs font-normal text-slate-400">Step 3 of 4</span>
              </h2>

              <div className="space-y-3">
                {deliveryOptions.map((opt) => {
                  const fee = currency === 'GBP' ? opt.priceGBP : opt.priceUSD;
                  const isSelected = selectedDelivery.id === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedDelivery(opt)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#121C33] bg-[#FAF9F5] ring-2 ring-[#121C33]/20 shadow-xs'
                          : 'border-[#EAE7E1] hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="deliveryOption"
                          checked={isSelected}
                          onChange={() => setSelectedDelivery(opt)}
                          className="mt-1 text-[#121C33] focus:ring-[#121C33]"
                        />
                        <div>
                          <span className="font-semibold text-xs sm:text-sm text-[#121C33] block">
                            {opt.name} · {opt.estimatedDays}
                          </span>
                          <span className="text-xs text-[#525763]">{opt.description}</span>
                        </div>
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-[#121C33] tabular-nums shrink-0 ml-4">
                        {fee === 0 ? 'FREE' : formatPrice(fee, currency)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Payment */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#121C33]">
                  4. Payment Details
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CreditCard className="w-4 h-4 text-[#121C33]" />
                  <span>Stripe Gateway Ready</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] border border-[#E8E4DC] rounded-xl text-xs text-slate-600 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2F683B] shrink-0" />
                <span>
                  Demo Mode: No real charges are made. Enter any demo card or use the preset values below.
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] font-mono"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                      Expires (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A4F57] mb-1">
                      Security CVC
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-sm text-[#1E2024] font-mono"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC]">
                <h3 className="font-serif text-base font-bold text-[#121C33]">
                  Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                </h3>
                <span className="text-xs bg-[#121C33] text-[#F7E7CE] font-bold px-2 py-0.5 rounded">
                  20% OFF ALL
                </span>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs">
                    <div className="w-12 h-12 rounded-lg bg-[#FAF9F5] border border-[#E8E4DC] overflow-hidden shrink-0">
                      <RoyalPackagingVisual
                        product={item.product}
                        selectedShade={item.selectedShade}
                        className="w-full h-full object-cover"
                        showLabel={false}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#121C33] truncate">{item.product.name}</h4>
                      {item.selectedShade && (
                        <span className="text-[#6C727F] block truncate">
                          Shade: {item.selectedShade.name}
                        </span>
                      )}
                      <span className="text-slate-500 font-mono">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-[#121C33] tabular-nums block">
                        {formatPrice(item.unitPrice * item.quantity, currency)}
                      </span>
                      <span className="text-[10px] text-[#8C93A0] line-through tabular-nums">
                        {formatPrice(item.originalUnitPrice * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strict Itemized Calculation Breakdown */}
              <div className="pt-4 border-t border-[#E8E4DC] space-y-2 text-xs text-[#525763]">
                <div className="flex justify-between">
                  <span>Original Retail Subtotal</span>
                  <span className="line-through tabular-nums text-[#8C93A0]">
                    {cartSummary.formattedOriginalSubtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[#121C33] font-semibold">
                  <span className="flex items-center gap-1">
                    <span>20% Promotional Discount</span>
                    <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                  </span>
                  <span className="tabular-nums">-{cartSummary.formattedSavings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping ({selectedDelivery.name})</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee, currency)}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E8E4DC] flex justify-between text-base font-bold text-[#121C33]">
                  <span>Total Amount Due</span>
                  <span className="tabular-nums font-mono text-lg">
                    {formatPrice(
                      cartSummary.saleSubtotalUSD + (currency === 'GBP' ? shippingFee / 0.79 : shippingFee),
                      currency
                    )}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 bg-[#121C33] text-white rounded-xl font-semibold text-xs tracking-wider uppercase hover:bg-[#1C2C50] transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <span>
                    Place Order · {formatPrice(
                      cartSummary.saleSubtotalUSD + (currency === 'GBP' ? shippingFee / 0.79 : shippingFee),
                      currency
                    )}
                  </span>
                )}
              </button>

              <div className="text-[11px] text-[#7A808C] text-center space-y-1">
                <p>Packaged in our signature dark royal protective boxes with gold embossing.</p>
                <p>30-Day Hassle-Free Returns & Shade Exchange Guarantee.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
