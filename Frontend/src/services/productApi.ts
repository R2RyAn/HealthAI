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
    const response = await fetch(
      `http://10.0.0.169:8080/api/products/${barcode}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);

    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network request failed - please check your connection");
    }

    // Check if it's a product not found error
    if (error instanceof Error && error.message === "Product not found") {
      throw new Error("Product not found in database");
    }

    // Generic error
    throw new Error("Failed to fetch product information");
  }
};
