import { getOrgById } from "@/services/organization";
import React, { useState, useEffect } from "react";
import { useSessionStore } from "@/store/user";
import CardContainer from "@/components/card-container";
import useLoading from "@/hooks/useLoading";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import * as ExpoClipboard from "expo-clipboard";
import { Text } from "@/components/ui/text";
import Loading from "@/components/loading";

interface Organization {
  organizationName: string;
  memberKey: string;
}

export default function OrganizationDetailsScreen() {
  const [organizationData, setOrganizationData] = useState<Organization>();
  const [copied, setCopied] = useState<boolean>(false);
  const { accessToken } = useSessionStore();
  const { start, stop, loading } = useLoading();

  const copyToClipboard = async () => {
    await ExpoClipboard.setStringAsync(organizationData?.memberKey || "");
    setCopied(true);
  };

  useEffect(() => {
    const fetchOrg = async () => {
      start();
      const organization = await getOrgById(accessToken);
      setOrganizationData(organization.data.organization);
      stop();
    };

    fetchOrg();
  }, [accessToken]);

  if (loading) {
    return <Loading />;
  }

  return (
    <CardContainer
      title={`You're ${organizationData?.organizationName} member`}
      description={"Invite your organization member using member key"}
    >
      <Box className="space-y-2 relative mt-8 gap-5">
        <Box className="gap-1">
          <Text className="font-medium text-black">Member key</Text>
          <Input variant="outline" size="xl" isReadOnly={true}>
            <InputField value={organizationData?.memberKey} />
          </Input>
        </Box>
        <Button onPress={copyToClipboard} size="xl">
          <ButtonText>{copied ? "Copied" : "Copy"}</ButtonText>
        </Button>
      </Box>
    </CardContainer>
  );
}
