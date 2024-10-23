import { Stack } from "expo-router";

export default function OrganizationLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-organization"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="join-organization" options={{ headerShown: false }} />
    </Stack>
  );
}
