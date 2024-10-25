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
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
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
import { z } from "zod";
import { router } from "expo-router";

const donationSchema = z.object({
  donationTitle: z.string().min(1, { message: "Donation title is required" }),
  donationDesc: z
    .string()
    .min(10, { message: "Donation description is required" }),
  donationType: z.string().min(1, { message: "Please choose a donation type" }),
  donationSize: z
    .string()
    .min(1, { message: "Please enter your donation size" }),
  donationMethod: z
    .string()
    .min(1, { message: "Please choose a transportation method" }),
});

export default function CreateDonationScreen() {
  const [selectedType, setSelectedType] = useState<number>();
  const [selectedMethod, setSelectedMethod] = useState<number>();
  const [donationTitle, setDonationTitle] = useState<string>("");
  const [donationDesc, setDonationDesc] = useState<string>("");
  const [donationType, setDonationType] = useState<string>("");
  const [donationSize, setDonationSize] = useState<string>("");
  const [donationMethod, setDonationMethod] = useState<string>("");
  const [errors, setErrors] = useState<{
    donationTitle?: string;
    donationDesc?: string;
    donationType?: string;
    donationSize?: string;
    donationMethod?: string;
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
  const donationMethodData = ["Pickup", "Delivery"];
  const toast = useToast();

  const handleSubmit = () => {
    const result = donationSchema.safeParse({
      donationTitle,
      donationDesc,
      donationType,
      donationSize,
      donationMethod,
    });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        donationTitle: errorMessages.donationTitle?.[0],
        donationDesc: errorMessages.donationDesc?.[0],
        donationType: errorMessages.donationType?.[0],
        donationSize: errorMessages.donationSize?.[0],
        donationMethod: errorMessages.donationMethod?.[0],
      });
      return;
    }
    console.log(result);
    setErrors({});
    start();
    router.navigate("/(tabs)");
    stop();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mb-20">
          <CardContainer
            title="Create Donation Form"
            description="Please fill in the details below"
          >
            <FormControl
              size="md"
              isRequired
              className="mt-10"
              isInvalid={!!errors.donationTitle}
              isDisabled={loading}
            >
              <FormControlLabel>
                <FormControlLabelText>Details</FormControlLabelText>
              </FormControlLabel>
              <Input className="mt-5" size={"xl"}>
                <InputField
                  placeholder="Donation title"
                  value={donationTitle}
                  onChange={(e: any) => setDonationTitle(e.nativeEvent.text)}
                />
              </Input>
            </FormControl>
            <FormControl
              size="md"
              isRequired
              className="mt-5"
              isInvalid={!!errors.donationDesc}
              isDisabled={loading}
            >
              <Textarea className="my-1" size={"xl"}>
                <TextareaInput
                  placeholder="Add a description"
                  value={donationDesc}
                  onChange={(e: any) => setDonationDesc(e.nativeEvent.text)}
                />
              </Textarea>
            </FormControl>
            <FormControl
              size="md"
              isRequired
              className="mt-10"
              isInvalid={!!errors.donationType}
              isDisabled={loading}
            >
              <FormControlLabel>
                <FormControlLabelText>Type of Donation</FormControlLabelText>
              </FormControlLabel>
              <HStack space="md" className="flex-wrap mt-5">
                {donationTypeData.map((d, i) => (
                  <Pressable
                    onPress={(e: any) => {
                      setDonationType(d);
                      setSelectedType(i);
                      console.log(donationType);
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
            <FormControl size="md" isRequired className="mt-10">
              <FormControlLabel>
                <FormControlLabelText>
                  Transportation Method
                </FormControlLabelText>
              </FormControlLabel>
              <HStack space="md" className="flex-wrap mt-5">
                {donationMethodData.map((d, i) => (
                  <Pressable
                    onPress={(e: any) => {
                      setDonationMethod(d);
                      setSelectedMethod(i);
                      console.log(donationMethod);
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
                      {d === "Delivery" ? "I will deliver" : "Request pickup"}
                    </Text>
                  </Pressable>
                ))}
              </HStack>
            </FormControl>
          </CardContainer>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 bg-gray-100 p-4 border-t border-gray-300">
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
            <ButtonText>Post</ButtonText>
          </Button>
        </HStack>
      </View>
    </SafeAreaView>
  );
}
