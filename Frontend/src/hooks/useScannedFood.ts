import { useState } from "react";

interface ScannedFood {
  barcode: string;
  name?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  timestamp: Date;
}

export const useScannedFood = () => {
  const [scannedFoods, setScannedFoods] = useState<ScannedFood[]>([]);

  const addScannedFood = (barcode: string, foodData?: Partial<ScannedFood>) => {
    const newFood: ScannedFood = {
      barcode,
      timestamp: new Date(),
      ...foodData,
    };

    setScannedFoods((prev) => [newFood, ...prev]);
    return newFood;
  };

  const getScannedFood = (barcode: string) => {
    return scannedFoods.find((food) => food.barcode === barcode);
  };

  const clearScannedFoods = () => {
    setScannedFoods([]);
  };

  return {
    scannedFoods,
    addScannedFood,
    getScannedFood,
    clearScannedFoods,
  };
};
