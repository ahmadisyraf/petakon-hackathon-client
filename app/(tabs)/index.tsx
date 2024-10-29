import CreateDonationButton from "@/components/create-donation-button";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import { useSessionStore } from "@/store/user";
import { getDonationStatus } from "@/services/donation";
import CardContainer from "@/components/card-container";
import { ScrollView, Text } from "react-native";
import { HStack } from "@/components/ui/hstack";
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
import { ChevronDownIcon } from "lucide-react-native";
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
  const { accessToken } = useSessionStore();
  const [selectedStatus, setSelectedStatus] = useState<any>(
    DonationStatusEnum.pending
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, loading, error } = getDonationStatus({
    accessToken,
    status: "pending",
  });

  const handleSubmit = async (i: number, did: string) => {
    try {
      await updateDonation({
        accessToken,
        status: selectedStatus,
        id: did,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setShowModal(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text>Error...</Text>;
  }

  return (
    <Box className="relative h-full">
      <ScrollView>
        {data.map((d: any, i: number) => (
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
            <HStack className="flex justify-between mt-5 items-center">
              <Text className="text-sm">
                {new Date(d.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>

              <Select>
                <SelectTrigger variant="rounded" size="sm">
                  <SelectInput placeholder="Pending" />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Pending" value="pending" />
                    <SelectItem
                      label="Reserved"
                      value="reserved"
                      onPress={() => {
                        setShowModal(true);
                        setSelectedStatus(DonationStatusEnum.reserved);
                      }}
                    />
                    <SelectItem
                      label="Completed"
                      value="completed"
                      onPress={() => {
                        setShowModal(true);
                        setSelectedStatus(DonationStatusEnum.completed);
                      }}
                    />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </HStack>
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
                      handleSubmit(i, d.id);
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
      <CreateDonationButton />
    </Box>
  );
}
