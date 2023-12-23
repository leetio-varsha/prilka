import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import * as Network from "expo-network";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
export default function ManageScreen({ navigation }) {
  // console.log(url);
  const url = Linking.useURL() || "-1";

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    (async () => {
      const { isInternetReachable } = await Network.getNetworkStateAsync();
      // const isInternetReachable = false;
      const storeDeeplink = await AsyncStorage.getItem("deepLink");
      // console.log("storeDeeplink", storeDeeplink);
      const deepLink = url !== "-1" ? url : storeDeeplink;
      if (!isInternetReachable) {
        navigation.push("GameLobbyScreen");
        setTimeout(hideSplashScreen, 1000);
      } else {
        if (deepLink === "-1") {
          navigation.push("GameLobbyScreen");
          setTimeout(hideSplashScreen, 1000);
        } else {
          navigation.push("HomeScreen", { deepLink });
          await AsyncStorage.setItem("deepLink", url);
          setTimeout(hideSplashScreen, 1000);
        }
      }
    })();
  }, [url]);

  return null;
}
