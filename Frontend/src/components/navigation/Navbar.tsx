import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const navItems = [
  {
    path: "Home",
    name: "Dashboard",
    icon: "view-dashboard",
  },
  {
    path: "Workouts",
    name: "Workouts",
    icon: "dumbbell",
  },
  {
    path: "Nutrition",
    name: "Diary",
    icon: "food-apple",
  },
  {
    path: "Profile",
    name: "Me",
    icon: "account",
  },
  {
    path: "More",
    name: "More",
    icon: "dots-horizontal",
  },
];

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const currentRouteName = route.name;

  // Set dark theme for Workouts page
  const isDarkTheme = currentRouteName === "Workouts";

  return (
    <>
      {/* Top Logo Bar */}
      <View
        style={[
          styles.topBar,
          {
            paddingTop: insets.top > 0 ? insets.top : 16,
            backgroundColor: isDarkTheme ? "#121212" : "#fff",
            borderBottomColor: isDarkTheme ? "#333" : "#e5e7eb",
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Icon
            name="heart-pulse"
            size={24}
            color={isDarkTheme ? "#fff" : "#0066cc"}
          />
          <Text
            style={[
              styles.logoText,
              { color: isDarkTheme ? "#fff" : "#0066cc" },
            ]}
          >
            HealthAI
          </Text>
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View
        style={[
          styles.navbar,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
            backgroundColor: isDarkTheme ? "#121212" : "#fff",
            borderTopColor: isDarkTheme ? "#333" : "#e5e7eb",
          },
        ]}
      >
        <View style={styles.navbarInner}>
          {navItems.map((item) => {
            const isActive = item.path === currentRouteName;

            return (
              <TouchableOpacity
                key={item.path}
                style={styles.navLink}
                onPress={() => navigation.navigate(item.path)}
              >
                <Icon
                  name={item.icon}
                  color={
                    isActive
                      ? isDarkTheme
                        ? "#fff"
                        : "#0066cc"
                      : isDarkTheme
                      ? "#777"
                      : "#888"
                  }
                  size={24}
                />
                <Text
                  style={[
                    styles.navText,
                    {
                      color: isActive
                        ? isDarkTheme
                          ? "#fff"
                          : "#0066cc"
                        : isDarkTheme
                        ? "#777"
                        : "#888",
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    zIndex: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    zIndex: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  navbarInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 56,
  },
  navLink: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});

export default Navbar;
