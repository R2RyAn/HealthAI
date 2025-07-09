import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function Scanner() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState<"on" | "off">("off");
  const [showCheck, setShowCheck] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Handle barcode/QR scan with useCallback for better performance
  const handleBarCodeScanned = useCallback(
    (result: BarcodeScanningResult) => {
      if (scanned) return;

      setScanned(true);
      setShowCheck(true);

      // Show checkmark for 1 second, then go back to previous page
      setTimeout(() => {
        setShowCheck(false);
        // Use the same navigation method as the back button
        navigation.navigate("Home" as never);
      }, 1000);

      // You can handle the scanned data here (e.g., save to state, call API, etc.)
      console.log("Scanned:", result.data, result.type);
    },
    [scanned, navigation]
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
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
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
