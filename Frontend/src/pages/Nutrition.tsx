import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useScannedFood } from "../hooks/useScannedFood";

const Nutrition = () => {
  const navigation = useNavigation();
  const { scannedFoods } = useScannedFood();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Text style={styles.title}>Nutrition</Text>
      <Text style={styles.subtitle}>Your meal plans will appear here</Text>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("Scanner" as never)}
      >
        <Icon name="qrcode-scan" size={24} color="#fff" />
        <Text style={styles.scanButtonText}>Scan Food</Text>
      </TouchableOpacity>
      {scannedFoods.length > 0 && (
        <View style={styles.scannedFoodsSection}>
          <Text style={styles.sectionTitle}>Recently Scanned</Text>
          {scannedFoods.map((food, index) => (
            <View key={index} style={styles.foodCard}>
              <View style={styles.foodHeader}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodCalories}>{food.calories} kcal</Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>
                  Protein: {food.protein}g
                </Text>
                <Text style={styles.nutritionLabel}>Carbs: {food.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Fat: {food.fat}g</Text>
              </View>
              <Text style={styles.foodTimestamp}>
                Scanned: {food.timestamp.toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  scanButton: {
    backgroundColor: "#0066cc",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  scannedFoodsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  foodCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  foodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  foodCalories: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0066cc",
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#666",
  },
  foodTimestamp: {
    fontSize: 10,
    color: "#999",
    fontStyle: "italic",
  },
});

export default Nutrition;
