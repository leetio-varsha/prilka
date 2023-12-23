import { AssetsContextProvider } from "components/AssetsContext";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import Navigation from "navigation/";
import { useEffect, useState } from "react";
import appsFlyer from "react-native-appsflyer";
import { OneSignal } from "react-native-onesignal";
import { SafeAreaProvider } from "react-native-safe-area-context";

appsFlyer.initSdk(
  {
    devKey: "My9XkEmCQftu8eU3rRNHnM",
    isDebug: false,
    appId: "com.prilka.princesdesert", // for ios app id is necessary
    onInstallConversionDataListener: true, //Optional
    onDeepLinkListener: true, //Optional
    timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
  },
  (result) => {
    console.log("result", result);
  },
  (error) => {
    console.error(error);
  }
);
OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

SplashScreen.preventAutoHideAsync()
  .then((result) => {
    if (result) {
      console.log("SplashScreen was prevented from auto-hiding");
    } else {
      console.log("SplashScreen auto-hide is disabled");
    }
  })
  .catch(console.warn);

function Root() {
  return <Navigation />;
}

export default function App() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null | -1>(-1);

  useEffect(() => {
    if (!permissionGranted || permissionGranted === -1) {
      Notifications.requestPermissionsAsync().then((response) => {
        // @ts-ignore
        setPermissionGranted(response === "granted");
      });
    }
  }, [permissionGranted]);

  const eventListener = async (event) => {
    if (event.type === Updates.UpdateEventType.ERROR) {
      // Handle error
    } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
      // Handle no update available
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  };
  Updates.useUpdateEvents(eventListener);

  useEffect(() => {
    const setInitialPermission = async () => {
      const granted = OneSignal.Notifications.hasPermission();

      // console.log("INITIAL PERM", granted);

      setPermissionGranted(granted ?? null);
    };

    // FIXME: Hack to get correct value from `hasPermission()`
    // @see https://github.com/OneSignal/react-native-onesignal/issues/1506#issuecomment-1706332448
    setTimeout(setInitialPermission, 0);
  }, []);

  return (
    <AssetsContextProvider>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </AssetsContextProvider>
  );
}
