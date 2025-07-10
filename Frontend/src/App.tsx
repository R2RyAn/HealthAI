import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, { BaseToast } from "react-native-toast-message";
import { toastConfig } from "@/components/ui/ToastProvider";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Workouts from "./pages/Workouts";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";
import Scanner from "./pages/Scanner";
import AddMeal from "./pages/AddMeal";
import BodyFatPredict from "./pages/BodyFatPredict";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { NutritionProvider } from "./contexts/NutritionContext";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

// Make the background transparent to allow for clean fade transitions
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

// Auth screens without AppLayout
const LoginScreen = () => <Login />;
const SignupScreen = () => <Signup />;

// Wrap each screen with AppLayout
const HomeScreen = () => (
  <AppLayout>
    <Index />
  </AppLayout>
);

const WorkoutsScreen = () => (
  <AppLayout>
    <Workouts />
  </AppLayout>
);

const NutritionScreen = () => (
  <AppLayout>
    <Nutrition />
  </AppLayout>
);

const ProfileScreen = () => (
  <AppLayout>
    <Profile />
  </AppLayout>
);

const ScannerScreen = () => <Scanner />;
const AddMealScreen = () => (
  <AppLayout>
    <AddMeal />
  </AppLayout>
);
const BodyFatPredictScreen = () => (
  <AppLayout>
    <BodyFatPredict />
  </AppLayout>
);

const App = () => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <NutritionProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            id={undefined}
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
              animation: "none",
              animationDuration: 0,
              presentation: "transparentModal",
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Workouts" component={WorkoutsScreen} />
            <Stack.Screen name="Nutrition" component={NutritionScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Scanner" component={ScannerScreen} />
            <Stack.Screen name="AddMeal" component={AddMealScreen} />
            <Stack.Screen
              name="BodyFatPredict"
              component={BodyFatPredictScreen}
            />
            <Stack.Screen name="NotFound" component={NotFound} />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </NutritionProvider>
    </QueryClientProvider>
  </SafeAreaProvider>
);

export default App;
