import * as Sentry from "@sentry/react-native";
import { AssetsContextProvider } from "components/AssetsContext";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import Navigation from "navigation/";
import { View } from "react-native";
import appsFlyer from "react-native-appsflyer";
import { OneSignal } from "react-native-onesignal";
import { SafeAreaProvider } from "react-native-safe-area-context";

Sentry.init({
  dsn: "https://d45f95bfcc3da0435cbdf7bf2ce8e8fc@o4505668978212864.ingest.sentry.io/4506457161072640",
});

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
    // Sentry.captureException(`appsFlyer result: ${JSON.stringify(result)}`);
  },
  (error) => {
    console.log("error", error);
    // Sentry.captureException(`appsFlyer error: ${JSON.stringify(error)}`);
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
  const eventListener = async (event) => {
    if (event.type === Updates.UpdateEventType.ERROR) {
    } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      // Sentry.captureException(`New update available: ${JSON.stringify(event)}`);
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  };
  Updates.useUpdateEvents(eventListener);

  return (
    <View style={{ flex: 1 }}>
      <AssetsContextProvider>
        <SafeAreaProvider>
          <Root />
        </SafeAreaProvider>
      </AssetsContextProvider>
    </View>
  );
}
