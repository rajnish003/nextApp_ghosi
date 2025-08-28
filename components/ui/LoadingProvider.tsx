"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setLoadingWithTimeout: (duration?: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  const setLoadingWithTimeout = useCallback((duration: number = 500) => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, duration);
  }, [startLoading, stopLoading]);

  const value = {
    isLoading,
    startLoading,
    stopLoading,
    setLoadingWithTimeout
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}