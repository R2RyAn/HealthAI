import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { View, Text } from "react-native";

type ToastType = "success" | "error" | "info";

export const showToast = (type: ToastType, title: string, message?: string) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: "bottom",
    visibilityTime: 4000,
    autoHide: true,
  });
};

// Config for custom toast types/styling
export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#22C55E", // green-500
        backgroundColor: "#F0FDF4", // green-50
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#166534", // green-800
      }}
      text2Style={{
        fontSize: 14,
        color: "#166534", // green-800
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#EF4444", // red-500
        backgroundColor: "#FEF2F2", // red-50
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#991B1B", // red-800
      }}
      text2Style={{
        fontSize: 14,
        color: "#991B1B", // red-800
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#3B82F6", // blue-500
        backgroundColor: "#EFF6FF", // blue-50
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#1E40AF", // blue-800
      }}
      text2Style={{
        fontSize: 14,
        color: "#1E40AF", // blue-800
      }}
    />
  ),
};
