import CardContainer from "@/components/auth/CardContainer";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Button, ButtonText } from "@/components/ui/button";
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
import { createUser } from "@/services/user"; // Ensure this is your API function
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
      const user = await createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
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
    } catch (error) {
      setAuthError("An error occurred during registration.");
      console.error(error);
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
      <VStack className="mt-5">
        <FormControl isInvalid={!!errors.firstName} size="md" isRequired>
          <FormControlLabel>
            <FormControlLabelText>First Name</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"lg"}>
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

        <FormControl isInvalid={!!errors.lastName} size="md" isRequired>
          <FormControlLabel>
            <FormControlLabelText>Last Name</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"lg"}>
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

        <FormControl isInvalid={!!errors.email} size="md" isRequired>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"lg"}>
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

        <FormControl isInvalid={!!errors.password} size="md" isRequired>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"lg"}>
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

        <FormControl isInvalid={!!errors.confirmPassword} size="md" isRequired>
          <FormControlLabel>
            <FormControlLabelText>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"lg"}>
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

        <Button className="mt-4" size="lg" onPress={handleSubmit}>
          <ButtonText>Sign up</ButtonText>
        </Button>
      </VStack>
    </CardContainer>
  );
}
