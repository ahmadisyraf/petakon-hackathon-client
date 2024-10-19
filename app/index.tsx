import CardContainer from "@/components/auth/CardContainer";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { InfoIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import useLoading from "@/hooks/useLoading";
import { authenticateUser } from "@/services/user";
import { Link, router } from "expo-router";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" }),
});

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [authError, setAuthError] = useState<string>("");
  const { start, stop, loading } = useLoading();

  const handleSubmit = async () => {

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        email: errorMessages.email?.[0],
        password: errorMessages.password?.[0],
      });

      return;
    }

    start();

    const session = await authenticateUser({ email, password });

    if (session.accessToken === "") {
      setAuthError("Incorrect email or password");
    }

    if (session.accessToken) {
      router.push("/(tabs)");
    }

    stop();
  };

  return (
    <CardContainer
      title="Welcome to Ciko 👋"
      description="Please sign in to continue"
    >
      {authError.length > 0 && (
        <Alert action="error" variant="solid" className="mt-5">
          <AlertIcon as={InfoIcon} />
          <AlertText>{authError}</AlertText>
        </Alert>
      )}
      <VStack className="mt-5">
        <FormControl isInvalid={!!errors.email} size="md" isRequired={true}>
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

        <FormControl isInvalid={!!errors.password} size="md" isRequired={true}>
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

        <Button className="mt-4" size="lg" onPress={handleSubmit} disabled={loading}>
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
        <Link href={"/sign-up"} asChild>
          <Button variant="link" className="mt-4">
            <ButtonText>New user? Sign up</ButtonText>
          </Button>
        </Link>
      </VStack>
    </CardContainer>
  );
}
