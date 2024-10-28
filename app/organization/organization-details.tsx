import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { getOrgById } from "@/services/organization";
import { useState, useEffect } from "react";
import { useSessionStore } from "@/store/user";
import CardContainer from "@/components/card-container";
import { Text } from "react-native";

interface Organization {
  organizationName: string;
  memberKey: string;
}

export default function OrganizationDetailsScreen() {
  const [orgData, setOrgData] = useState<Organization>();
  const { accessToken } = useSessionStore();

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const org = await getOrgById(accessToken);
        setOrgData(org.data.organization);
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchOrg();
  }, [accessToken]);

  return (
    <CardContainer
      title={`${orgData?.organizationName}`}
      description={`${orgData?.memberKey}`}
    >
      <Text>testing</Text>
    </CardContainer>
  );
}
