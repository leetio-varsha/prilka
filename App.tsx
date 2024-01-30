import api from "api";
import { PreloaderProvider } from "components/PreloaderContext";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { getExpoPushTokenAsync } from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import * as ExpoTrackingTransparency from "expo-tracking-transparency";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { NativeBaseProvider } from "native-base";
import Navigation from "navigation/";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { appsFlyerInit } from "services/appsFlyerInit";
import useConfigStore from "store/useConfigStore";

appsFlyerInit();

SplashScreen.preventAutoHideAsync();

function Root() {
  return <Navigation />;
}

export default function App() {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const setConfigStore = useConfigStore(({ setConfigStore }) => setConfigStore);

  // console.log(url);

  // useEffect(() => {
  //   setTimeout(() => {}, [1000]);
  // }, [url]);

  // updateAppService();

  useEffect(() => {
    (async () => {
      const config = await api.getConfig();
      //Notifications
      const { granted } = await Notifications.getPermissionsAsync();
      if (!granted) {
        const notificationPermission = await Notifications.requestPermissionsAsync();
        config.notificationPermission = notificationPermission.granted;
      }
      if (granted) {
        const pushToken = await getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        config.pushToken = pushToken.data;
      }
      //Tracking Transparency
      const { status: trackingPermissionsStatus } = await requestTrackingPermissionsAsync();
      config.trackingTransparencyStatus = trackingPermissionsStatus;

      if (trackingPermissionsStatus === "granted") {
        config.deviceID = ExpoTrackingTransparency.getAdvertisingId();
      }
      await api.savePushToken(config.deviceID || config.pushToken, config.pushToken);

      setConfigStore(config);
      setIsConfigLoaded(true);
    })();
  }, []);

  if (!isConfigLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <NativeBaseProvider>
      <PreloaderProvider>
        <View style={{ flex: 1 }}>
          <Root />
        </View>
      </PreloaderProvider>
    </NativeBaseProvider>
  );
}
