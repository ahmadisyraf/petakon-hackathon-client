import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";
import { Box } from "./ui/box";
import { AddIcon } from "./ui/icon";
import { Link } from "expo-router";

export default function CreateDonationButton() {
  return (
    <Box className="h-full w-full bg-background-50 rounded-md z-10">
      <Link href={"/create-donation"} asChild>
        <Fab
          className="mb-24"
          size="md"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
        >
          <FabIcon as={AddIcon} />
          <FabLabel>Create donation</FabLabel>
        </Fab>
      </Link>
    </Box>
  );
}
