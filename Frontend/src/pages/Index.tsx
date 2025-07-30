import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserData } from "../hooks/useUserData";
import { useNutrition } from "../contexts/NutritionContext";
import { nutritionApi, DailyTotals } from "../services/nutritionApi";
import Svg, { G, Circle } from "react-native-svg";

const Index = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const { data: userData } = useUserData();
  const { totals } = useNutrition();
  const [dailyTotals, setDailyTotals] = useState<Record<string, DailyTotals>>(
    {}
  );
  const [todayKey, setTodayKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use local date instead of UTC to match your timezone
    const today = new Date().toLocaleDateString("en-CA"); // Returns YYYY-MM-DD format
    setTodayKey(today);
    loadNutritionData();
  }, []);

  // Reload data when screen comes into focus (e.g., after adding a meal)
  useFocusEffect(
    React.useCallback(() => {
      loadNutritionData();
    }, [])
  );

  const loadNutritionData = async () => {
    try {
      setIsLoading(true);
      const data = await nutritionApi.getDailyTotals();
      setDailyTotals(data);
    } catch (error) {
      // Silently fail for now, keep using local totals
      console.log("Failed to load nutrition data from backend");
    } finally {
      setIsLoading(false);
    }
  };

  const todayData = dailyTotals[todayKey] || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    meals: [],
  };

  // Use backend data if available, otherwise fall back to local totals
  const displayTotals = {
    calories: todayData.calories || totals.calories,
    proteins: todayData.protein || totals.proteins,
    carbs: todayData.carbs || totals.carbs,
    fats: todayData.fat || totals.fats,
  };

  // Donut chart calculations
  const radius = 50;
  const strokeWidth = 7;
  const center = 40;
  const svgSize = radius * 2 + strokeWidth + 4; // Add padding to prevent clipping
  const circleCircumference = 2 * Math.PI * radius;
  const protein = displayTotals.proteins > 0 ? displayTotals.proteins : 0;
  const carbs = displayTotals.carbs > 0 ? displayTotals.carbs : 0;
  const fat = displayTotals.fats > 0 ? displayTotals.fats : 0;
  const total = protein + carbs + fat;

  // Avoid division by zero
  const proteinPerc = total ? protein / total : 0;
  const carbsPerc = total ? carbs / total : 0;
  const fatPerc = total ? fat / total : 0;

  const proteinArc = proteinPerc * circleCircumference;
  const carbsArc = carbsPerc * circleCircumference;
  const fatArc = fatPerc * circleCircumference;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Icon name="account" size={24} color="#fff" />
          </View>
          <Text style={styles.headerSubtitle}>
            {userData ? `Welcome back ${userData.firstName}` : "Welcome back"}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="bell-outline" size={24} color="#0066cc" />
        </TouchableOpacity>
      </View>

      <View style={styles.todaySection}>
        <Text style={styles.todayTitle}>Today</Text>
        <TouchableOpacity>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Calories Section */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Calories</Text>
        <View style={styles.caloriesTabRow}>
          <Text style={styles.caloriesTabActive}>Remaining</Text>
          <Text style={styles.caloriesTab}>Total</Text>
          <Text style={styles.caloriesTab}>Food</Text>
          <Text style={styles.caloriesTab}>Exercise</Text>
        </View>

        <View style={styles.caloriesContent}>
          <View style={styles.donutChartContainer}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Svg
                height={svgSize}
                width={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                style={{ overflow: "visible" }}
              >
                <G rotation={-90} originX={svgSize / 2} originY={svgSize / 2}>
                  {/* Background */}
                  <Circle
                    cx={svgSize / 2}
                    cy={svgSize / 2}
                    r={radius}
                    stroke="#F1F6F9"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                  />
                  {/* Protein Arc */}
                  {protein > 0 && (
                    <Circle
                      cx={svgSize / 2}
                      cy={svgSize / 2}
                      r={radius}
                      stroke="#0066cc"
                      fill="transparent"
                      strokeWidth={strokeWidth}
                      strokeDasharray={circleCircumference}
                      strokeDashoffset={0}
                      strokeLinecap="round"
                    />
                  )}
                  {/* Carbs Arc */}
                  {carbs > 0 && (
                    <Circle
                      cx={svgSize / 2}
                      cy={svgSize / 2}
                      r={radius}
                      stroke="#ff6b00"
                      fill="transparent"
                      strokeWidth={strokeWidth}
                      strokeDasharray={circleCircumference}
                      strokeDashoffset={-proteinArc}
                      strokeLinecap="round"
                    />
                  )}
                  {/* Fat Arc */}
                  {fat > 0 && (
                    <Circle
                      cx={svgSize / 2}
                      cy={svgSize / 2}
                      r={radius}
                      stroke="#ffb700"
                      fill="transparent"
                      strokeWidth={strokeWidth}
                      strokeDasharray={circleCircumference}
                      strokeDashoffset={-(proteinArc + carbsArc)}
                      strokeLinecap="round"
                    />
                  )}
                </G>
              </Svg>
              <View
                style={styles.donutCenterAbsoluteSmall}
                pointerEvents="none"
              >
                <Text style={styles.calorieNumber}>
                  {displayTotals.calories}
                </Text>
                <Text style={styles.calorieLabel}>Calories</Text>
              </View>
            </View>
          </View>

          <View style={styles.nutritionStats}>
            <View style={styles.nutritionStatRow}>
              <View style={[styles.macroIndicator, styles.proteinIndicator]} />
              <Text style={styles.nutritionStatLabel}>Protein</Text>
              <Text style={styles.nutritionStatValue}>
                {displayTotals.proteins.toFixed(1)}g
              </Text>
            </View>

            <View style={styles.nutritionStatRow}>
              <View style={[styles.macroIndicator, styles.carbsIndicator]} />
              <Text style={styles.nutritionStatLabel}>Carbs</Text>
              <Text style={styles.nutritionStatValue}>
                {displayTotals.carbs.toFixed(1)}g
              </Text>
            </View>

            <View style={styles.nutritionStatRow}>
              <View style={[styles.macroIndicator, styles.fatIndicator]} />
              <Text style={styles.nutritionStatLabel}>Fat</Text>
              <Text style={styles.nutritionStatValue}>
                {displayTotals.fats.toFixed(1)}g
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.progressIndicator}>
          <View style={styles.progressDot} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>
      </View>

      {/* Steps Section */}
      <View style={styles.smallCardRow}>
        <View style={styles.smallCard}>
          <View style={styles.smallCardHeader}>
            <Text style={styles.smallCardTitle}>Steps</Text>
          </View>
          <View style={styles.smallCardBody}>
            <View style={styles.smallIconContainer}>
              <Icon name="shoe-print" size={20} color="#ff6b00" />
            </View>
            <Text style={styles.smallCardValue}>0</Text>
          </View>
          <Text style={styles.smallCardGoal}>Goal: 10,000 steps</Text>
          <View style={styles.miniProgress}>
            <View style={[styles.miniProgressFill, { width: "4.5%" }]} />
          </View>
        </View>

        <View style={styles.smallCard}>
          <View style={styles.smallCardHeader}>
            <Text style={styles.smallCardTitle}>Exercise</Text>
            <TouchableOpacity>
              <Icon name="plus" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          <View style={styles.smallCardBody}>
            <View style={styles.smallIconContainer}>
              <Icon name="fire" size={20} color="#ff6b00" />
            </View>
            <Text style={styles.smallCardValue}>Nan cal</Text>
          </View>
          <Text style={styles.smallCardTime}>00:00 hr</Text>
        </View>
      </View>

      {/* Weight Section */}
      <View style={styles.smallCardRow}>
        <View style={styles.smallCard}>
          <View style={styles.smallCardHeader}>
            <Text style={styles.smallCardTitle}>Weight</Text>
            <TouchableOpacity>
              <Icon name="plus" size={20} color="#0066cc" />
            </TouchableOpacity>
          </View>
          <Text style={styles.smallCardDate}>Last: 01 Oct</Text>
          <View style={styles.weightRow}>
            <Text style={styles.weightValue}>
              {userData ? `${userData.weightKg} kg` : "--"}
            </Text>
            <Text style={styles.weightTarget}>
              {userData ? `${userData.goalType}` : "--"}
            </Text>
          </View>
        </View>

        <View style={styles.smallCard}>{/* Empty card for symmetry */}</View>
      </View>

      {/* Quick Actions Section */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("AddMeal" as never)}
          >
            <Icon name="food-plus" size={24} color="#0066cc" />
            <Text style={styles.quickActionText}>Add Meal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("BodyFatPredict" as never)}
          >
            <Icon name="camera" size={24} color="#0066cc" />
            <Text style={styles.quickActionText}>Body Fat AI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("Scanner" as never)}
          >
            <Icon name="qrcode-scan" size={24} color="#0066cc" />
            <Text style={styles.quickActionText}>Scan Food</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionButton}>
            <Icon name="magnify" size={24} color="#0066cc" />
            <Text style={styles.quickActionText}>Search Food</Text>
          </TouchableOpacity>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0066cc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  todaySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  todayTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  editButton: {
    color: "#0066cc",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  caloriesTabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 16,
  },
  caloriesTab: {
    fontSize: 14,
    paddingVertical: 8,
    marginRight: 16,
    color: "#666",
  },
  caloriesTabActive: {
    fontSize: 14,
    paddingVertical: 8,
    marginRight: 16,
    color: "#000",
    fontWeight: "500",
    borderBottomWidth: 2,
    borderBottomColor: "#0066cc",
  },
  caloriesContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  donutChartContainer: {
    width: "40%",
    alignItems: "center",
  },
  donutChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  donutBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 60,
    borderWidth: 12,
    borderColor: "#f0f0f0",
    overflow: "visible",
  },
  donutSegment: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 60,
    borderWidth: 12,
    borderColor: "transparent",
    transformOrigin: "center",
  },
  proteinSegment: {
    borderTopColor: "#0066cc",
    borderRightColor: "#0066cc",
  },
  carbsSegment: {
    borderRightColor: "#ff6b00",
    borderBottomColor: "#ff6b00",
  },
  fatSegment: {
    borderBottomColor: "#ffb700",
    borderLeftColor: "#ffb700",
  },
  donutCenter: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  calorieNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  calorieLabel: {
    fontSize: 14,
    color: "#666",
  },
  nutritionStats: {
    width: "60%",
  },
  nutritionStatRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  nutritionStatLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    marginLeft: 8,
  },
  nutritionStatValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  macroIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  proteinIndicator: {
    backgroundColor: "#0066cc",
  },
  carbsIndicator: {
    backgroundColor: "#ff6b00",
  },
  fatIndicator: {
    backgroundColor: "#ffb700",
  },
  progressIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#0066cc",
  },
  smallCardRow: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  smallCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  smallCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  smallCardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  smallCardBody: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  smallIconContainer: {
    marginRight: 8,
  },
  smallCardValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  smallCardGoal: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  smallCardTime: {
    fontSize: 14,
    color: "#666",
  },
  smallCardDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  miniProgress: {
    height: 3,
    backgroundColor: "#eee",
    borderRadius: 2,
    marginTop: 8,
  },
  miniProgressFill: {
    height: 3,
    backgroundColor: "#ff6b00",
    borderRadius: 2,
  },
  weightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weightValue: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
  },
  weightTarget: {
    fontSize: 16,
    color: "#666",
  },
  quickActionsSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "48%",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginTop: 8,
    textAlign: "center",
  },
  donutCenterAbsoluteSmall: {
    position: "absolute",
    top: "40%",
    left: "28%",
    width: 100,
    height: 100,
    marginLeft: -35,
    marginTop: -35,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
});

export default Index;
