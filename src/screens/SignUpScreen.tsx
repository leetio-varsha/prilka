import { MaterialIcons } from "@expo/vector-icons";
import { usePreloader } from "components/PreloaderContext";
import LoadingIndicator from "components/PreloaderContext/LoadingIndicator";
import Constants from "expo-constants";
import { getExpoPushTokenAsync } from "expo-notifications";
import { updateProfile } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  FormControl,
  Heading,
  Icon,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import useUserStore from "store/useUserStore";
import { colors } from "styles/common";

import api from "api";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

export default function SignUpScreen({ navigation, route }) {
  const { setLoading } = usePreloader();
  const { updateUserStore } = useUserStore(({ updateUserStore }) => ({ updateUserStore }));
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setErrors] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await api.createUser(email.trim(), password);
      if (user) {
        await updateProfile(user, { displayName });
        const pushToken = await getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        const userRecord = await api.createUserOrUpdate(user.uid, {
          displayName,
          email: user.email,
          uid: user.uid,
          pushToken: pushToken.data,
        });
        // Store the push token in your server
        updateUserStore(userRecord);

        navigation.navigate("FeedScreen");
      }
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
          <VStack>
            <Text>{error}</Text>
          </VStack>
        </Alert>
      </Collapse>
      <Center w="100%">
        {Platform.OS === "ios" ? (
          <Divider bg="blueGray.400" w={100} thickness="4" mt="1" orientation="horizontal" />
        ) : (
          <StatusBar style="dark" />
        )}
        <Box safeArea p="2" py="8" w="90%">
          <Heading color={colors.light.font} textAlign="center" fontSize="3xl" fontWeight={600}>
            Sign Up
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
            Sign up to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>User name</FormControl.Label>
              <Input value={displayName} onChangeText={setDisplayName} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input autoCapitalize={"none"} value={email} onChangeText={setEmail} />
            </FormControl>
            <FormControl>
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
              </FormControl>
              <Button onPress={handleSignUp} colorScheme="blueGray" mt="5">
                Sign Up
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}
