import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "api";
import * as Linking from "expo-linking";
import { Box, Text } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import { parseTrack } from "services/parseTrack";
import useConfigStore from "store/useConfigStore";
import useTrackingStore from "store/useTrackingStore";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function PrivacyPolicyScreen({ navigation, route }) {
  const url = Linking.useURL();
  const config = useConfigStore((state) => state.config);
  const { setTrackingStore, tracking } = useTrackingStore(({ setTrackingStore, tracking }) => ({
    setTrackingStore,
    tracking,
  }));
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (url) {
      (async () => {
        const tack = await parseTrack(url);
        setTrackingStore(tack);
      })();
    }
  }, [url]);

  useEffect(() => {
    if (tracking?.camp && config?.pushToken) {
      (async () => {
        await api.savePushToken(tracking.camp, config?.pushToken);
      })();
    }
  }, [config, tracking]);

  const validateUrl = (validateURL: string) => {
    const domain = validateURL.split("/")[2];
    return tracking?.trusted.includes(domain);
  };
  const onWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.description.includes("SSL")) {
      navigation.navigate("HomeScreen");
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 10,
          height: 10,
          backgroundColor: "transparent",
        }}
      >
        <Text>X</Text>
      </TouchableOpacity>
      <Box safeArea flex={1}>
        <WebView
          backgroundColor={"#1a1d1e"}
          onLoad={() => setIsLoaded(true)}
          source={{ uri: tracking?.trusted ? tracking?.trusted : "" }} //TODO: //Add regular privacy policy link here
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onError={onWebViewError}
        />
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
