import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { nutritionApi, NewNutritionEntry } from "../services/nutritionApi";

const AddMeal = () => {
  const navigation = useNavigation();

  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [mealType, setMealType] = useState<
    "Breakfast" | "Lunch" | "Dinner" | "Snack"
  >("Lunch");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddMeal = async () => {
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

    setIsSubmitting(true);

    try {
      // Create nutrition entry for backend with local date
      const now = new Date();
      const localDate = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      );
      const nutritionEntry: NewNutritionEntry = {
        entryDate: localDate.toISOString(),
        calories: caloriesNum,
        protein: proteinNum,
        carbs: carbsNum,
        fat: fatNum,
        mealType: mealType,
        notes: notes.trim() || `${mealName.trim()} - ${mealType}`,
      };

      console.log("Sending nutrition entry:", nutritionEntry);

      // Send to backend
      const result = await nutritionApi.addNutritionEntry(nutritionEntry);
      console.log("Nutrition entry added successfully:", result);

      // Show success message
      Alert.alert("Success", "Meal added successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to add meal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setMealName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setMealType("Lunch");
    setNotes("");
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

      {/* Meal Type Selection */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Meal Type</Text>
        <View style={styles.mealTypeContainer}>
          {(["Breakfast", "Lunch", "Dinner", "Snack"] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.mealTypeButton,
                mealType === type && styles.mealTypeButtonActive,
              ]}
              onPress={() => setMealType(type)}
            >
              <Text
                style={[
                  styles.mealTypeText,
                  mealType === type && styles.mealTypeTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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

      {/* Notes Input */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Notes (Optional)</Text>
        <TextInput
          style={[styles.textInput, styles.notesInput]}
          placeholder="Add any notes about this meal..."
          value={notes}
          onChangeText={setNotes}
          placeholderTextColor="#999"
          multiline
          numberOfLines={3}
        />
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

        <TouchableOpacity
          style={[styles.addButton, isSubmitting && styles.addButtonDisabled]}
          onPress={handleAddMeal}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Icon name="plus" size={20} color="#fff" />
          )}
          <Text style={styles.addButtonText}>
            {isSubmitting ? "Adding..." : "Add Meal"}
          </Text>
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
  addButtonDisabled: {
    backgroundColor: "#ccc",
  },
  mealTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  mealTypeButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14, // wider
    alignItems: "center",
    justifyContent: "center", // center vertically
    flex: 1,
    marginHorizontal: 4,
  },

  mealTypeButtonActive: {
    backgroundColor: "#0066cc",
  },

  mealTypeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    textAlign: "center", // center horizontally
  },

  mealTypeTextActive: {
    color: "#fff",
  },
  notesInput: {
    height: 80,
    textAlignVertical: "top",
  },
});

export default AddMeal;
