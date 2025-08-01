import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { fetchProductByBarcode } from "../services/productApi";
import { useNutrition } from "../contexts/NutritionContext";
import { nutritionApi, NewNutritionEntry } from "../services/nutritionApi";

export default function Scanner() {
  const navigation = useNavigation();
  const { addProduct } = useNutrition();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState<"on" | "off">("off");
  const [showCheck, setShowCheck] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const isScanningRef = useRef(false);

  // Handle barcode/QR scan with useCallback for better performance
  const handleBarCodeScanned = useCallback(
    async (result: BarcodeScanningResult) => {
      // Immediately check if already scanning to prevent multiple calls
      if (isScanningRef.current || scanned) return;

      // Set scanning flag immediately
      isScanningRef.current = true;
      setScanned(true);
      setShowCheck(true);

      try {
        // Fetch product data from API
        const productData = await fetchProductByBarcode(result.data);

        // Convert to the format expected by nutrition context with local date
        const now = new Date();
        const localDate = new Date(
          now.getTime() - now.getTimezoneOffset() * 60000
        );
        const nutritionEntry: NewNutritionEntry = {
          entryDate: localDate.toISOString(),
          calories: productData.nutriments["energy-kcal"],
          protein: productData.nutriments.proteins,
          carbs: productData.nutriments.carbohydrates,
          fat: productData.nutriments.fat,
          mealType: "Lunch" as const,
          notes: productData.product_name,
        };

        // Add product to nutrition totals
        await nutritionApi.addNutritionEntry(nutritionEntry);

        // Show success message
        Alert.alert(
          "Product Added!",
          `${productData.product_name}\nCalories: ${productData.nutriments["energy-kcal"]} kcal\nProtein: ${productData.nutriments.proteins}g\nCarbs: ${productData.nutriments.carbohydrates}g\nFat: ${productData.nutriments.fat}g`,
          [{ text: "OK" }]
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Could not find product information. Please add manually.",
          [
            {
              text: "Add Manually",
              onPress: () => navigation.navigate("AddMeal" as never),
            },
            { text: "Cancel" },
          ]
        );
      }

      // Show checkmark for 1 second, then go back to previous page
      setTimeout(() => {
        setShowCheck(false);
        // Use the same navigation method as the back button
        navigation.navigate("Home" as never);
      }, 1000);

      console.log("Scanned:", result.data, result.type);
    },
    [scanned, navigation, addProduct]
  );

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate("Home" as never)}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code128",
            "itf14",
          ],
        }}
        onBarcodeScanned={
          isScanningRef.current ? undefined : handleBarCodeScanned
        }
        enableTorch={flash === "on"}
      >
        <View style={styles.overlay}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Home" as never)}
          >
            <Icon name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Flash Button */}
          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => setFlash(flash === "on" ? "off" : "on")}
          >
            <Icon
              name={flash === "on" ? "flash" : "flash-off"}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <View style={styles.frame} />

          {showCheck && (
            <View style={styles.checkmarkContainer}>
              <Icon name="check-circle" size={100} color="#4BB543" />
            </View>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 30,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  flashButton: {
    position: "absolute",
    top: 40,
    right: 30,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 8,
  },
  checkmarkContainer: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0066cc",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  text: { color: "#fff", textAlign: "center", marginBottom: 20 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
