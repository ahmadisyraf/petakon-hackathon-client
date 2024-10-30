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
import { joinOrganization } from "@/services/organization";
import { VStack } from "@/components/ui/vstack";
import useLoading from "@/hooks/useLoading";
import { useState } from "react";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { useSessionStore } from "@/store/user";
import { router } from "expo-router";
import { z } from "zod";

const organizationSchema = z.object({
  memberKey: z.string().min(1, { message: "Member key is required" }),
});

export default function JoinOrganizationScreen() {
  const [memberKey, setMemberKey] = useState<string>("");
  const [errors, setErrors] = useState<{ organizationName?: string }>({});
  const { start, stop, loading } = useLoading();
  const toast = useToast();
  const { accessToken, setRole } = useSessionStore();

  const handleSubmit = async () => {
    const result = organizationSchema.safeParse({ memberKey });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        organizationName: errorMessages.memberKey?.[0],
      });
      return;
    }

    setErrors({});
    start();

    const joinedOrganization = await joinOrganization({
      memberKey,
      accessToken,
    });

    if (!joinedOrganization) {
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

      router.push("/(user)")
    } else {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          return (
            <Toast action="success" variant="solid">
              <ToastTitle>Organization joined successfuly</ToastTitle>
            </Toast>
          );
        },
      });
      setRole("organization")
      router.push("/(organization)")
    }

    stop();
  };

  return (
    <CardContainer
      title="Join organization"
      description="Join organization via member key"
    >
      <VStack className="mt-5" space="md">
        <FormControl
          isInvalid={!!errors.organizationName}
          size="md"
          isRequired
          isDisabled={loading}
        >
          <FormControlLabel>
            <FormControlLabelText>Member key</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"xl"}>
            <InputField
              placeholder="Your member key"
              value={memberKey}
              onChange={(e: any) => setMemberKey(e.nativeEvent.text)}
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
            {loading ? "Submitting..." : "Create Organization"}
          </ButtonText>
        </Button>
      </VStack>
    </CardContainer>
  );
}
