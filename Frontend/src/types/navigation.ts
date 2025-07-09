import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Workouts: undefined;
  Nutrition: { scannedBarcode?: string };
  Scanner: undefined;
  Profile: undefined;
  NotFound: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
