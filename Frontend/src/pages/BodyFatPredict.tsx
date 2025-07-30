import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { authService } from "../services/auth";

interface PredictionResponse {
  predicted_body_fat: number;
}

const BodyFatPredict = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setPrediction(null); // Reset previous prediction
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera permissions to make this work!"
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setPrediction(null); // Reset previous prediction
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image first");
      return;
    }

    setIsLoading(true);
    setPrediction(null);

    try {
      const token = await authService.getToken();
      if (!token) {
        Alert.alert("Error", "You are not authorized. Please login again.");
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", {
        uri: selectedImage,
        type: "image/jpeg",
        name: "body_photo.jpg",
      } as any);

      // Make API request
      const response = await fetch(
        "http://10.0.0.169:8080/api/bodyfat/predict",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.status === 403) {
        Alert.alert("Error", "You are not authorized to use this feature");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setPrediction(data.predicted_body_fat);
    } catch (error: any) {
      console.error("Upload error:", error);
      Alert.alert(
        "Upload Failed",
        error.message || "Failed to upload image. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    setPrediction(null);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#0066cc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Body Fat Prediction</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>How it works</Text>
        <Text style={styles.instructionsText}>
          Take a photo or select an image of your body to get an AI-powered
          estimate of your body fat percentage.
        </Text>
      </View>

      {/* Image Selection */}
      <View style={styles.imageSection}>
        <Text style={styles.sectionTitle}>Select Image</Text>

        <View style={styles.imageButtons}>
          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            <Icon name="camera" size={24} color="#0066cc" />
            <Text style={styles.imageButtonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Icon name="image" size={24} color="#0066cc" />
            <Text style={styles.imageButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Selected Image */}
        {selectedImage && (
          <View style={styles.selectedImageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={resetImage}
            >
              <Icon name="close-circle" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Upload Button */}
      {selectedImage && (
        <View style={styles.uploadSection}>
          <TouchableOpacity
            style={[
              styles.uploadButton,
              isLoading && styles.uploadButtonDisabled,
            ]}
            onPress={uploadImage}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Icon name="upload" size={20} color="#fff" />
            )}
            <Text style={styles.uploadButtonText}>
              {isLoading ? "Analyzing..." : "Analyze Image"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Prediction Result */}
      {prediction !== null && (
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Prediction Result</Text>
          <View style={styles.resultCard}>
            {prediction === -1 ? (
              <>
                <Icon name="alert-circle" size={32} color="#ff4444" />
                <Text style={styles.resultLabel}>No Body Detected</Text>
                <Text style={styles.resultValue}>
                  No body found in this picture
                </Text>
                <Text style={styles.resultDescription}>
                  Please ensure a clear image of a person is visible
                </Text>
              </>
            ) : (
              <>
                <Icon name="chart-line" size={32} color="#0066cc" />
                <Text style={styles.resultLabel}>Estimated Body Fat</Text>
                <Text style={styles.resultValue}>{prediction.toFixed(2)}%</Text>
                <Text style={styles.resultDescription}>
                  This is an AI-generated estimate based on your image
                </Text>
              </>
            )}
          </View>
        </View>
      )}

      {/* Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>Tips for better results</Text>
        <View style={styles.tipItem}>
          <Icon name="lightbulb-outline" size={16} color="#ff6b00" />
          <Text style={styles.tipText}>
            Ensure good lighting and clear visibility
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="lightbulb-outline" size={16} color="#ff6b00" />
          <Text style={styles.tipText}>
            Wear form-fitting clothing for more accurate results
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Icon name="lightbulb-outline" size={16} color="#ff6b00" />
          <Text style={styles.tipText}>
            This is an estimate and should not replace professional assessment
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
  instructionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  imageSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  imageButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginTop: 8,
    textAlign: "center",
  },
  selectedImageContainer: {
    position: "relative",
    alignItems: "center",
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0066cc",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  uploadButtonDisabled: {
    backgroundColor: "#ccc",
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginLeft: 8,
  },
  resultSection: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  tipsSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});

export default BodyFatPredict;
