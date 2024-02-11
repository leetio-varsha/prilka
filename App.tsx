import api from "api";
import { PreloaderProvider } from "components/PreloaderContext";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { getExpoPushTokenAsync } from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import * as ExpoTrackingTransparency from "expo-tracking-transparency";
import * as Updates from "expo-updates";
import { NativeBaseProvider } from "native-base";
import Navigation from "navigation/";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import appsFlyer from "react-native-appsflyer";
import { LogLevel, OneSignal } from "react-native-onesignal";
import useConfigStore from "store/useConfigStore";

OneSignal.Debug.setLogLevel(LogLevel.Verbose);
OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

const appsFlyerOptions: any = {
  devKey: "My9XkEmCQftu8eU3rRNHnM",
  isDebug: true,
  onInstallConversionDataListener: false, //Optional
  timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
};

if (Platform.OS === "ios") {
  appsFlyerOptions.appId = "6477542235"; //TODO: add your iOS app id
}

SplashScreen.preventAutoHideAsync();

function Root() {
  return <Navigation />;
}

export default function App() {
  const { isDownloading, isChecking, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const { setConfigStore, config } = useConfigStore(({ setConfigStore, config }) => ({ setConfigStore, config }));
  const [notificationsRequested, setNotificationsRequested] = useState(false);
  const [trackingTransparencyRequested, setTrackingTransparencyRequested] = useState(false);
  const [localConfig, setLocalConfig] = useState({});
  const [isAppsFlyerInitialized, setIsAppsFlyerInitialized] = useState(false);

  useEffect(() => {
    if (isUpdateAvailable) {
      Updates.fetchUpdateAsync();
    }
  }, [isUpdateAvailable]);

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  /*
   * Start AppsFlyer
   * */
  async function initAppsFlyer(options) {
    try {
      await appsFlyer.initSdk(options);
      setIsAppsFlyerInitialized(true);
    } catch (error) {
      setIsAppsFlyerInitialized(true);
    }
  }

  useEffect(() => {
    void initAppsFlyer(appsFlyerOptions);
  }, []);
  /*END Appsflyer*/

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

  /*
   * Start Permissions
   * */
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
  /*
   * End Permissions
   * */

  useEffect(() => {
    (async () => {
      const config = await api.getConfig();
      setLocalConfig((prev) => ({ ...prev, ...config }));
    })();
  }, []);

  useEffect(() => {
    if (notificationsRequested && trackingTransparencyRequested && isAppsFlyerInitialized) {
      setConfigStore(localConfig);
      setIsConfigLoaded(true);
    }
  }, [notificationsRequested, trackingTransparencyRequested, isAppsFlyerInitialized]);

  if (!isConfigLoaded) {
    return null;
  }

  if (isUpdateAvailable) {
    return null;
  }

  if (isDownloading || isChecking) {
    return null;
  }

  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 1000);

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
