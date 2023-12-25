import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { OneSignal } from "react-native-onesignal";
export default function ManageScreen({ navigation }) {
  // console.log(url);
  const url = Linking.useURL() || "-1";
  const [section, setSection] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null | -1>(-1);

  useEffect(() => {
    if (!permissionGranted || permissionGranted === -1) {
      Notifications.requestPermissionsAsync().then((response) => {
        // @ts-ignore
        setPermissionGranted(response === "granted");
      });
    }
  }, [permissionGranted]);
  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };

  useFocusEffect(
    useCallback(() => {
      const setInitialPermission = async () => {
        const granted = OneSignal.Notifications.hasPermission();
        setPermissionGranted(granted ?? null);
      };

      // FIXME: Hack to get correct value from `hasPermission()`
      // @see https://github.com/OneSignal/react-native-onesignal/issues/1506#issuecomment-1706332448
      setTimeout(setInitialPermission, 0);
    }, [])
  );

  useEffect(() => {
    (async () => {
      // const { isInternetReachable } = await Network.getNetworkStateAsync();
      const isInternetReachable = false;
      const storeDeeplink = await AsyncStorage.getItem("deepLink");
      // console.log("storeDeeplink", storeDeeplink);
      const deepLink = url !== "-1" ? url : storeDeeplink;
      if (!isInternetReachable) {
        setSection(1);
        navigation.push("GameLobbyScreen");
        setTimeout(hideSplashScreen, 1000);
      } else {
        if (deepLink === "-1") {
          setSection(2);
          navigation.push("GameLobbyScreen");
          setTimeout(hideSplashScreen, 1000);
        } else {
          setSection(3);
          navigation.push("HomeScreen", { deepLink });
          await AsyncStorage.setItem("deepLink", url);
          setTimeout(hideSplashScreen, 1000);
        }
      }
    })();
  }, [url]);

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text style={{ color: "#000" }}>This is manage screen {section}</Text>
    </View>
  );
}
