import 'dotenv/config';

export default {
  expo: {
    name: "Athletix",
    slug: "Athletix",
    version: "1.0.0",
    orientation: "portrait",
    icon: "",
    scheme: "Athletix",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "This app uses your location to show nearby parks."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: ""
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      "expo-secure-store"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      PHOTO_URL: process.env.PHOTO_URL
    }
  }
};
