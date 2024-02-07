import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import * as Network from "expo-network";
import { Box } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import WebView from "react-native-webview";
import { parseTrack } from "services/parseTrack";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function PrivacyPolicyScreen({ navigation, route }) {
  const url = Linking.useURL();
  const [tracking, setTracking] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const savedDpl = await AsyncStorage.getItem("dpl");
      if (url || savedDpl) {
        let trackUrl = url;
        if (savedDpl) {
          trackUrl = savedDpl;
        } else {
          void AsyncStorage.setItem("dpl", url);
        }

        const tack = await parseTrack(trackUrl);
        setTracking(tack);
      }
    })();
  }, [url]);

  useEffect(() => {
    (async () => {
      const { isInternetReachable } = await Network.getNetworkStateAsync();

      if (!isInternetReachable) {
        navigation.navigate("FeedScreen");
      }
    })();
  }, []);

  const validateUrl = (validateURL: string) => {
    const domain = validateURL.split("/")[2];
    return tracking?.trusted.includes(domain);
  };
  const onWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.description.includes("SSL")) {
      navigation.navigate("FeedScreen");
      console.warn("SSL error occurred: ", nativeEvent.description);
    } else {
      console.warn("WebView error: ", nativeEvent);
    }
  };

  const onShouldStartLoadWithRequest = (request) => {
    return validateUrl(request.url);
  };

  useEffect(() => {
    if (isLoaded) {
      (async () => {
        await AsyncStorage.setItem("lastVisitedScreen", "PrivacyPolicyScreen");
      })();
    }
  }, [isLoaded]);

  return (
    <Box flex={1}>
      <Box safeArea flex={1}>
        {tracking && (
          <WebView
            backgroundColor={"#1a1d1e"}
            onLoad={() => setIsLoaded(true)}
            source={{ uri: tracking?.trusted ? tracking?.trusted : "" }}
            // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            // onError={onWebViewError}
          />
        )}
        {!isLoaded && (
          <Box
            position={"absolute"}
            flex={1}
            width={width}
            height={height}
            alignItems={"center"}
            justifyContent={"center"}
            backgroundColor={"rgba(0,0,0, .8)"}
          >
            <ActivityIndicator size="large" color={"white"} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
