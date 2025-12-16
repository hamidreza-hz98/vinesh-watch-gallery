"use client";

import { createContext, useContext } from "react";

const LandingDataContext = createContext(null);

export function useLandingData() {
  const ctx = useContext(LandingDataContext);
  
  if (!ctx) {
    throw new Error("useLandingData must be used within LandingDataProvider");
  }
  return ctx;
}

export default function LandingDataProvider({ data, children }) {
  return (
    <LandingDataContext.Provider value={data}>
      {children}
    </LandingDataContext.Provider>
  );
}
