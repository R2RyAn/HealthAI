import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserData } from "../hooks/useUserData";

const Index = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const { data: userData } = useUserData();

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
          <View style={styles.calorieCircleContainer}>
            <View style={styles.calorieCircle}>
              <Text style={styles.calorieNumber}>Nan</Text>
              <Text style={styles.calorieLabel}>Remaining</Text>
            </View>
          </View>

          <View style={styles.nutritionStats}>
            <View style={styles.nutritionStatRow}>
              <Icon name="flag-outline" size={20} color="#666" />
              <Text style={styles.nutritionStatLabel}>Base Goal</Text>
              <Text style={styles.nutritionStatValue}>Nan</Text>
            </View>

            <View style={styles.nutritionStatRow}>
              <Icon name="silverware-fork-knife" size={20} color="#666" />
              <Text style={styles.nutritionStatLabel}>Food</Text>
              <Text style={styles.nutritionStatValue}>Nan</Text>
            </View>

            <View style={styles.nutritionStatRow}>
              <Icon name="fire" size={20} color="#ff6b00" />
              <Text style={styles.nutritionStatLabel}>Exercise</Text>
              <Text style={styles.nutritionStatValue}>Nan</Text>
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
            <Text style={styles.weightValue}>--</Text>
            <Text style={styles.weightTarget}>--</Text>
          </View>
        </View>

        <View style={styles.smallCard}>{/* Empty card for symmetry */}</View>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}>
        <Icon name="magnify" size={20} color="#333" />
        <Text style={styles.searchBarText}>Search for a food</Text>
        <Icon name="microphone" size={20} color="#333" />
      </TouchableOpacity>
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
  calorieCircleContainer: {
    width: "40%",
    alignItems: "center",
  },
  calorieCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#0066cc",
    borderLeftColor: "#ffb700",
    justifyContent: "center",
    alignItems: "center",
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginVertical: 16,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchBarText: {
    fontSize: 16,
    color: "#999",
    flex: 1,
    marginLeft: 8,
  },
});

export default Index;
