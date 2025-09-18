import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wildwords.app",
  appName: "Wild Words",
  webDir: "dist",
  server: {
    androidScheme: "https",
    iosScheme: "wildwords",
  },
  plugins: {
    App: {
      appUrlOpen: {
        iosCustomScheme: "wildwords",
        androidCustomScheme: "wildwords",
      },
    },
  },
};

export default config;
