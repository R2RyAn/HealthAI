import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNutrition } from "../contexts/NutritionContext";

const AddMeal = () => {
  const navigation = useNavigation();
  const { addProduct } = useNutrition();

  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const handleAddMeal = () => {
    // Validate inputs
    if (!mealName.trim()) {
      Alert.alert("Error", "Please enter a meal name");
      return;
    }

    if (!calories || !protein || !carbs || !fat) {
      Alert.alert("Error", "Please fill in all nutrition values");
      return;
    }

    const caloriesNum = parseFloat(calories);
    const proteinNum = parseFloat(protein);
    const carbsNum = parseFloat(carbs);
    const fatNum = parseFloat(fat);

    if (
      isNaN(caloriesNum) ||
      isNaN(proteinNum) ||
      isNaN(carbsNum) ||
      isNaN(fatNum)
    ) {
      Alert.alert("Error", "Please enter valid numbers");
      return;
    }

    // Create meal object
    const meal = {
      name: mealName.trim(),
      calories: caloriesNum,
      proteins: proteinNum,
      carbs: carbsNum,
      fats: fatNum,
      brand: "Manual Entry",
      barcode: "",
      image: "",
    };

    // Add to nutrition context
    addProduct(meal);

    // Show success message
    Alert.alert("Success", "Meal added successfully!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleReset = () => {
    setMealName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
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
        <Text style={styles.headerTitle}>Add Meal</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Meal Name Input */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Meal Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter meal name (e.g., Breakfast, Lunch, Snack)"
          value={mealName}
          onChangeText={setMealName}
          placeholderTextColor="#999"
        />
      </View>

      {/* Nutrition Inputs */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Nutrition Information</Text>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Calories</Text>
            <TextInput
              style={styles.numberInput}
              placeholder="0"
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Protein (g)</Text>
            <TextInput
              style={styles.numberInput}
              placeholder="0"
              value={protein}
              onChangeText={setProtein}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Carbs (g)</Text>
            <TextInput
              style={styles.numberInput}
              placeholder="0"
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Fat (g)</Text>
            <TextInput
              style={styles.numberInput}
              placeholder="0"
              value={fat}
              onChangeText={setFat}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </View>

      {/* Quick Add Buttons */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Quick Add Common Meals</Text>
        <View style={styles.quickAddGrid}>
          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => {
              setMealName("Breakfast");
              setCalories("300");
              setProtein("20");
              setCarbs("30");
              setFat("10");
            }}
          >
            <Icon name="food-croissant" size={24} color="#0066cc" />
            <Text style={styles.quickAddText}>Breakfast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => {
              setMealName("Lunch");
              setCalories("500");
              setProtein("25");
              setCarbs("50");
              setFat("20");
            }}
          >
            <Icon name="food" size={24} color="#0066cc" />
            <Text style={styles.quickAddText}>Lunch</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => {
              setMealName("Dinner");
              setCalories("600");
              setProtein("30");
              setCarbs("60");
              setFat("25");
            }}
          >
            <Icon name="food-variant" size={24} color="#0066cc" />
            <Text style={styles.quickAddText}>Dinner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => {
              setMealName("Snack");
              setCalories("150");
              setProtein("5");
              setCarbs("20");
              setFat("5");
            }}
          >
            <Icon name="food-apple" size={24} color="#0066cc" />
            <Text style={styles.quickAddText}>Snack</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Icon name="refresh" size={20} color="#666" />
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddMeal}>
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Meal</Text>
        </TouchableOpacity>
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
  inputSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  inputContainer: {
    width: "48%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 6,
  },
  numberInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    textAlign: "center",
  },
  quickAddGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickAddButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "48%",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  quickAddText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    marginRight: 8,
    justifyContent: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginLeft: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066cc",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginLeft: 8,
  },
});

export default AddMeal;
