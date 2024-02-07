import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import CommentsScreen from "screens/CommentsScreen";
import FeedScreen from "screens/FeedScreen";
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
  { name: "SignUpScreen", component: SignUpScreen, screenOptions: { presentation: "modal", headerShown: false } },
  { name: "ProfileScreen", component: ProfileScreen, screenOptions: { presentation: "modal", headerShown: false } },
  { name: "PrivacyPolicyScreen", component: PrivacyPolicyScreen, screenOptions: { headerShown: false } },
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
  const [initialRouteName, setInitialRouteName] = useState("");
  // ready
  const linking = {
    prefixes: [prefix, "https://cloak-prill.netlify.app"], // TODO: add appsflyer domain here
    config,
  };

  useEffect(() => {
    (async () => {
      const initial = await AsyncStorage.getItem("lastVisitedScreen");
      setInitialRouteName(initial || "FeedScreen");
    })();
  }, []);

  // console.log(initialRouteName);
  //
  // if (!initialRouteName) return <Text>Loading...</Text>;

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} theme={themeColor}>
      <Stack.Navigator initialRouteName={initialRouteName}>
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
