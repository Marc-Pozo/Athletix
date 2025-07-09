import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header globally for all tabs screens
      }}
    />
  );
}
