import { useState } from "react";
import CardContainer from "@/components/card-container";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { ScrollView, View, SafeAreaView } from "react-native";
import useLoading from "@/hooks/useLoading";
import { useSessionStore } from "@/store/user";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { createDonation } from "@/services/donation";
import { z } from "zod";
import { router } from "expo-router";

const donationSchema = z.object({
  title: z.string().min(1, { message: "Donation title is required" }),
  description: z
    .string()
    .min(10, { message: "Donation description is required" }),
  foodType: z.string().min(1, { message: "Please choose a donation type" }),
  donationSize: z
    .string()
    .min(1, { message: "Please enter your donation size" }),
  transportationMethod: z
    .string()
    .min(1, { message: "Please choose a transportation method" }),
});

export default function CreateDonationScreen() {
  const [selectedType, setSelectedType] = useState<number>();
  const [selectedMethod, setSelectedMethod] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [foodType, setFoodType] = useState<string>("");
  const [donationSize, setDonationSize] = useState<string>("");
  const [transportationMethod, setTransportationMethod] = useState<string>("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    foodType?: string;
    donationSize?: string;
    transportationMethod?: string;
  }>({});
  const { start, stop, loading } = useLoading();
  const { accessToken } = useSessionStore();
  const donationTypeData = [
    "Dairy",
    "Produce",
    "Meat",
    "Prepared",
    "Baked",
    "Beverages",
    "Non-Perishable",
    "Non-Food",
    "Frozen",
    "Compost",
    "Perishable",
  ];
  const donationMethodData = ["request_for_pickup", "deliver_to_organization"];
  const toast = useToast();

  const handleSubmit = async () => {
    const result = donationSchema.safeParse({
      title,
      description,
      foodType,
      donationSize,
      transportationMethod,
    });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        title: errorMessages.title?.[0],
        description: errorMessages.description?.[0],
        foodType: errorMessages.foodType?.[0],
        donationSize: errorMessages.donationSize?.[0],
        transportationMethod: errorMessages.transportationMethod?.[0],
      });
      return;
    }
    setErrors({});
    start();

    const createdDonation = await createDonation({
      title,
      description,
      foodType,
      donationSize,
      transportationMethod,
      accessToken,
    });

    if (!createdDonation) {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          return (
            <Toast action="error" variant="solid">
              <ToastTitle>Opps! something went wrong</ToastTitle>
              <ToastDescription>Please try again later</ToastDescription>
            </Toast>
          );
        },
      });
    } else {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          return (
            <Toast action="success" variant="solid">
              <ToastTitle>Donation created successfuly</ToastTitle>
            </Toast>
          );
        },
      });
    }
    router.navigate("/(tabs)");
    stop();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mb-24">
          <CardContainer
            title="Create Donation Form"
            description="Please fill in the details below"
          >
            <FormControl
              size="md"
              isRequired
              className="mt-10"
              isInvalid={!!errors.title}
              isDisabled={loading}
            >
              <FormControlLabel>
                <FormControlLabelText>Details</FormControlLabelText>
              </FormControlLabel>
              <Input className="mt-5" size={"xl"}>
                <InputField
                  placeholder="Donation title"
                  value={title}
                  onChange={(e: any) => setTitle(e.nativeEvent.text)}
                />
              </Input>
            </FormControl>
            <FormControl
              size="md"
              isRequired
              className="mt-5"
              isInvalid={!!errors.description}
              isDisabled={loading}
            >
              <Textarea className="my-1" size={"xl"}>
                <TextareaInput
                  placeholder="Add a description"
                  value={description}
                  onChange={(e: any) => setDescription(e.nativeEvent.text)}
                />
              </Textarea>
            </FormControl>
            <FormControl
              size="md"
              isRequired
              className="mt-10"
              isInvalid={!!errors.foodType}
              isDisabled={loading}
            >
              <FormControlLabel>
                <FormControlLabelText>Type of Donation</FormControlLabelText>
              </FormControlLabel>
              <HStack space="md" className="flex-wrap mt-5">
                {donationTypeData.map((d, i) => (
                  <Pressable
                    onPress={(e: any) => {
                      setFoodType(d);
                      setSelectedType(i);
                      console.log(foodType);
                    }}
                    className={
                      selectedType === i
                        ? "p-2 bg-gray-100 rounded-md border border-black"
                        : "p-2 bg-gray-100 rounded-md"
                    }
                    key={i}
                  >
                    <Text
                      className={
                        selectedType === i
                          ? "text-black font-semibold"
                          : "text-black"
                      }
                    >
                      {d}
                    </Text>
                  </Pressable>
                ))}
              </HStack>
            </FormControl>
            <FormControl
              size="md"
              isRequired
              className="mt-10"
              isInvalid={!!errors.donationSize}
              isDisabled={loading}
            >
              <FormControlLabel>
                <FormControlLabelText>Donation Size</FormControlLabelText>
              </FormControlLabel>
              <Input className="mt-5" size={"xl"}>
                <InputField
                  placeholder="Donation size"
                  value={donationSize}
                  onChange={(e: any) => setDonationSize(e.nativeEvent.text)}
                />
              </Input>
            </FormControl>
            <FormControl
              size="md"
              isRequired
              className="mt-10"
              isInvalid={!!errors.transportationMethod}
              isDisabled={loading}
            >
              <FormControlLabel>
                <FormControlLabelText>
                  Transportation Method
                </FormControlLabelText>
              </FormControlLabel>
              <HStack space="md" className="flex-wrap mt-5">
                {donationMethodData.map((d, i) => (
                  <Pressable
                    onPress={(e: any) => {
                      setTransportationMethod(d);
                      setSelectedMethod(i);
                      console.log(transportationMethod);
                    }}
                    className={
                      selectedMethod === i
                        ? "p-2 bg-gray-100 rounded-md border border-black"
                        : "p-2 bg-gray-100 rounded-md"
                    }
                    key={i}
                  >
                    <Text
                      className={
                        selectedMethod === i
                          ? "text-black font-semibold"
                          : "text-black"
                      }
                    >
                      {d === "deliver_to_organization"
                        ? "I will deliver"
                        : "Request pickup"}
                    </Text>
                  </Pressable>
                ))}
              </HStack>
            </FormControl>
          </CardContainer>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 bg-gray-100 p-6 border-t border-gray-300">
        <HStack space="md" className="w-full">
          <Button
            size="xl"
            variant="outline"
            action="primary"
            className="w-1/2"
          >
            <ButtonText>Discard</ButtonText>
          </Button>
          <Button
            size="xl"
            variant="solid"
            action="primary"
            className="w-1/2"
            onPress={handleSubmit}
            disabled={loading}
          >
            <ButtonText>
              {loading ? "Posting" : "Post"}
            </ButtonText>
          </Button>
        </HStack>
      </View>
    </SafeAreaView>
  );
}
