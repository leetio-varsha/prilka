import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { Text } from "react-native";
import FeedScreen from "screens/FeedScreen";
import PrivacyPolicyScreen from "screens/PrivacyPolicyScreen";
import SignInScreen from "screens/SignInScreen";
import SignUpScreen from "screens/SignUpScreen";
const prefix = Linking.createURL("/");

const Screens = [
  { name: "FeedScreen", component: FeedScreen, screenOptions: { headerShown: false } },
  { name: "SignInScreen", component: SignInScreen, screenOptions: { presentation: "modal", headerShown: false } },
  { name: "SignUpScreen", component: SignUpScreen, screenOptions: { presentation: "modal", headerShown: false } },
  // { name: "ManageScreen", component: ManageScreen },
  // { name: "HomeScreen", component: HomeScreen },
  // { name: "GameLobbyScreen", component: GameLobbyScreen },
  // { name: "GameScreen", component: GameScreen },
  { name: "PrivacyPolicyScreen", component: PrivacyPolicyScreen, screenOptions: { headerShown: false } },
];

const config = {
  screens: {
    FeedScreen: "feed",
    SignInScreen: "signin",
    SignUpScreen: "signup",
    PrivacyPolicyScreen: "privacy/:dpl",
    // ManageScreen: "manage",
    // HomeScreen: "home",
    // GameLobbyScreen: "game-lobby",
    // GameScreen: "game",
    // PrivacyPolicyScreen: "privacy-policy",
  },
};

const Stack = createNativeStackNavigator();

const themeColor = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#1a1d1e",
  },
};
function Navigation() {
  const linking = {
    prefixes: [prefix, ""], // TODO: add appsflyer domain here
    config,
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} theme={themeColor}>
      <Stack.Navigator initialRouteName={"FeedScreen"}>
        {Screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.screenOptions as any}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
