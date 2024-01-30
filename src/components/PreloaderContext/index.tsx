import React, { createContext, useContext, useState } from "react";

// Step 1: Create a new context
const PreloaderContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

// Step 2: Define a PreloaderProvider component
export function PreloaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return <PreloaderContext.Provider value={{ loading, setLoading }}>{children}</PreloaderContext.Provider>;
}

// Step 4: Create a custom hook
export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
}
