import { MaterialIcons } from "@expo/vector-icons";
import api from "api";
import { usePreloader } from "components/PreloaderContext";
import LoadingIndicator from "components/PreloaderContext/LoadingIndicator";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Center,
  CloseIcon,
  Collapse,
  Divider,
  FormControl,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  Link,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { auth } from "services/firebaseInit";
import useUserStore from "store/useUserStore";
import { colors } from "styles/common";
export default function SignInScreen({ navigation, route }) {
  const { setLoading } = usePreloader();
  const { updateUserStore } = useUserStore(({ updateUserStore }) => ({ updateUserStore }));
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email.trim(), password);
      const userRecord = await api.getUser(user.uid);
      updateUserStore(userRecord);
      navigation.navigate("FeedScreen");
    } catch (error) {
      setErrors("Auth error");
      setTimeout(() => {
        setErrors("");
      }, 5000);
    }
    setLoading(false);
  };
  return (
    <Box background={[colors.light.background]} flex={1}>
      <LoadingIndicator />
      <Collapse isOpen={Boolean(error.length)}>
        <Alert w="100%" status={"error"}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {error}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" onPress={() => setErrors("")} />}
                _icon={{
                  color: "coolGray.600",
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      </Collapse>
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
            Sign In
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
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input autoCapitalize={"none"} onChangeText={setEmail} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type={show ? "text" : "password"}
                onChangeText={setPassword}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                autoCapitalize={"none"}
              />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="blueGray" onPress={handleSignIn}>
              Sign in
            </Button>
            <HStack mt="auto" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}
