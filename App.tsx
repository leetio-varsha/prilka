import api from "api";
import { PreloaderProvider } from "components/PreloaderContext";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { getExpoPushTokenAsync } from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import * as ExpoTrackingTransparency from "expo-tracking-transparency";
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
  const { setConfigStore, config } = useConfigStore(({ setConfigStore, config }) => ({ setConfigStore, config }));
  const [notificationsRequested, setNotificationsRequested] = useState(false);
  const [trackingTransparencyRequested, setTrackingTransparencyRequested] = useState(false);
  const [localConfig, setLocalConfig] = useState({});

  useEffect(() => {
    if (!notificationsRequested) {
      askNotificationsPermission();
    }
  }, [notificationsRequested]);

  useEffect(() => {
    if (!trackingTransparencyRequested) {
      requestTrackingTransparencyPermission();
    }
  }, [trackingTransparencyRequested]);

  const askNotificationsPermission = async () => {
    const notificationPermission = await Notifications.requestPermissionsAsync();
    setNotificationsRequested(true);
    const configToSave: any = {};
    if (notificationPermission.granted) {
      const pushToken = await getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      configToSave.pushToken = pushToken.data;
    }
    setLocalConfig((prev) => ({ ...prev, ...configToSave }));
  };

  const requestTrackingTransparencyPermission = async () => {
    const trackingPermission = await ExpoTrackingTransparency.requestTrackingPermissionsAsync();
    setTrackingTransparencyRequested(true);
    const configToSave: any = {};
    if (trackingPermission.status === "granted") {
      configToSave.deviceID = ExpoTrackingTransparency.getAdvertisingId();
    }
    setLocalConfig((prev) => ({ ...prev, ...configToSave }));
  };

  useEffect(() => {
    (async () => {
      const config = await api.getConfig();
      setLocalConfig((prev) => ({ ...prev, ...config }));
    })();
  }, []);

  useEffect(() => {
    if (notificationsRequested && trackingTransparencyRequested) {
      setConfigStore(localConfig);
      setIsConfigLoaded(true);
    }
  }, [notificationsRequested, trackingTransparencyRequested]);

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
