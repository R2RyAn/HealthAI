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
import { useNutrition } from "../contexts/NutritionContext";

const Nutrition = () => {
  const navigation = useNavigation();
  const { totals, scannedProducts, resetTotals } = useNutrition();

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
      <Text style={styles.subtitle}>Track your daily nutrition</Text>

      {/* Totals Section */}
      <View style={styles.totalsSection}>
        <Text style={styles.sectionTitle}>Today's Totals</Text>
        <View style={styles.totalsGrid}>
          <View style={styles.totalCard}>
            <Text style={styles.totalValue}>{totals.calories}</Text>
            <Text style={styles.totalLabel}>Calories</Text>
          </View>
          <View style={styles.totalCard}>
            <Text style={styles.totalValue}>{totals.proteins.toFixed(1)}g</Text>
            <Text style={styles.totalLabel}>Protein</Text>
          </View>
          <View style={styles.totalCard}>
            <Text style={styles.totalValue}>{totals.carbs.toFixed(1)}g</Text>
            <Text style={styles.totalLabel}>Carbs</Text>
          </View>
          <View style={styles.totalCard}>
            <Text style={styles.totalValue}>{totals.fats.toFixed(1)}g</Text>
            <Text style={styles.totalLabel}>Fat</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("Scanner" as never)}
      >
        <Icon name="qrcode-scan" size={24} color="#fff" />
        <Text style={styles.scanButtonText}>Scan Food</Text>
      </TouchableOpacity>

      {scannedProducts.length > 0 && (
        <View style={styles.scannedFoodsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Scanned</Text>
            <TouchableOpacity onPress={resetTotals}>
              <Text style={styles.resetButton}>Reset</Text>
            </TouchableOpacity>
          </View>
          {scannedProducts.map((food, index) => (
            <View key={index} style={styles.foodCard}>
              <View style={styles.foodHeader}>
                <Text style={styles.foodName}>{food.name || "Product"}</Text>
                <Text style={styles.foodCalories}>{food.calories} kcal</Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>
                  Protein: {food.proteins}g
                </Text>
                <Text style={styles.nutritionLabel}>Carbs: {food.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Fat: {food.fats}g</Text>
              </View>
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
  totalsSection: {
    marginTop: 20,
    width: "100%",
  },
  totalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  totalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resetButton: {
    color: "#ff4444",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Nutrition;
