import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { useSessionStore } from "@/store/user";
import { router } from "expo-router";

export default function AccountScreen() {
  const { clearAccessToken } = useSessionStore();
  return (
    <VStack space="lg" className="px-5 py-10">
      <Button variant="solid" size="xl">
        <ButtonText>Account</ButtonText>
      </Button>
      <Button
        variant="solid"
        size="xl"
        onPress={() => router.navigate("/organization/create-organization")}
      >
        <ButtonText>Create organization</ButtonText>
      </Button>
      <Button
        variant="solid"
        size="xl"
        onPress={() => router.navigate("/organization/join-organization")}
      >
        <ButtonText>Join organization</ButtonText>
      </Button>
      <Button
        variant="solid"
        size="xl"
        onPress={() => router.navigate("/organization")}
      >
        <ButtonText>Organization</ButtonText>
      </Button>
      <Button
        variant="solid"
        size="xl"
        onPress={() => {
          clearAccessToken();
          router.navigate("/authentication")
        }}
      >
        <ButtonText>Sign out</ButtonText>
      </Button>
    </VStack>
  );
}
