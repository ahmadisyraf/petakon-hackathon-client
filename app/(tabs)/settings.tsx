import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { useSessionStore } from "@/store/user";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";
import React from "react";

interface User {
  createdAt: string;
  donation: any[];
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  organization: {
    createdAt: string;
    id: string;
    memberKey: string;
    organizationName: string;
  };
  role: string;
  userAddress: any[];
  userContact: any[];
}

export default function AccountScreen() {
  const { clearAccessToken, role, clearRole } = useSessionStore();

  return (
    <VStack space="lg" className="px-5 py-10">
      <Button variant="solid" size="xl">
        <ButtonText>Account</ButtonText>
      </Button>
      {role === "organization" ? (
        <Button
          variant="solid"
          size="xl"
          onPress={() => router.navigate("/organization/organization-details")}
        >
          <ButtonText>Organization</ButtonText>
        </Button>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
      <Button
        variant="solid"
        size="xl"
        onPress={() => {
          clearAccessToken();
          clearRole();
          router.navigate("/authentication");
        }}
      >
        <ButtonText>Sign out</ButtonText>
      </Button>
    </VStack>
  );
}
