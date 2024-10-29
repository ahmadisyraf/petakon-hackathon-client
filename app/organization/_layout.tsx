import { Stack } from "expo-router";

export default function OrganizationLayout() {
  return (
    <Stack>
      <Stack.Screen name="organization-details" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-organization"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="join-organization" options={{ headerShown: false }} />
    </Stack>
  );
}
