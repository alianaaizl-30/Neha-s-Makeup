import { Currency } from '../types/product';

export const DISCOUNT_RATE = 0.20; // 20% OFF ALL PRODUCTS
export const DISCOUNT_PERCENTAGE_LABEL = '20% OFF';

// USD to GBP fixed nominal demo rate
export const USD_TO_GBP_RATE = 0.79;

/**
 * Calculates the exact discounted sale price with 20% off.
 * Strictly: originalPrice * 0.80, rounded to 2 decimal places.
 */
export function calculateSalePrice(originalPrice: number): number {
  return Math.round(originalPrice * (1 - DISCOUNT_RATE) * 100) / 100;
}

/**
 * Calculates customer savings for a given item or subtotal.
 */
export function calculateSavings(originalPrice: number): number {
  return Math.round(originalPrice * DISCOUNT_RATE * 100) / 100;
}

/**
 * Converts a base USD price to the chosen currency.
 */
export function convertCurrency(amountInUSD: number, currency: Currency): number {
  if (currency === 'GBP') {
    return Math.round(amountInUSD * USD_TO_GBP_RATE * 100) / 100;
  }
  return amountInUSD;
}

/**
 * Formats price in standard currency format ($XX.XX or £XX.XX).
 */
export function formatPrice(amountInUSD: number, currency: Currency = 'USD'): string {
  const converted = convertCurrency(amountInUSD, currency);
  const symbol = currency === 'GBP' ? '£' : '$';
  return `${symbol}${converted.toFixed(2)}`;
}

/**
 * Calculates the cart totals with strict adherence to 20% off across items.
 */
export function computeCartSummary(
  items: { originalUnitPrice: number; unitPrice: number; quantity: number }[],
  currency: Currency,
  shippingUSD: number = 0
) {
  const originalSubtotalUSD = items.reduce(
    (sum, item) => sum + item.originalUnitPrice * item.quantity,
    0
  );
  const saleSubtotalUSD = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const savingsUSD = Math.round((originalSubtotalUSD - saleSubtotalUSD) * 100) / 100;
  const totalUSD = saleSubtotalUSD + shippingUSD;

  return {
    originalSubtotalUSD,
    saleSubtotalUSD,
    savingsUSD,
    shippingUSD,
    totalUSD,
    formattedOriginalSubtotal: formatPrice(originalSubtotalUSD, currency),
    formattedSaleSubtotal: formatPrice(saleSubtotalUSD, currency),
    formattedSavings: formatPrice(savingsUSD, currency),
    formattedShipping: shippingUSD === 0 ? 'Free' : formatPrice(shippingUSD, currency),
    formattedTotal: formatPrice(totalUSD, currency),
  };
}
