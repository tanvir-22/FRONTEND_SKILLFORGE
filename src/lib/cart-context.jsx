"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "skillforge_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Corrupt or inaccessible storage — start with an empty cart.
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isLoaded]);

  function addItem(course) {
    setItems((prev) => {
      if (prev.some((item) => item.slug === course.slug)) return prev;
      return [
        ...prev,
        {
          slug: course.slug,
          title: course.title,
          price: course.price,
          coverImage: course.coverImage,
          instructor: course.instructor?.name,
        },
      ];
    });
  }

  function removeItem(slug) {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  }

  function isInCart(slug) {
    return items.some((item) => item.slug === slug);
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    isInCart,
    clearCart,
    itemCount: items.length,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
