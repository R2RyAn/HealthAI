import { Alert } from "react-native";
import { authService } from "../services/auth";

export interface ProductData {
  product_name: string;
  nutriments: {
    "energy-kcal": number;
    proteins: number;
    fat: number;
    carbohydrates: number;
  };
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
        throw new Error("Unauthorized access fetch by barcode");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.product_name) {
      throw new Error("Product not found in database");
    }

    return data;
  } catch (error) {
    throw new Error("Product not found");
  }
};
