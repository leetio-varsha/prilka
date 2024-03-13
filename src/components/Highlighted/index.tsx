import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import api from "api";
import { SkeletonCardVertical } from "components/Skeleton";
import { format } from "date-fns";
import { Badge, Card, HStack, Image, Pressable, Spacer, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";
import useCachedPostsStore from "store/useCachedPostsStore";
import { colors } from "styles/common";

const screenWidth = Dimensions.get("window").width;

export const Highlighted = ({ offset }) => {
  const { cachedHotPosts, setCachedHotPostsStore } = useCachedPostsStore(
    ({ cachedHotPosts, setCachedHotPostsStore }) => ({
      cachedHotPosts,
      setCachedHotPostsStore,
    })
  );
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [posts, setPosts] = useState(
    cachedHotPosts.length
      ? cachedHotPosts
      : [
          { id: 1, type: "skeletop" },
          { id: 2, type: "skeletop" },
          { id: 3, type: "skeletop" },
        ]
  );
  const [isMounted, setIsMounted] = useState(false);

  const fetchPosts = async () => {
    const data = await api.getHotPosts();
    setPosts(data);
    setCachedHotPostsStore(data);
  };

  useEffect(() => {
    if (!isMounted) {
      fetchPosts();
    }

    setIsMounted(true);
  }, [isMounted]);

  const infoOpacity = offset?.interpolate({
    inputRange: [50, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const cardImageHeight = offset?.interpolate({
    inputRange: [30, 100],
    outputRange: [130, 0],
    extrapolate: "clamp",
  });

  const cardDateHeight = offset?.interpolate({
    inputRange: [50, 100],
    outputRange: [40, 0],
    extrapolate: "clamp",
  });

  const renderItem = ({ item }) => {
    return !item.type ? (
      <Card width={screenWidth * 0.7} borderRadius={10} overflow="visible" marginRight={2} backgroundColor="white">
        <Pressable
          onPress={() => {
            navigation.navigate("PostDetailScreen", { post: item });
          }}
        >
          <Animated.View style={{ height: cardImageHeight, overflow: "hidden" }}>
            <Image
              source={{ uri: item.image }}
              alt={item.title}
              borderRadius={10} // round the borders
              width="100%"
              style={{
                aspectRatio: 2,
              }}
            />
          </Animated.View>
          <VStack padding={2} flex={1}>
            <Text isTruncated numberOfLines={2} bold>
              {item.title}
            </Text>
            <HStack>
              <Badge colorScheme="primary" marginTop={1}>
                {item.category.name.charAt(0).toUpperCase() + item.category.name.slice(1)}
              </Badge>
            </HStack>
            <Animated.View style={{ height: cardDateHeight, overflow: "hidden" }}>
              <Spacer />
              <Text fontSize="xs" color="gray.500" marginTop={5}>
                {format(new Date(item.created_at.seconds * 1000 + item.created_at.nanoseconds / 1000000), "P")}
              </Text>
            </Animated.View>
          </VStack>
        </Pressable>
      </Card>
    ) : (
      <SkeletonCardVertical width={screenWidth * 0.7} />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 18,
        }}
      />
      <View
        style={{
          width: screenWidth,
          height: "50%",
          backgroundColor: colors.light.background,
          position: "absolute",
          bottom: 0,
          zIndex: -1,
        }}
      />
    </View>
  );
};

export default Highlighted;
