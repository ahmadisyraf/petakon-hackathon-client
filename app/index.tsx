import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Link, Redirect } from "expo-router";
import { Image } from "expo-image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSessionStore } from "@/store/user";

export default function HomeScreen() {
  const { accessToken } = useSessionStore();

  if (accessToken && accessToken.length > 0) {
    return <Redirect href={"/(user)"} />;
  }

  return (
    <VStack className="px-5 pt-5" space="lg">
      <Image
        source={require("../assets/svg/eating-together.svg")}
        style={{
          width: 350,
          height: 350,
        }}
      />

      <Box className="mt-3 space-y-5 w-full">
        <Heading size="3xl" className="text-center">
          Welcome to CIKO 👋
        </Heading>
        <Text size="xl" className="text-center">
          Let's help organization by food donation
        </Text>
      </Box>

      <Link href={"/authentication"} asChild>
        <Button variant="solid" size="xl" className="mt-5">
          <ButtonText>Get started</ButtonText>
        </Button>
      </Link>
    </VStack>
  );
}
