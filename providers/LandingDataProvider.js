"use client";

import { createContext, useContext, useState, useCallback } from "react";

const LandingDataContext = createContext(null);

export function useLandingData() {
  const ctx = useContext(LandingDataContext);

  if (!ctx) {
    throw new Error("useLandingData must be used within LandingDataProvider");
  }
  return ctx;
}

export default function LandingDataProvider({ data, children }) {
  const [cart, setCart] = useState(data.cart);

  // Optionally, wrap other data in state if you want to update them too
  const [categories] = useState(data.categories);
  const [brands] = useState(data.brands);
  const [settings] = useState(data.settings);

  // Function to add/update a product in the cart
  const updateCart = useCallback((updatedCart) => {
    setCart(updatedCart);
  }, []);

  return (
    <LandingDataContext.Provider
      value={{
        cart,
        setCart: updateCart,
        categories,
        brands,
        settings,
      }}
    >
      {children}
    </LandingDataContext.Provider>
  );
}
