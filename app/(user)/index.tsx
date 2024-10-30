import CreateDonationButton from "@/components/create-donation-button";
import { Box } from "@/components/ui/box";
import { useCallback, useState } from "react";
import { useSessionStore } from "@/store/user";
import { getUserDonation } from "@/services/donation";
import CardContainer from "@/components/card-container";
import { RefreshControl, ScrollView, Text } from "react-native";
import { HStack } from "@/components/ui/hstack";
import Loading from "@/components/loading";
import useLoading from "@/hooks/useLoading";
import { Redirect, useFocusEffect } from "expo-router";

interface Donation {
  id: string;
  title: string;
  description: string;
  foodType: string;
  donationSize: string;
  transportationMethod: string;
  status: "pending" | "reserved" | "completed";
  createdAt: any;
}

export default function HomeScreen() {
  const { accessToken, role } = useSessionStore();
  const [donation, setDonation] = useState<Donation[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { start, stop, loading } = useLoading();

  const getDonationFn = async () => {
    start();
    const donationList = await getUserDonation({
      accessToken,
      status: "pending",
    });
    setDonation(donationList);
    stop();
  };

  const onRefresh = async () => {
    setRefresh(true);
    await getDonationFn();
    setRefresh(false);
  };

  useFocusEffect(
    useCallback(() => {
      getDonationFn();
    }, [])
  );

  if(role === "organization") {
    return <Redirect href={"/(organization)"} />
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Box className="relative h-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {donation.map((d, i) => (
          <CardContainer title={d.title} description={d.description} key={d.id}>
            <HStack className="mt-5 flex justify-between">
              <Box>
                <Text className="text-sm">Donation Size</Text>
                <Text className="font-semibold text-xl">{d.donationSize}</Text>
              </Box>
              <Box>
                <Text className="text-sm">Transport</Text>
                <Text className="font-semibold text-xl">
                  {d.transportationMethod === "request_for_pickup"
                    ? "Request for pickup"
                    : "I will deliver"}
                </Text>
              </Box>
            </HStack>
            <Box className="mt-5 flex justify-between">
              <Text className="text-sm">Food Type</Text>
              <Text className="font-semibold text-xl">{d.foodType}</Text>
            </Box>
            <Box className="mt-5">
              <Text>
                {new Date(d.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </Box>
          </CardContainer>
        ))}
      </ScrollView>
      <CreateDonationButton />
    </Box>
  );
}
