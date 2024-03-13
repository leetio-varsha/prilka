import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import api from "api";
import { Masthead } from "components/Masthead";
import { SkeletonCardHorizontal } from "components/Skeleton";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Badge, Box, Divider, HStack, Image, Pressable, Spacer, Text, VStack } from "native-base";
import React, { useCallback, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, RefreshControl, View } from "react-native";
import useCachedPostsStore from "store/useCachedPostsStore";
import { colors } from "styles/common";

const screenWidth = Dimensions.get("window").width;
export default function FeedScreen() {
  const offset = useRef(new Animated.Value(0)).current;

  const { cachedPosts, setCachedPostsStore } = useCachedPostsStore(({ cachedPosts, setCachedPostsStore }) => ({
    cachedPosts,
    setCachedPostsStore,
  }));
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const [posts, setPosts] = useState(
  //   cachedPosts.length
  //     ? cachedPosts
  //     : [
  //         { id: 1, type: "skeletop" },
  //         { id: 2, type: "skeletop" },
  //         { id: 3, type: "skeletop" },
  //       ]
  // );
  const [posts, setPosts] = useState([
    { id: 1, type: "skeletop" },
    { id: 2, type: "skeletop" },
    { id: 3, type: "skeletop" },
    { id: 4, type: "skeletop" },
    { id: 5, type: "skeletop" },
    { id: 6, type: "skeletop" },
    { id: 7, type: "skeletop" },
  ]);

  const fetchPosts = async () => {
    const data = await api.getPosts();
    setPosts(data);
    setCachedPostsStore(data);
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      // fetchPosts();
    }, [])
  );

  const renderItem = ({ item }) => {
    return !item.type ? (
      <VStack space={2} paddingX={5} divider={<Divider />} backgroundColor={colors.light.background}>
        <Box borderRadius="md" p={3} backgroundColor={"white"}>
          <Pressable
            onPress={() => {
              navigation.navigate("PostDetailScreen", { post: item });
            }}
          >
            <HStack space="4" divider={<Divider />}>
              <Image
                source={{ uri: item.image }}
                alt={item.title}
                borderRadius={10} // round the borders
                style={{
                  aspectRatio: 1,
                }}
              />
              <VStack flex={1}>
                <Text isTruncated numberOfLines={2} bold>
                  {item.title}
                </Text>
                <HStack>
                  <Badge colorScheme="primary" marginTop={1}>
                    {item.category.name.charAt(0).toUpperCase() + item.category.name.slice(1)}
                  </Badge>
                </HStack>
                <Spacer />
                <Text fontSize="xs" color="gray.500" marginTop={5}>
                  {format(new Date(item.created_at.seconds * 1000 + item.created_at.nanoseconds / 1000000), "P")}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        </Box>
      </VStack>
    ) : (
      <VStack space={2} paddingX={0} divider={<Divider />} backgroundColor={colors.light.background}>
        <SkeletonCardHorizontal />
      </VStack>
    );
  };
  return (
    <LinearGradient
      colors={["#563029", "#563029", "#362426", "#1e1d24", "#10131e", "#191b23", "#191b23"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" />
      <FlatList
        ListHeaderComponent={<Masthead offset={offset} />}
        ListFooterComponent={
          <View
            style={{
              width: screenWidth,
              height: "100%",
              backgroundColor: colors.light.background,
              bottom: 0,
            }}
          />
        }
        stickyHeaderIndices={[0]}
        style={{ flex: 1 }}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchPosts();
            }}
          />
        }
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], { useNativeDriver: false })}
      />
    </LinearGradient>
  );
}
