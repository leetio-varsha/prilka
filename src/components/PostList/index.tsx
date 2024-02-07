import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import api from "api";
import { SkeletonCardHorizontal } from "components/Skeleton";
import { format } from "date-fns";
import { Badge, Box, Divider, FlatList, HStack, Image, Pressable, Spacer, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { common } from "styles/common";

export const PostList = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [posts, setPosts] = useState([
    { id: 1, type: "skeletop" },
    { id: 2, type: "skeletop" },
    { id: 3, type: "skeletop" },
  ]);

  useEffect(() => {
    (async () => {
      const data = await api.getPosts();
      setPosts(data);
    })();
  }, []);

  const renderItem = ({ item }) => {
    return !item.type ? (
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
    ) : (
      <SkeletonCardHorizontal />
    );
  };

  return (
    <Box flex={1} style={[common.paddingHrL]} paddingBottom={10}>
      <Text fontSize="xl" bold marginTop={8} marginBottom={4} color={"gray.800"} style={[common.paddingHrL]}>
        Feed
      </Text>
      <FlatList data={posts} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </Box>
  );
};

export default PostList;
