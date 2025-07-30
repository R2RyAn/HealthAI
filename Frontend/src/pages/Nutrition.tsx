import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  nutritionApi,
  DailyTotals,
  NutritionEntry,
} from "../services/nutritionApi";

const Nutrition = () => {
  const navigation = useNavigation();
  const [dailyTotals, setDailyTotals] = useState<Record<string, DailyTotals>>(
    {}
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<"time" | "mealType">("time");

  useEffect(() => {
    loadNutritionData();
  }, [selectedDate]);

  // Reload data when screen comes into focus (e.g., after adding a meal)
  useFocusEffect(
    React.useCallback(() => {
      loadNutritionData();
    }, [])
  );

  const loadNutritionData = async () => {
    try {
      setIsLoading(true);
      const dateKey = selectedDate.toLocaleDateString("en-CA");
      const entries = await nutritionApi.getNutritionByDate(dateKey);

      // Create a single day entry
      const dailyTotal: DailyTotals = {
        calories: entries.reduce((sum, entry) => sum + entry.calories, 0),
        protein: entries.reduce((sum, entry) => sum + entry.protein, 0),
        carbs: entries.reduce((sum, entry) => sum + entry.carbs, 0),
        fat: entries.reduce((sum, entry) => sum + entry.fat, 0),
        meals: entries,
      };

      setDailyTotals({ [dateKey]: dailyTotal });
    } catch (error) {
      console.error("Load nutrition data error:", error);
      // If the specific date fails, try the general endpoint as fallback
      try {
        const data = await nutritionApi.getDailyTotals();
        setDailyTotals(data);
      } catch (fallbackError) {
        Alert.alert("Error", "Failed to load nutrition data");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNutritionData();
    setRefreshing(false);
  };

  const selectedDateKey = selectedDate.toLocaleDateString("en-CA");
  const todayData = dailyTotals[selectedDateKey] || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    meals: [],
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const toggleSort = () => {
    setSortBy(sortBy === "time" ? "mealType" : "time");
  };

  const getSortedMeals = () => {
    if (!todayData.meals || todayData.meals.length === 0) return [];

    return [...todayData.meals].sort((a, b) => {
      if (sortBy === "time") {
        return (
          new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
        );
      } else {
        // Sort by meal type: Breakfast, Lunch, Dinner, Snack
        const mealTypeOrder = { Breakfast: 0, Lunch: 1, Dinner: 2, Snack: 3 };
        return mealTypeOrder[a.mealType] - mealTypeOrder[b.mealType];
      }
    });
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case "Breakfast":
        return "food-croissant";
      case "Lunch":
        return "food";
      case "Dinner":
        return "food-variant";
      case "Snack":
        return "food-apple";
      default:
        return "food";
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Icon name="loading" size={48} color="#0066cc" />
        <Text style={styles.loadingText}>Loading nutrition data...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Nutrition</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddMeal" as never)}
        >
          <Icon name="plus" size={24} color="#0066cc" />
        </TouchableOpacity>
      </View>

      {/* Date Navigation */}
      <View style={styles.dateNavigation}>
        <TouchableOpacity style={styles.dateArrow} onPress={goToPreviousDay}>
          <Icon name="chevron-left" size={24} color="#0066cc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateDisplay} onPress={goToToday}>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <Text style={styles.dateSubtext}>
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateArrow} onPress={goToNextDay}>
          <Icon name="chevron-right" size={24} color="#0066cc" />
        </TouchableOpacity>
      </View>

      {/* Daily Totals Card */}
      <View style={styles.totalsCard}>
        <Text style={styles.totalsTitle}>
          {formatDate(selectedDate)}'s Totals
        </Text>
        <View style={styles.totalsGrid}>
          <View style={styles.totalItem}>
            <Icon name="fire" size={24} color="#ff6b00" />
            <Text style={styles.totalValue}>{todayData.calories}</Text>
            <Text style={styles.totalLabel}>Calories</Text>
          </View>
          <View style={styles.totalItem}>
            <Icon name="flag-outline" size={24} color="#0066cc" />
            <Text style={styles.totalValue}>
              {todayData.protein.toFixed(1)}g
            </Text>
            <Text style={styles.totalLabel}>Protein</Text>
          </View>
          <View style={styles.totalItem}>
            <Icon name="silverware-fork-knife" size={24} color="#666" />
            <Text style={styles.totalValue}>{todayData.carbs.toFixed(1)}g</Text>
            <Text style={styles.totalLabel}>Carbs</Text>
          </View>
          <View style={styles.totalItem}>
            <Icon name="fire" size={24} color="#ff6b00" />
            <Text style={styles.totalValue}>{todayData.fat.toFixed(1)}g</Text>
            <Text style={styles.totalLabel}>Fat</Text>
          </View>
        </View>
      </View>

      {/* Meals List */}
      <View style={styles.mealsSection}>
        <View style={styles.mealsHeader}>
          <Text style={styles.sectionTitle}>
            {formatDate(selectedDate)}'s Meals
          </Text>
          <TouchableOpacity style={styles.sortButton} onPress={toggleSort}>
            <Icon
              name={sortBy === "time" ? "clock-outline" : "food-variant"}
              size={20}
              color="#0066cc"
            />
            <Text style={styles.sortButtonText}>
              Sort by {sortBy === "time" ? "Time" : "Type"}
            </Text>
          </TouchableOpacity>
        </View>
        {todayData.meals.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="food-off" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              No meals logged on {formatDate(selectedDate)}
            </Text>
            <TouchableOpacity
              style={styles.addFirstMealButton}
              onPress={() => navigation.navigate("AddMeal" as never)}
            >
              <Text style={styles.addFirstMealText}>Add Your First Meal</Text>
            </TouchableOpacity>
          </View>
        ) : (
          getSortedMeals().map((meal: NutritionEntry) => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <View style={styles.mealTypeContainer}>
                  <Icon
                    name={getMealIcon(meal.mealType)}
                    size={20}
                    color="#0066cc"
                  />
                  <Text style={styles.mealType}>{meal.mealType}</Text>
                </View>
                <Text style={styles.mealTime}>
                  {formatTime(meal.entryDate)}
                </Text>
              </View>

              {/* Meal Name */}
              {meal.notes && <Text style={styles.mealName}>{meal.notes}</Text>}

              <View style={styles.mealNutrition}>
                <View style={styles.mealNutritionItem}>
                  <Text style={styles.mealNutritionLabel}>Calories</Text>
                  <Text style={styles.mealNutritionValue}>{meal.calories}</Text>
                </View>
                <View style={styles.mealNutritionItem}>
                  <Text style={styles.mealNutritionLabel}>Protein</Text>
                  <Text style={styles.mealNutritionValue}>{meal.protein}g</Text>
                </View>
                <View style={styles.mealNutritionItem}>
                  <Text style={styles.mealNutritionLabel}>Carbs</Text>
                  <Text style={styles.mealNutritionValue}>{meal.carbs}g</Text>
                </View>
                <View style={styles.mealNutritionItem}>
                  <Text style={styles.mealNutritionLabel}>Fat</Text>
                  <Text style={styles.mealNutritionValue}>{meal.fat}g</Text>
                </View>
              </View>
            </View>
          ))
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  addButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  dateArrow: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
  },
  dateDisplay: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  dateSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  totalsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totalsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  totalsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalItem: {
    alignItems: "center",
    flex: 1,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  mealsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  mealsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0066cc",
    marginLeft: 6,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
    marginBottom: 20,
  },
  addFirstMealButton: {
    backgroundColor: "#0066cc",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  addFirstMealText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  mealCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mealTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 8,
  },
  mealTime: {
    fontSize: 14,
    color: "#666",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
    marginTop: 4,
  },
  mealNutrition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  mealNutritionItem: {
    alignItems: "center",
    flex: 1,
  },
  mealNutritionLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  mealNutritionValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  mealNotes: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default Nutrition;
