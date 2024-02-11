import api from "api";
import { usePreloader } from "components/PreloaderContext";
import LoadingIndicator from "components/PreloaderContext/LoadingIndicator";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  AlertDialog,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  FormControl,
  Heading,
  Input,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { useRef, useState } from "react";
import { Platform } from "react-native";
import { auth } from "services/firebaseInit";
import useUserStore from "store/useUserStore";
import { colors } from "styles/common";

export default function ProfileScreen({ navigation, route }) {
  const { setLoading } = usePreloader();
  const { updateUserStore, user, clearUserStore } = useUserStore(({ updateUserStore, user, clearUserStore }) => ({
    updateUserStore,
    user,
    clearUserStore,
  }));

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [error, setErrors] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (user) {
        const userRecord = await api.createUserOrUpdate(user.uid, {
          ...user,
          displayName,
        });

        updateUserStore(userRecord);

        alert("Profile updated");
      }
    } catch (error) {
      setErrors("Auth error");
      setTimeout(() => {
        setErrors("");
      }, 5000);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      clearUserStore();
      navigation.replace("FeedScreen");
      setLoading(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      await api.deleteUser(user.uid);
      await api.deleteUserFromAuth();
      clearUserStore();
      navigation.replace("FeedScreen");
      setLoading(false);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
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
            Update profile
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>User name</FormControl.Label>
              <Input value={displayName} onChangeText={setDisplayName} />
            </FormControl>
            <FormControl>
              <Button onPress={handleSignUp} colorScheme="emerald" mt="5">
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Button onPress={handleLogout} colorScheme="yellow" mt="2">
                Log out
              </Button>
            </FormControl>
            <Spacer />
            <Divider bg="blueGray.400" thickness="1" orientation="horizontal" />
            <Spacer />
            <DeleteAlert handleDeleteUser={handleDeleteUser} />
            <FormControl>
              <Button
                onPress={() => {
                  navigation.popToTop();
                  navigation.push("PrivacyPolicyScreen");
                }}
                colorScheme="blueGray"
                mt="2"
              >
                Privacy Policy
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}

const DeleteAlert = ({ handleDeleteUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  return (
    <>
      <Button shadow={2} colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
        Delete Customer
      </Button>
      <AlertDialog useRNModal={true} leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Customer</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to you. This action cannot be reversed. Deleted data can not be
            recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  handleDeleteUser();
                  onClose();
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};
