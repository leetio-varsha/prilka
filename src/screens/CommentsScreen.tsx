import api from "api";
import { format } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { Box, Button, Card, Divider, Heading, HStack, Image, Input, ScrollView, Text } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import useUserStore from "store/useUserStore";
import { colors } from "styles/common";

export default function CommentsScreen({ navigation, route }) {
  const user = useUserStore((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { params = {} } = route;
  const { post } = params;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await api.getCommentsByPostId(post.id);
      setComments(data);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    })();
  }, []);

  const handleNewComment = (text) => {
    setNewComment(text);
  };

  const saveComment = async () => {
    const newCommentData = await api.saveComment(
      post.id,
      newComment,
      user?.user?.providedData?.[0]?.displayName || "Anonymous"
    );
    // @ts-ignore
    newCommentData.created_at = newCommentData.created_at.toDate();

    setComments([...comments, newCommentData]);
    setNewComment("");
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <Box background={[colors.light.background]} flex={1}>
      {Platform.OS === "ios" ? (
        <Divider bg="blueGray.400" w={100} thickness="4" mt="1" orientation="horizontal" />
      ) : (
        <StatusBar style="dark" />
      )}
      <Box safeAreaBottom flex={1} p={2}>
        <Image
          source={{ uri: post.image }}
          alt={post.title}
          borderRadius={10} // round the borders
          width="100%"
          style={{
            aspectRatio: 2,
          }}
        />
        <Heading py={2}>Post comments</Heading>
        <ScrollView ref={scrollViewRef}>
          <Box py={5}>
            {comments
              .sort((a, b) => a.created_at - b.created_at) // sort comments by date, newest
              // first
              .map((comment, index) => (
                <Card key={index} p={2} mb={2} backgroundColor={"white"}>
                  <Text>{format(comment.created_at, "Pp")}</Text>
                  <Text>{comment.userDisplayName}</Text>
                  <Text>{comment.comment}</Text>
                </Card>
              ))}
          </Box>
        </ScrollView>
        <HStack>
          <Box alignItems="center" w={"100%"} py={2}>
            <Input
              type={"text"}
              w="100%"
              py="0"
              value={newComment}
              backgroundColor={"white"}
              onChangeText={handleNewComment}
              InputRightElement={
                <Button onPress={saveComment} size="xs" rounded="none" w="1/4" h="full">
                  Send
                </Button>
              }
              placeholder="Write a comment..."
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
