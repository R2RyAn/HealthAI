import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductData } from "../services/productApi";

interface NutritionTotals {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface NutritionContextType {
  totals: NutritionTotals;
  scannedProducts: ProductData[];
  addProduct: (product: ProductData) => void;
  resetTotals: () => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(
  undefined
);

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error("useNutrition must be used within a NutritionProvider");
  }
  return context;
};

interface NutritionProviderProps {
  children: ReactNode;
}

export const NutritionProvider: React.FC<NutritionProviderProps> = ({
  children,
}) => {
  const [totals, setTotals] = useState<NutritionTotals>({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  });

  const [scannedProducts, setScannedProducts] = useState<ProductData[]>([]);

  const addProduct = (product: ProductData) => {
    setTotals((prev) => ({
      calories: prev.calories + (product.calories || 0),
      proteins: prev.proteins + (product.proteins || 0),
      fats: prev.fats + (product.fats || 0),
      carbs: prev.carbs + (product.carbs || 0),
    }));

    setScannedProducts((prev) => [product, ...prev]);
  };

  const resetTotals = () => {
    setTotals({
      calories: 0,
      proteins: 0,
      fats: 0,
      carbs: 0,
    });
    setScannedProducts([]);
  };

  return (
    <NutritionContext.Provider
      value={{
        totals,
        scannedProducts,
        addProduct,
        resetTotals,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};
