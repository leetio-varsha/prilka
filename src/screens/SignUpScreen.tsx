import { MaterialIcons } from "@expo/vector-icons";
import { usePreloader } from "components/PreloaderContext";
import LoadingIndicator from "components/PreloaderContext/LoadingIndicator";
import Constants from "expo-constants";
import { getExpoPushTokenAsync } from "expo-notifications";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
import { auth, db } from "services/firebaseInit";
import useUserStore from "store/useUserStore";
import { colors } from "styles/common";

import { doc, setDoc } from "firebase/firestore";

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
      const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (user) {
        await updateProfile(user, { displayName });
        const pushToken = await getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        // Store the push token in your server
        updateUserStore({
          user: {
            providedData: user?.providerData,
            pushToken: pushToken.data,
          },
        });

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          displayName: displayName,
          uid: user.uid,
          pushToken: pushToken.data,
        });

        navigation.navigate("FeedScreen");
      }
    } catch (error) {
      console.log(error);
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
        <Divider bg="blueGray.400" w={100} thickness="4" mt="1" orientation="horizontal" />
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
              <Button onPress={handleSignUp} mt="5">
                Sign Up
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}
