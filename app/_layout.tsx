import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, headerTitle: "Back" }}
          />
          <Stack.Screen
            name="authentication"
            options={{ headerShown: false, title: "Back" }}
          />
          <Stack.Screen
            name="create-donation"
            options={{ headerTitle: "Create donation" }}
          />
          <Stack.Screen
            name="(user)"
            options={{ headerShown: false, headerTitle: "Back" }}
          />
          <Stack.Screen
            name="(organization)"
            options={{ headerShown: false, headerTitle: "Back" }}
          />
          <Stack.Screen
            name="organization"
            options={{
              headerShown: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
