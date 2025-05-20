import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Workouts = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [showNewFeature, setShowNewFeature] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>20 min Upper Body</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Icon name="tune-vertical" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.workoutDetails}>
            20 min • Upper Body • Build strength • Beginner • Your Equipment •
            With Warm-up
          </Text>

          {showNewFeature && (
            <View style={styles.newFeatureCard}>
              <View style={styles.newBadgeContainer}>
                <Text style={styles.newBadge}>New</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowNewFeature(false)}
              >
                <Icon name="close" size={20} color="#333" />
              </TouchableOpacity>

              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  You can now select target muscles you want to focus on in each
                  workout.
                </Text>

                <View style={styles.muscleMapContainer}>
                  <View style={styles.muscleMapPlaceholder}>
                    {/* Shoulder highlights */}
                    <View
                      style={[
                        styles.muscleHighlight,
                        { top: "15%", left: "15%" },
                      ]}
                    />
                    <View
                      style={[
                        styles.muscleHighlight,
                        { top: "15%", right: "15%" },
                      ]}
                    />

                    {/* Chest highlight */}
                    <View
                      style={[
                        styles.muscleHighlight,
                        { top: "30%", left: "48%", width: 80, height: 40 },
                      ]}
                    />

                    {/* Abs highlight */}
                    <View
                      style={[
                        styles.muscleHighlight,
                        { top: "45%", left: "48%", width: 60, height: 70 },
                      ]}
                    />

                    <Icon
                      name="human-male"
                      size={150}
                      color="#444"
                      style={styles.humanIcon}
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.customizeButton}>
                  <Text style={styles.customizeButtonText}>
                    Customize workout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="refresh" size={28} color="#fff" />
              <Text style={styles.actionButtonText}>Refresh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Icon name="bookmark-outline" size={28} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Icon name="dots-horizontal" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Warm Up</Text>
            <TouchableOpacity>
              <Icon name="dots-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.exerciseCard}>
            <View style={styles.exerciseThumbnail}>
              <Icon name="arm-flex" size={36} color="#fff" />
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>Bodyweight W Fly</Text>
              <Text style={styles.exerciseDuration}>30s per side</Text>
            </View>
            <TouchableOpacity>
              <Icon name="dots-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.moreButton}>
            <Icon name="chevron-down" size={24} color="#fff" />
            <Text style={styles.moreButtonText}>5 more</Text>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Block 1</Text>
            <TouchableOpacity>
              <Icon name="dots-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.exerciseCard}>
            <View style={styles.exerciseThumbnail}>
              <Icon name="arm-flex" size={36} color="#fff" />
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>Pushups</Text>
              <Text style={styles.exerciseDuration}>45s</Text>
            </View>
            <TouchableOpacity>
              <Icon name="dots-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.startButtonContainer,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 60 : 76 },
        ]}
      >
        <TouchableOpacity style={styles.startButton}>
          <Icon name="play" size={24} color="#fff" />
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150,
  },
  contentWrapper: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    marginRight: 16,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  workoutDetails: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 24,
  },
  newFeatureCard: {
    backgroundColor: "#333",
    borderRadius: 12,
    marginBottom: 24,
    overflow: "hidden",
    position: "relative",
  },
  newBadgeContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
  },
  newBadge: {
    backgroundColor: "#F2DD4E",
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#F2DD4E",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  featureContent: {
    padding: 16,
    paddingTop: 48,
  },
  featureTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 16,
  },
  muscleMapContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  muscleMapPlaceholder: {
    width: 200,
    height: 200,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  humanIcon: {
    position: "absolute",
  },
  muscleHighlight: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F2DD4E",
    opacity: 0.7,
    transform: [{ translateX: -15 }],
    zIndex: 2,
  },
  customizeButton: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  customizeButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  actionButtonsRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  actionButtonText: {
    color: "#fff",
    marginTop: 4,
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },
  exerciseCard: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  exerciseThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 4,
  },
  exerciseDuration: {
    fontSize: 14,
    color: "#aaa",
  },
  moreButton: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 24,
  },
  moreButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  startButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(18,18,18,0.9)",
    borderTopWidth: 1,
    borderTopColor: "#333",
    padding: 16,
  },
  startButton: {
    backgroundColor: "#333",
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    marginLeft: 8,
  },
});

export default Workouts;
