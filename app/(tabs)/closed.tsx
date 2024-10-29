import CreateDonationButton from "@/components/create-donation-button";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSessionStore } from "@/store/user";
import { getDonationStatus } from "@/services/donation";
import CardContainer from "@/components/card-container";
import { ScrollView, View, Text } from "react-native";
import { Scroll } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon, PanelTopCloseIcon } from "lucide-react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Icon } from "@/components/ui/icon";
import { Heading } from "@/components/ui/heading";
import { updateDonation } from "@/services/donation";

enum DonationStatusEnum {
  pending = "pending",
  completed = "completed",
  reserved = "reserved",
}

interface Donation {
  id: string;
  title: string;
  description: string;
  foodType: string;
  donationSize: string;
  transportationMethod: string;
  status: DonationStatusEnum;
  createdAt: any;
}

export default function HomeScreen() {
  const [donationPending, setDonationPending] = useState<Donation[]>();
  const { accessToken } = useSessionStore();
  const [selectedStatus, setSelectedStatus] = useState<any>(
    DonationStatusEnum.completed
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const status = DonationStatusEnum.completed;
        const donation = await getDonationStatus({ accessToken, status });
        setDonationPending(donation.data);
      } catch (error) {
        console.error("Error fetching donation:", error);
      }
    };

    fetchDonation();
  }, [showModal]);

  const handleSubmit = async (i: number, did: string) => {
    if (donationPending) {
      console.log(selectedStatus);
      try {
        await updateDonation({
          accessToken,
          status: selectedStatus,
          id: did,
        });
        console.log("jadi");
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
    setShowModal(false);
  };

  return (
    <Box className="relative h-full">
      <ScrollView>
        {donationPending?.map((d, i) => (
          <CardContainer
            title={`${d.title}`}
            description={`${d.description}`}
            key={i}
          >
            <HStack className="mt-5 flex justify-between">
              <Box>
                <Text className="text-sm">Donation Size</Text>
                <Text className="font-semibold text-xl">{d.donationSize}</Text>
              </Box>
              <Box>
                <Text className="text-sm">Transport</Text>
                <Text className="font-semibold text-xl">
                  {d.transportationMethod === "request_for_pickup"
                    ? "Receiver will pickup"
                    : "Organization will deliver"}
                </Text>
              </Box>
            </HStack>
            <Box className="mt-5 flex justify-between">
              <Text className="text-sm">Food Type</Text>
              <Text className="font-semibold text-xl">{d.foodType}</Text>
            </Box>
            <Box className="mt-5">
              <Text className="text-sm">
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
