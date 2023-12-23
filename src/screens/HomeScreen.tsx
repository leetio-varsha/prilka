import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function HomeScreen({ navigation, route }) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // const [deepLink, setDeepLink] = useState<any>(route.params?.deepLink);
  const deepLink = route.params?.deepLink;

  // const setDeeplink = async () => {
  //   const storeDeeplink = await AsyncStorage.setItem("deepLink", deepLink);
  //
  //   setDeepLink(storeDeeplink);
  // };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // void setDeeplink();
        // console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (deepLink) {
    const deeplinkFull = deepLink?.split("//")[1];
    const deeplinkParams = deeplinkFull?.split("__");
    const deeplink = deeplinkParams?.[0];
    const uts = 0; // TODO:// add from appflyer
    const ucmp = 0; // TODO:// add from appflyer
    const ucnt = 0; // TODO:// add from appflyer
    const lid = 0; // TODO:// add from appflyer
    const aid = 0; // TODO:// add from appflyer
    const stid = "com.prilka.princesdesert"; // TODO:// add from appsflyerID
    const cid = 0; // TODO:// add from GAID
    //FB deep link
    const fbDeeplink = deeplinkParams
      .slice(1)
      .map((param, index) => `af_sub${index + 1}=${param}`)
      .join("&");

    // console.log("HOME deeplink:", deeplink);

    const domain = "https://m.vbet.ua/en/";
    const campaignID = "/"; //TODO add campaing id
    const webViewLink = `${campaignID}?uts=${uts}&ucmp=${ucmp}&ucnt=${ucnt}&lid=${lid}&aid=${aid}&stid=${stid}&cid=${cid}&dplnk=${deeplink}&${fbDeeplink}`;
    // console.log("webViewLink", webViewLink);

    return ["active", "inactive"].includes(appStateVisible) ? (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top"]}>
        <WebView
          source={{ uri: domain + webViewLink }}
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          javascriptEnabled={true}
        />
        <StatusBar style="dark" />
      </SafeAreaView>
    ) : null;
  }

  return null;
}
