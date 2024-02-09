import { usePreloader } from "components/PreloaderContext";
import LoadingIndicator from "components/PreloaderContext/LoadingIndicator";
import { sendPasswordResetEmail } from "firebase/auth";
import { Box, Button, Center, Divider, FormControl, Heading, Input, Text, VStack } from "native-base";
import { useState } from "react";
import { auth } from "services/firebaseInit";
import { colors } from "styles/common";

export default function ForgotPasswordScreen({ navigation, route }) {
  const { setLoading } = usePreloader();
  const [email, setEmail] = useState("");
  const [error, setErrors] = useState("");

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      navigation.navigate("SignInScreen");
    } catch (error) {
      console.log(error);
      setErrors("Error sending password reset email");
      setTimeout(() => {
        setErrors("");
      }, 5000);
    }
    setLoading(false);
  };

  return (
    <Box background={[colors.light.background]} flex={1}>
      <LoadingIndicator />
      <Center w="100%">
        <Divider bg="blueGray.400" w={100} thickness="4" mt="1" orientation="horizontal" />
        <Box safeArea p="2" py="8" w="90%">
          <Heading
            size="xl"
            fontWeight="600"
            color="coolGray.800"
            textAlign={"center"}
            _dark={{
              color: "warmGray.50",
            }}
          >
            Forgot Password
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="sm"
            textAlign={"center"}
          >
            Enter your email to reset your password
          </Heading>
          <FormControl mt={10}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="done"
              onSubmitEditing={handlePasswordReset}
            />
          </FormControl>
          {error ? <Text>{error}</Text> : null}
          <VStack space={2} mt="5">
            <Button onPress={handlePasswordReset} colorScheme="blueGray">
              Reset Password
            </Button>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}
