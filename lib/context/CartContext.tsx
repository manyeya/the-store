'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/lib/store-api/cart/types';
import { createCart } from '@/lib/store-api/cart';

interface CartContextType {
  items: CartItem[];
  addItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (productId: number, quantity: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.productId === productId);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { productId, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    setItems(currentItems => 
      currentItems.filter(item => item.productId !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Sync with server when meaningful cart changes occur
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Only sync if we have items and this isn't the initial load
    if (items.length > 0 && typeof window !== 'undefined') {
      // Get previous cart state
      const previousCart = localStorage.getItem('cart');
      const previousItems = previousCart ? JSON.parse(previousCart) : [];
      
      // Check if cart has actually changed
      const cartChanged = JSON.stringify(items) !== JSON.stringify(previousItems);
      
      if (cartChanged) {
        timeoutId = setTimeout(() => {
          createCart({
            userId: 1, // TODO: Replace with actual user ID
            products: items,
          }).catch(console.error);
        }, 2000);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [items]);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
