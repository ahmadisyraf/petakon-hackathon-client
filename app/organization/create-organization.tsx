import CardContainer from "@/components/card-container";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import useLoading from "@/hooks/useLoading";
import { createOrganization } from "@/services/organization";
import { useSessionStore } from "@/store/user";
import { router } from "expo-router";
import { useState } from "react";
import { z } from "zod";

const organizationSchema = z.object({
  organizationName: z
    .string()
    .min(1, { message: "Organization name is required" }),
});

export default function CreateOrganizationScreen() {
  const [organizationName, setOrganizationName] = useState<string>("");
  const [errors, setErrors] = useState<{ organizationName?: string }>({});
  const { start, stop, loading } = useLoading();
  const { accessToken, setRole } = useSessionStore();
  const toast = useToast();

  const handleSubmit = async () => {
    const result = organizationSchema.safeParse({ organizationName });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        organizationName: errorMessages.organizationName?.[0],
      });
      return;
    }

    setErrors({});
    start();

    const createdOrganization = await createOrganization({
      organizationName,
      accessToken,
    });
    // const data = createdOrganization.json();

    if (!createdOrganization) {
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
              <ToastTitle>Organization created successfuly</ToastTitle>
              <ToastDescription>
                Please share member key to your organization member
              </ToastDescription>
            </Toast>
          );
        },
      });
      setRole("organization");
    }

    router.navigate("/(tabs)");

    stop();
  };

  return (
    <CardContainer
      title="Create an organization"
      description="Register your organization"
    >
      <VStack className="mt-5" space="md">
        <FormControl
          isInvalid={!!errors.organizationName}
          size="md"
          isRequired
          isDisabled={loading}
        >
          <FormControlLabel>
            <FormControlLabelText>Organization Name</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"xl"}>
            <InputField
              placeholder="Your organization name"
              value={organizationName}
              onChange={(e: any) => setOrganizationName(e.nativeEvent.text)}
            />
          </Input>
          {errors.organizationName && (
            <FormControlError>
              <FormControlErrorText>
                {errors.organizationName}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <Button
          className="mt-4 btn-primary"
          onPress={handleSubmit}
          disabled={loading}
          size="xl"
        >
          <ButtonText>
            {loading ? "Creating" : "Create Organization"}
          </ButtonText>
        </Button>
      </VStack>
    </CardContainer>
  );
}
