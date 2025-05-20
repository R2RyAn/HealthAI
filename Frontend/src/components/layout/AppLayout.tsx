import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Navbar from "../navigation/Navbar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const insets = useSafeAreaInsets();
  const topNavHeight = insets.top + 50; // Top inset + logo height
  const bottomNavHeight = 72 + insets.bottom; // Bottom nav + bottom inset

  return (
    <View style={styles.container}>
      <Navbar />
      <View
        style={[
          styles.main,
          {
            paddingTop: topNavHeight,
            paddingBottom: bottomNavHeight,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
  },
});

export default AppLayout;
