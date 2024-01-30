import api from "api";
import { format } from "date-fns";
import { Badge, Card, HStack, Image, Spacer, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { common } from "styles/common";

const screenWidth = Dimensions.get("window").width;

export const Highlighted = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await api.getHotPosts();
      setPosts(data);
    })();
  }, []);

  const renderItem = ({ item }) => {
    const fireBaseTime = new Date(item.created_at.seconds * 1000 + item.created_at.nanoseconds / 1000000);
    return (
      <Card width={screenWidth * 0.7} borderRadius={10} overflow="visible" marginRight={2} backgroundColor="white">
        <Image
          source={{ uri: item.image }}
          alt={item.title}
          borderRadius={10} // round the borders
          width="100%"
          style={{
            aspectRatio: 2,
          }}
        />
        <VStack padding={2} flex={1}>
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
            {format(fireBaseTime, "P")}
          </Text>
        </VStack>
      </Card>
    );
  };

  return (
    <View>
      <Text fontSize="xl" bold marginTop={8} marginBottom={4} color={"white"} style={[common.paddingHrL]}>
        Highlighted
      </Text>
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
          backgroundColor: "#1a1d1e",
          position: "absolute",
          bottom: 0,
          top: 0,
          zIndex: -1,
        }}
      />
    </View>
  );
};

export default Highlighted;
