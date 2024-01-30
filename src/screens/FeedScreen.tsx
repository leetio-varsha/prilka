import api from "api";
import { Masthead } from "components/Masthead";
import PostList from "components/PostList";
import { StatusBar } from "expo-status-bar";
import { ScrollView, VStack } from "native-base";
import { useEffect } from "react";

export default function FeedScreen({ navigation, route }) {
  useEffect(() => {
    (async () => {
      const data = await api.getPosts();
    })();
  }, []);

  return (
    <VStack flex={1}>
      <StatusBar style="light" />
      <ScrollView flex={1} nestedScrollEnabled={true} backgroundColor={"#EFEFEB"}>
        <Masthead />
        <PostList />
      </ScrollView>
    </VStack>
  );
}
