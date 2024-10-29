import { getOrgById } from "@/services/organization";
import { useState, useEffect } from "react";
import { useSessionStore } from "@/store/user";
import CardContainer from "@/components/card-container";
import { Text } from "react-native";
import useLoading from "@/hooks/useLoading";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";

interface Organization {
  organizationName: string;
  memberKey: string;
}

export default function OrganizationDetailsScreen() {
  const [orgData, setOrgData] = useState<Organization>();
  const { accessToken } = useSessionStore();
  const { start, stop, loading } = useLoading();

  useEffect(() => {
    const fetchOrg = async () => {
      start();
      const organization = await getOrgById(accessToken);
      setOrgData(organization.data.organization);
      stop();
    };

    fetchOrg();
  }, [accessToken]);

  if (loading) {
    return (
      <Center>
        <Spinner size={"large"} />
      </Center>
    );
  }

  return (
    <CardContainer
      title={`${orgData?.organizationName}`}
      description={`${orgData?.memberKey}`}
    >
      <Text>testing</Text>
    </CardContainer>
  );
}
