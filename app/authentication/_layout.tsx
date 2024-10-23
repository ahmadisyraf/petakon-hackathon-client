import { Stack } from "expo-router";

export default function DonatorLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Sign in" }} />
      <Stack.Screen name="sign-up" options={{ headerTitle: "Sign up"}} />
    </Stack>
  );
}
