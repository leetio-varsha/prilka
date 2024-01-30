import api from "api";
import { Masthead } from "components/Masthead";
import { StatusBar } from "expo-status-bar";
import { VStack } from "native-base";
import { useEffect } from "react";
import { View } from "react-native";

export default function FeedScreen({ navigation, route }) {
  useEffect(() => {
    (async () => {
      const data = await api.getPosts();
    })();
  }, []);

  return (
    <VStack>
      <StatusBar style="light" />
      <Masthead />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}></View>
    </VStack>
  );
}
