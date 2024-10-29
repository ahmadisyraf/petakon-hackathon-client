import { Box } from "./ui/box";
import { Center } from "./ui/center";
import { Spinner } from "./ui/spinner";

export default function Loading() {
  return (
    <Center className="p-5">
      <Spinner />
    </Center>
  );
}
