import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Heading, HStack, Icon, Image, VStack } from "native-base";
import useUserStore from "store/useUserStore";
import { colors } from "styles/common";
export const Header = () => {
  const user = useUserStore((state) => state.user);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isLoggedIn = Object.keys(user).length > 0;

  // console.log("user", user);
  // const clearUserStore = useUserStore((state) => state.clearUserStore);
  //
  // console.log(user);
  //
  // useEffect(() => {
  //   clearUserStore();
  // }, []);

  const toLoginAction = () => {
    navigation.push("SignInScreen");
  };
  const toProfileAction = () => {
    navigation.push("ProfileScreen");
  };

  return (
    <HStack safeArea justifyContent={"space-between"} alignItems={"center"}>
      <HStack alignItems={"center"}>
        <Image source={require("assets/logo.png")} size={"sm"} alt={"logo"} rounded={"xl"} />
        <VStack justifyContent={"center"}>
          <Heading size={"xl"} color={colors.dark.font} marginLeft={3}>
            Game Buzz test
          </Heading>
        </VStack>
      </HStack>
      {isLoggedIn ? (
        <Icon
          as={require("react-native-vector-icons/FontAwesome").default}
          name={"user"}
          size={30}
          color={colors.dark.font}
          onPress={toProfileAction}
        />
      ) : (
        <Icon
          as={require("react-native-vector-icons/MaterialIcons").default}
          name={"login"}
          size={30}
          color={colors.dark.font}
          onPress={toLoginAction}
        />
      )}
    </HStack>
  );
};
