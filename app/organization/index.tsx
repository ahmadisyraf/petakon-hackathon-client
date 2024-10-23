import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export default function OrganizationScreen() {
  return (
    <Box>
      <Heading size={"2xl"}>Organization</Heading>
      <Button size="xl">
        <ButtonText>Create an organization</ButtonText>
      </Button>
      <Button size="xl">
        <ButtonText>Join organization using member key</ButtonText>
      </Button>
    </Box>
  );
}
