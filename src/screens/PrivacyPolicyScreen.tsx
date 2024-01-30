import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { Box, Text } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import useTrackingStore from "store/useTrackingStore";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function PrivacyPolicyScreen({ navigation, route }) {
  const url = Linking.useURL();
  const { setTrackingStore, tracking } = useTrackingStore(({ setTrackingStore, tracking }) => ({
    setTrackingStore,
    tracking,
  }));
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(url);
  useEffect(() => {
    if (url) {
      (async () => {
        // const p = await parseTrack(url);
        // setTrackingStore(p);
      })();
    }
  }, [url]);

  const validateUrl = (validateURL: string) => {
    const domain = validateURL.split("/")[2];
    return tracking.trusted.includes(domain);
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
    <View>
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
          source={{ uri: tracking.trusted ? tracking.trusted : "" }}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onError={onWebViewError}
        />
        {!isLoaded && (
          <ActivityIndicator style={{ position: "absolute", top: height / 2, left: width / 2 }} size="large" />
        )}
        {/*<StatusBar style="light" />*/}
      </Box>
    </View>
  );
}
