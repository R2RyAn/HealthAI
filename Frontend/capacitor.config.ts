import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.lovable.fitfuellogix",
  appName: "HealthAI",
  webDir: "dist",
  server: {
    url: "https://9838dabb-8433-410c-b2e1-26e2c903c37d.lovableproject.com?forceHideBadge=true",
    cleartext: true,
  },
  ios: {
    contentInset: "always",
    scheme: "App",
    limitsNavigationsToAppBoundDomains: true,
    handleApplicationNotifications: true,
    backgroundColor: "#ffffff",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
    },
  },
};

export default config;
