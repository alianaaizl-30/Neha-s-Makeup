import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Shade, CartItem, Currency } from '../types/product';
import { computeCartSummary as calculateSummary } from '../utils/pricing';

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  currency: Currency;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  toastMessage: { text: string; type: 'success' | 'info' } | null;
  addToCart: (product: Product, shade?: Shade, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product, shade?: Shade) => void;
  setCurrency: (c: Currency) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  showToast: (text: string, type?: 'success' | 'info') => void;
  cartSummary: ReturnType<typeof calculateSummary>;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('nehas_makeup_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('nehas_makeup_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const stored = localStorage.getItem('nehas_makeup_currency');
      return stored === 'GBP' ? 'GBP' : 'USD';
    } catch {
      return 'USD';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('nehas_makeup_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nehas_makeup_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('nehas_makeup_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    const timer = setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 3200);
    return () => clearTimeout(timer);
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    showToast(`Currency updated to ${c === 'USD' ? 'USD ($)' : 'GBP (£)'}`, 'info');
  };

  const addToCart = (product: Product, shade?: Shade, quantity: number = 1) => {
    // If product has shades and no shade was passed, pick the first shade as fallback
    const resolvedShade = shade || (product.shades.length > 0 ? product.shades[0] : undefined);
    const cartItemId = `${product.id}-${resolvedShade ? resolvedShade.id : 'default'}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          product,
          selectedShade: resolvedShade,
          quantity,
          unitPrice: product.salePrice,
          originalUnitPrice: product.originalPrice,
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added "${product.name}"${resolvedShade ? ` (${resolvedShade.name})` : ''} to bag! (20% OFF applied)`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to your wishlist`);
    } else {
      removeFromWishlist(product.id);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showToast('Removed from wishlist', 'info');
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveToCartFromWishlist = (product: Product, shade?: Shade) => {
    addToCart(product, shade, 1);
    removeFromWishlist(product.id);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSummary = calculateSummary(cart, currency, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        isCartOpen,
        isSearchOpen,
        quickViewProduct,
        toastMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        setCurrency,
        openCart,
        closeCart,
        toggleCart,
        openSearch,
        closeSearch,
        openQuickView,
        closeQuickView,
        showToast,
        cartSummary,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
