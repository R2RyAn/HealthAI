import { Alert } from "react-native";
import { authService } from "../services/auth";

export interface ProductData {
  name: string | null;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export const fetchProductByBarcode = async (
  barcode: string
): Promise<ProductData> => {
  try {
    const token = await authService.getToken();

    const response = await fetch(
      `http://10.0.0.169:8080/api/products/${barcode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      if (response.status === 403) {
        throw new Error("Unauthorized access");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.name === null) {
      throw new Error("Product not found in database");
    }

    return data;
  } catch (error) {
    throw new Error("Product not found");
  }
};
