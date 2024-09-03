import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { QuestionProvider } from "@/components/QuestionContext";
import { UserProvider } from "@/components/userContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <ReactQueryProvider>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <ThemeProvider> */}
      <UserProvider>
        <QuestionProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signUp" options={{ headerShown: false }} />
            <Stack.Screen
              name="generalQuestion"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="forgottenPassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="otherQuestions"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="eyeHealth" options={{ headerShown: false }} />
            <Stack.Screen name="screenTime" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          {/* // </ThemeProvider> */}
        </QuestionProvider>
      </UserProvider>
    </ReactQueryProvider>
  );
}
