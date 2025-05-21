import { createRoot } from "react-dom/client";
import { Platform } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Only run this code on web platform
if (Platform.OS === "web") {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  } else {
    console.error("Root element not found");
  }
}

// For non-web platforms, App.js handles the registration
