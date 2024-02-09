import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { Text } from "react-native";
import CommentsScreen from "screens/CommentsScreen";
import FeedScreen from "screens/FeedScreen";
import ForgotPasswordScreen from "screens/ForgotPasswordScreen";
import PostScreen from "screens/PostScreen";
import PrivacyPolicyScreen from "screens/PrivacyPolicyScreen";
import ProfileScreen from "screens/ProfileScreen";
import SignInScreen from "screens/SignInScreen";
import SignUpScreen from "screens/SignUpScreen";
const prefix = Linking.createURL("/");

const Screens = [
  { name: "FeedScreen", component: FeedScreen, screenOptions: { headerShown: false } },
  { name: "PostDetailScreen", component: PostScreen, screenOptions: { presentation: "modal", headerShown: false } },
  { name: "CommentsScreen", component: CommentsScreen, screenOptions: { presentation: "modal", headerShown: false } },
  { name: "SignInScreen", component: SignInScreen, screenOptions: { presentation: "modal", headerShown: false } },
  {
    name: "ForgotPasswordScreen",
    component: ForgotPasswordScreen,
    screenOptions: { presentation: "modal", headerShown: false },
  },
  { name: "SignUpScreen", component: SignUpScreen, screenOptions: { presentation: "modal", headerShown: false } },
  { name: "ProfileScreen", component: ProfileScreen, screenOptions: { presentation: "modal", headerShown: false } },
  {
    name: "PrivacyPolicyScreen",
    component: PrivacyPolicyScreen,
    screenOptions: { presentation: "modal", headerShown: false },
  },
];

const config = {
  screens: {
    FeedScreen: "feed",
    SignInScreen: "signin",
    SignUpScreen: "signup",
    PrivacyPolicyScreen: ":dpl",
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
    prefixes: [prefix, "https://game-buzz.onelink.me"], // TODO: add appsflyer domain here
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
