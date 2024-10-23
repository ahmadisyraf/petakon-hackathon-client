import CreateDonationButton from "@/components/create-donation-button";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

export default function ReservedScreen() {
  return (
    <Box>
      <Button>
        <ButtonText>This is reserved order</ButtonText>
      </Button>
      <CreateDonationButton />
    </Box>
  );
}
