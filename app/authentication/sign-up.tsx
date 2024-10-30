import CardContainer from "@/components/card-container";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { InfoIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import useLoading from "@/hooks/useLoading";
import { createUser } from "@/services/user";
import { router } from "expo-router";
import { useState } from "react";
import { z } from "zod";

const registrationSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters long" }),
    confirmPassword: z
      .string()
      .min(3, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [authError, setAuthError] = useState<string>("");
  const toast = useToast();
  const { start, stop, loading } = useLoading();

  const handleSubmit = async () => {
    const result = registrationSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        firstName: errorMessages.firstName?.[0],
        lastName: errorMessages.lastName?.[0],
        email: errorMessages.email?.[0],
        password: errorMessages.password?.[0],
        confirmPassword: errorMessages.confirmPassword?.[0],
      });
      return;
    }

    try {
      start();

      const user = await createUser({
        firstName,
        lastName,
        email,
        password,
        role: "user",
      });

      if (!user) {
        setAuthError("Registration failed, please try again.");
      } else {
        toast.show({
          placement: "top",
          duration: 3000,
          render: ({ id }) => {
            return (
              <Toast action="success" variant="solid">
                <ToastTitle>Account registration successful</ToastTitle>
                <ToastDescription>
                  Please continue to sign in with registered account
                </ToastDescription>
              </Toast>
            );
          },
        });
      }

      router.push("/authentication");
      stop();
    } catch (error) {
      setAuthError("An error occurred during registration.");
      stop();
    }
  };

  return (
    <CardContainer
      title="Sign up to CIKO 👋"
      description="Please sign up to CIKO to continue"
    >
      {authError.length > 0 && (
        <Alert action="error" variant="solid" className="mt-5">
          <AlertIcon as={InfoIcon} />
          <AlertText>{authError}</AlertText>
        </Alert>
      )}
      <VStack className="mt-5" space="md">
        <FormControl
          isInvalid={!!errors.firstName}
          size="md"
          isRequired
          isDisabled={loading}
        >
          <FormControlLabel>
            <FormControlLabelText>First Name</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"xl"}>
            <InputField
              placeholder="John"
              value={firstName}
              onChange={(e: any) => setFirstName(e.nativeEvent.text)}
            />
          </Input>
          {errors.firstName && (
            <FormControlError>
              <FormControlErrorText>{errors.firstName}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl
          isInvalid={!!errors.lastName}
          size="md"
          isRequired
          isDisabled={loading}
        >
          <FormControlLabel>
            <FormControlLabelText>Last Name</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"xl"}>
            <InputField
              placeholder="Doe"
              value={lastName}
              onChange={(e: any) => setLastName(e.nativeEvent.text)}
            />
          </Input>
          {errors.lastName && (
            <FormControlError>
              <FormControlErrorText>{errors.lastName}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl
          isInvalid={!!errors.email}
          size="md"
          isRequired
          isDisabled={loading}
        >
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"xl"}>
            <InputField
              placeholder="email@example.com"
              value={email}
              onChange={(e: any) => setEmail(e.nativeEvent.text)}
            />
          </Input>
          {errors.email && (
            <FormControlError>
              <FormControlErrorText>{errors.email}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl
          isInvalid={!!errors.password}
          size="md"
          isRequired
          isDisabled={loading}
        >
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"xl"}>
            <InputField
              type="password"
              placeholder="password"
              value={password}
              onChange={(e: any) => setPassword(e.nativeEvent.text)}
            />
          </Input>
          {errors.password && (
            <FormControlError>
              <FormControlErrorText>{errors.password}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl
          isInvalid={!!errors.confirmPassword}
          size="md"
          isRequired
          isDisabled={loading}
        >
          <FormControlLabel>
            <FormControlLabelText>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"xl"}>
            <InputField
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.nativeEvent.text)}
            />
          </Input>
          {errors.confirmPassword && (
            <FormControlError>
              <FormControlErrorText>
                {errors.confirmPassword}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <Button
          className="mt-4"
          size="xl"
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <Box className="flex flex-row items-center">
              <ButtonSpinner color={"gray"} />
              <ButtonText className="font-medium text-sm ml-2">
                Please wait...
              </ButtonText>
            </Box>
          ) : (
            <ButtonText>Sign in</ButtonText>
          )}
        </Button>
      </VStack>
    </CardContainer>
  );
}
