import { ReactNode } from "react";
import { Box } from "./ui/box";
import { useSessionStore } from "@/store/user";
import { router } from "expo-router";

interface SignedInProps {
  children: ReactNode;
}

export default function SignedIn({ children }: SignedInProps) {
  const { accessToken } = useSessionStore();

  if (accessToken.length > 0) {
    router.navigate("/(user)");
  }
  return <Box>{children}</Box>;
}
