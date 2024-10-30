import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { useSessionStore } from "@/store/user";
import {
  findManyReservation,
  recieveDonation,
} from "@/services/donation";
import CardContainer from "@/components/card-container";
import { RefreshControl, ScrollView, Text } from "react-native";
import { HStack } from "@/components/ui/hstack";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { updateDonation } from "@/services/donation";
import Loading from "@/components/loading";
import useLoading from "@/hooks/useLoading";
import { useFocusEffect } from "expo-router";

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [donation, setDonation] = useState<Donation[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { start, stop, loading } = useLoading();

  const getDonationFn = async () => {
    start();
    const donationList = await findManyReservation({
      accessToken,
    });

    setDonation(donationList);

    stop();
  };

  const handleSubmit = async ({
    donationId,
    reservationId,
  }: {
    donationId: string;
    reservationId: string;
  }) => {
    try {
      await recieveDonation({
        accessToken,
        id: reservationId,
      });
      await updateDonation({
        accessToken,
        status: "completed",
        id: donationId,
      });
      setDonation((prevDonations) =>
        prevDonations.filter((donation) => donation.id !== reservationId)
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setShowModal(false);
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
        {donation.map((d: any, i) => (
          <CardContainer
            title={d.donation.title}
            description={d.donation.description}
            key={d.id}
          >
            <HStack className="mt-5 flex justify-between">
              <Box>
                <Text className="text-sm">Donation Size</Text>
                <Text className="font-semibold text-xl">
                  {d.donation.donationSize}
                </Text>
              </Box>
              <Box>
                <Text className="text-sm">Transport</Text>
                <Text className="font-semibold text-xl">
                  {d.donation.transportationMethod === "request_for_pickup"
                    ? "Request for pickup"
                    : "I will deliver"}
                </Text>
              </Box>
            </HStack>
            <Box className="mt-5 flex justify-between">
              <Text className="text-sm">Food Type</Text>
              <Text className="font-semibold text-xl">
                {d.donation.foodType}
              </Text>
            </Box>
            <Box className="mt-5">
              <Text>
                {new Date(d.donation.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </Box>
            <Button
              onPress={() => {
                setShowModal(true);
              }}
              className="mt-5 bg-cyan-500"
            >
              <ButtonText>Completed</ButtonText>
            </Button>
            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              size="md"
            >
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="md" className="text-typography-950">
                    Are you sure?
                  </Heading>
                </ModalHeader>
                <ModalBody>
                  <Text className="text-typography-500">
                    The status of the donation will be changed by clicking the
                    confirm button.
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button
                    onPress={() => {
                      handleSubmit({
                        donationId: d.donation.id,
                        reservationId: d.id,
                      });
                    }}
                  >
                    <ButtonText>Confirm</ButtonText>
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </CardContainer>
        ))}
      </ScrollView>
    </Box>
  );
}
