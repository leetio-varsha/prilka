import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { Text, View } from "react-native";
import GameLobbyScreen from "screens/GameLobbyScreen";
import GameScreen from "screens/GameScreen";
import HomeScreen from "screens/HomeScreen";
import ManageScreen from "screens/ManageScreen";

const prefix = Linking.createURL("/");

const Screens = [
  { name: "ManageScreen", component: ManageScreen },
  { name: "HomeScreen", component: HomeScreen },
  { name: "GameLobbyScreen", component: GameLobbyScreen },
  { name: "GameScreen", component: GameScreen },
];

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
    prefixes: [prefix, "https://princesdesert.onelink.me"],
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} theme={themeColor}>
        <Stack.Navigator>
          {Screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Navigation;
