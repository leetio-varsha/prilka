import { CommentsFab } from "components/CommentsFab";
import { format } from "date-fns";
import { Badge, Box, Button, Heading, HStack, Image, ScrollView, Text, VStack } from "native-base";
import useUserStore from "store/useUserStore";
import { colors } from "styles/common";

export default function PostScreen({ navigation, route }) {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = Object.keys(user).length > 0;
  if (!isLoggedIn) {
    return (
      <Box background={[colors.light.background]} flex={1} p={10} alignItems={"center"} justifyContent={"center"}>
        <Heading textAlign={"center"} mb={10}>
          You are not logged in. Please sign in to continue.
        </Heading>
        <Button width={200} colorScheme="blueGray" size={"lg"} onPress={() => navigation.replace("SignInScreen")}>
          Sign In
        </Button>
      </Box>
    );
  }
  const { params = {} } = route;
  const { post } = params;

  return (
    <Box background={[colors.light.background]}>
      <ScrollView>
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
          <VStack padding={2} flex={1}>
            <HStack alignItems={"center"} justifyContent={"space-between"} mb={3}>
              <Badge colorScheme="primary" marginTop={1}>
                {post.category.name.charAt(0).toUpperCase() + post.category.name.slice(1)}
              </Badge>
              <Text fontSize="xs" color="gray.500">
                {format(new Date(post.created_at.seconds * 1000 + post.created_at.nanoseconds / 1000000), "P")}
              </Text>
            </HStack>
            <Heading bold textAlign={"center"}>
              {post.title}
            </Heading>
            <Text fontSize="md" color="blueGray.700" marginTop={5}>
              {post.content}
            </Text>
          </VStack>
        </Box>
      </ScrollView>
      <CommentsFab onPress={() => navigation.navigate("CommentsScreen", { post })} />
    </Box>
  );
}
